#!/usr/bin/env node
/**
 * Read-only by default: extract the real Uber guide + verified source records
 * directly from the repository's TypeScript AST without evaluating application
 * code. --apply creates only one draft guide and its public source references.
 * Never updates an existing guide or deletes content.
 *
 * Usage from cms-pilot:
 *   npm run check:uber
 *   SANITY_IMPORT_TOKEN=... npm run import:uber
 */
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import ts from 'typescript';

const baseDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const apply = process.argv.includes('--apply');
if (process.argv.some(arg => arg.startsWith('--') && !['--apply', '--dry-run'].includes(arg))) {
  throw new Error('Only --apply and --dry-run are supported.');
}
if (apply && process.argv.includes('--dry-run')) throw new Error('Choose either --apply or --dry-run.');
const projectId = 'ekfs0mfw';
const dataset = 'production';
const guideId = 'travelGuide.uber';
const draftId = 'drafts.' + guideId;

function sourceFile(rel) {
  const abs = path.join(baseDir, rel);
  return ts.createSourceFile(abs, fs.readFileSync(abs, 'utf8'), ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
}
function findVariable(file, name) {
  for (const statement of file.statements) {
    if (!ts.isVariableStatement(statement)) continue;
    for (const decl of statement.declarationList.declarations) {
      if (ts.isIdentifier(decl.name) && decl.name.text === name) return decl.initializer;
    }
  }
  throw new Error('Cannot find constant ' + name + ' in ' + path.basename(file.fileName));
}
function importAssetPath(file, symbol) {
  for (const statement of file.statements) {
    if (!ts.isImportDeclaration(statement)) continue;
    const importName = statement.importClause?.name?.text;
    if (importName !== symbol) continue;
    const specifier = statement.moduleSpecifier.text;
    if (!specifier.startsWith('@/assets/')) throw new Error('Unexpected import: ' + specifier);
    const actual = path.resolve(baseDir, 'src', specifier.substring(2));
    const root = path.resolve(baseDir, 'src/assets') + path.sep;
    if (!actual.startsWith(root)) throw new Error('Asset escapes src/assets: ' + actual);
    if (!fs.existsSync(actual)) throw new Error('Missing source asset: ' + actual);
    return actual;
  }
}
function unwrap(node) {
  while (ts.isAsExpression(node) || ts.isParenthesizedExpression(node)
    || ts.isTypeAssertionExpression(node) || ts.isNonNullExpression(node)
    || (ts.isSatisfiesExpression && ts.isSatisfiesExpression(node))) node = node.expression;
  return node;
}
const registry = sourceFile('src/data/registry.ts');
const guides = sourceFile('src/data/travelGuides.ts');
const taxiCluster = sourceFile('src/data/taxiGuideCluster.ts');
const expandedGuides = sourceFile('src/data/travelGuideExpansion.ts');
function evaluate(input, file, visited = new Set()) {
  const node = unwrap(input);
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text;
  if (ts.isNumericLiteral(node)) return Number(node.text);
  if (node.kind === ts.SyntaxKind.TrueKeyword) return true;
  if (node.kind === ts.SyntaxKind.FalseKeyword) return false;
  if (node.kind === ts.SyntaxKind.NullKeyword) return null;
  if (ts.isArrayLiteralExpression(node)) return node.elements.map(item => evaluate(item, file, visited));
  if (ts.isObjectLiteralExpression(node)) {
    const object = {};
    for (const item of node.properties) {
      if (!ts.isPropertyAssignment(item)) throw new Error('Unsupported object field ' + item.getText(file));
      const key = ts.isIdentifier(item.name) || ts.isStringLiteral(item.name)
        ? item.name.text
        : undefined;
      if (!key) throw new Error('Unsupported object key in source');
      object[key] = evaluate(item.initializer, file, visited);
    }
    return object;
  }
  if (ts.isPropertyAccessExpression(node)) {
    const context = ts.isIdentifier(node.expression) && node.expression.text === 'travelGuidePaths'
      ? registry : file;
    const target = evaluate(node.expression, context, visited);
    if (!Object.hasOwn(target, node.name.text)) throw new Error('Unknown property ' + node.getText(file));
    return target[node.name.text];
  }
  if (ts.isIdentifier(node)) {
    if (node.text === 'undefined') return undefined;
    const asset = importAssetPath(file, node.text);
    if (asset) return {__localAssetPath: asset};
    const identifier = file.fileName + ':' + node.text;
    if (visited.has(identifier)) throw new Error('Circular constant reference: ' + identifier);
    const nextVisited = new Set(visited);
    nextVisited.add(identifier);
    return evaluate(findVariable(file, node.text), file, nextVisited);
  }
  throw new Error('Unsupported source expression (safe import stops): ' + node.getText(file).slice(0, 200));
}
function getField(objectExpr, fieldName, file) {
  const object = unwrap(objectExpr);
  if (!ts.isObjectLiteralExpression(object)) throw new Error('Expected object literal in ' + file.fileName);
  const found = object.properties.find(p => ts.isPropertyAssignment(p) && p.name.text === fieldName);
  if (!found) throw new Error('Missing field ' + fieldName);
  return found.initializer;
}
const uberAst = getField(findVariable(guides, 'travelGuides'), 'uber', guides);
const uber = evaluate(uberAst, guides);
const pathMap = evaluate(findVariable(registry, 'travelGuidePaths'), registry);
if (uber.id !== 'uber' || pathMap.uber !== '/travel-blog/uber-in-israel/') {
  throw new Error('Wrong target guide or canonical path: refusing import.');
}

function relatedGuideTitle(id) {
  const sources = [
    [guides, 'travelGuides'],
    [taxiCluster, 'taxiGuideCluster'],
    [expandedGuides, 'expandedTravelGuides'],
  ];
  for (const [file, variable] of sources) {
    try {
      const record = getField(findVariable(file, variable), id, file);
      const title = evaluate(getField(record, 'title', file), file);
      if (typeof title === 'string' && title.length) return title;
    } catch {
      // This guide is defined by another module: try the next known collection.
    }
  }
  throw new Error('Cannot resolve editorial title of related guide ' + id);
}

function sourceRecords() {
  const declaration = unwrap(findVariable(registry, 'travelGuideSources'));
  if (!ts.isArrayLiteralExpression(declaration)) throw new Error('Expected travelGuideSources array');
  const result = [];
  for (const item of declaration.elements) {
    if (ts.isObjectLiteralExpression(item)) {
      result.push(evaluate(item, registry));
      continue;
    }
    if (!ts.isSpreadElement(item)) throw new Error('Unsupported source array element');
    const call = unwrap(item.expression);
    if (!ts.isCallExpression(call) || !ts.isPropertyAccessExpression(call.expression)
      || call.expression.name.text !== 'map') {
      // Other imported source lists aren't needed for this pilot.
      continue;
    }
    const tupleSource = evaluate(call.expression.expression, registry);
    if (!Array.isArray(tupleSource)) throw new Error('Expected source tuples');
    const checkedAt = evaluate(findVariable(registry, 'TRAVEL_GUIDE_CHECK_DATE'), registry);
    for (const tuple of tupleSource) {
      if (!Array.isArray(tuple) || tuple.length !== 5) throw new Error('Unexpected source tuple');
      const [id, title, publisher, url, note] = tuple;
      result.push({id, title, publisher, url, note, checkedAt});
    }
  }
  return new Map(result.map(entry => [entry.id, entry]));
}
const availableSources = sourceRecords();
const allSourceIds = [...new Set([
  ...(uber.sourceIds || []),
  ...uber.sections.flatMap(section => section.sourceIds || []),
])];
const missing = allSourceIds.filter(id => !availableSources.has(id));
if (missing.length) throw new Error('Source records not found: ' + missing.join(', '));

function key(value) {
  return String(value).replace(/[^a-zA-Z0-9_-]/g, '_').substring(0, 70);
}
function ref(sourceId) {
  return {
    _type: 'reference',
    _key: key(sourceId),
    _ref: 'sourceReference.' + sourceId,
  };
}
function links(items = []) {
  return items.map((item, index) => ({
    _type: 'pageLink',
    _key: 'link-' + index,
    label: item.label,
    path: item.to,
    ...(item.note ? {note: item.note} : {}),
  }));
}
function comparison(input, index = 'main') {
  if (!input) return undefined;
  const rows = input.rows.map((cells, i) => {
    if (cells.length !== input.headers.length) {
      throw new Error('Comparison row ' + i + ' in ' + index + ' has wrong number of cells');
    }
    return {_type: 'comparisonRow', _key: 'row-' + i, cells};
  });
  return {_type: 'comparisonTable', caption: input.caption, headers: input.headers, rows};
}
function paragraphToPortableText(paragraph, sectionLinks, id) {
  if (typeof paragraph !== 'string') throw new Error('Paragraph is not a string');
  const occurrences = [];
  for (const link of sectionLinks) {
    const start = paragraph.indexOf(link.text);
    if (start < 0) continue;
    occurrences.push({start, end: start + link.text.length, link});
  }
  occurrences.sort((a, b) => a.start - b.start);
  const children = [], markDefs = [];
  let cursor = 0, spanId = 0;
  function span(text, marks = []) {
    if (text) children.push({_type: 'span', _key: 'span-' + (spanId++), text, marks});
  }
  for (const occurrence of occurrences) {
    if (occurrence.start < cursor) throw new Error('Overlapping inline links in section ' + id);
    span(paragraph.slice(cursor, occurrence.start));
    const mark = 'mark-' + markDefs.length;
    markDefs.push({_type: 'internalLink', _key: mark, path: occurrence.link.to});
    span(paragraph.slice(occurrence.start, occurrence.end), [mark]);
    cursor = occurrence.end;
  }
  span(paragraph.slice(cursor));
  return {_type: 'block', style: 'normal', children, markDefs};
}
function portableSections(section) {
  const supplied = section.inlineLinks || [];
  for (const link of supplied) {
    if (!section.paragraphs.some(text => text.includes(link.text))) {
      throw new Error('Inline link cannot be located in section ' + section.id + ': ' + link.text);
    }
  }
  return section.paragraphs.map((text, i) => ({
    ...paragraphToPortableText(text, supplied, section.id),
    _key: 'paragraph-' + i,
  }));
}
function validateAsset(photo) {
  if (!photo) return;
  if (!photo.src || typeof photo.src !== 'object' || !photo.src.__localAssetPath) {
    throw new Error('Unexpected photo source: expected a local image imported from src/assets');
  }
  if (!fs.existsSync(photo.src.__localAssetPath)) throw new Error('Missing image ' + photo.src.__localAssetPath);
}
validateAsset(uber.photo);
uber.sections.forEach(section => validateAsset(section.photo));
for (const section of uber.sections) portableSections(section);
for (const id of uber.related) relatedGuideTitle(id);

function sourceDoc(id) {
  const source = availableSources.get(id);
  return {
    _id: 'sourceReference.' + id,
    _type: 'sourceReference',
    legacyId: id,
    title: source.title,
    publisher: source.publisher,
    url: source.url,
    ...(source.note ? {note: source.note} : {}),
    ...(source.checkedAt ? {checkedAt: source.checkedAt} : {}),
  };
}
async function makePhoto(photo, client) {
  if (!photo) return undefined;
  const full = photo.src.__localAssetPath;
  const asset = await client.assets.upload('image', fs.createReadStream(full), {filename: path.basename(full)});
  return {
    _type: 'guidePhoto',
    image: {_type: 'image', asset: {_type: 'reference', _ref: asset._id}},
    alt: photo.alt,
    ...(photo.credit ? {credit: photo.credit} : {}),
    ...(photo.sourceUrl ? {sourceUrl: photo.sourceUrl} : {}),
    ...(photo.licenseUrl ? {licenseUrl: photo.licenseUrl} : {}),
  };
}
async function guideDraft(client) {
  const hero = await makePhoto(uber.photo, client);
  const sections = [];
  for (const section of uber.sections) {
    sections.push({
      _type: 'guideSection',
      _key: 'section-' + section.id,
      sectionId: section.id,
      title: section.title,
      body: portableSections(section),
      ...(section.photo ? {photo: await makePhoto(section.photo, client)} : {}),
      ...(section.bullets?.length ? {bullets: section.bullets} : {}),
      ...(section.tables?.length ? {tables: section.tables.map((t, i) => ({
        ...comparison(t, section.id + '-' + i), _key: 'table-' + i,
      }))} : {}),
      ...(section.sourceIds?.length ? {sources: section.sourceIds.map(ref)} : {}),
      ...(section.links?.length ? {links: links(section.links)} : {}),
      ...(section.externalLinks?.length ? {
        externalLinks: section.externalLinks.map((link, i) => ({
          _type: 'externalResource', _key: 'external-' + i, ...link,
        })),
      } : {}),
      ...(section.highlightedLinks?.length ? {
        highlightedLinks: section.highlightedLinks.map((link, i) => ({
          _type: 'highlightedResource', _key: 'highlight-' + i, ...link,
        })),
      } : {}),
    });
  }
  return {
    _id: draftId,
    _type: 'travelGuide',
    legacyId: uber.id,
    canonicalPath: pathMap.uber,
    title: uber.title,
    description: uber.description,
    intro: uber.intro,
    answer: uber.answer,
    ...(uber.reviewNote ? {reviewNote: uber.reviewNote} : {}),
    ...(uber.updatedAt ? {reviewedAt: uber.updatedAt} : {}),
    topics: uber.topics,
    hero,
    facts: uber.facts.map((fact, i) => ({
      _key: 'fact-' + i, _type: 'factItem', ...fact,
    })),
    comparison: comparison(uber.comparison),
    sections,
    checklist: uber.checklist,
    faqs: uber.faqs.map((faq, i) => ({
      _type: 'faqItem', _key: 'faq-' + i, question: faq.q, answer: faq.a,
    })),
    sources: uber.sourceIds.map(ref),
    related: links(uber.related.map(id => ({label: relatedGuideTitle(id), to: pathMap[id]}))),
    services: links(uber.services),
    ...(uber.nextSteps ? {nextSteps: links(uber.nextSteps)} : {}),
    // factCheckedAt is deliberately not inferred from editorial updatedAt.
  };
}

const report = {
  project: projectId,
  dataset,
  target: draftId,
  sourceFile: 'src/data/travelGuides.ts',
  canonicalPath: pathMap.uber,
  sections: uber.sections.length,
  paragraphs: uber.sections.reduce((n, s) => n + s.paragraphs.length, 0),
  facts: uber.facts.length,
  comparisonRows: uber.comparison.rows.length,
  faqs: uber.faqs.length,
  sourceDocuments: allSourceIds.length,
  images: 1 + uber.sections.filter(s => s.photo).length,
  status: apply ? 'CREATE_DRAFT_ONCE' : 'DRY_RUN_ONLY',
};
console.log(JSON.stringify(report, null, 2));
if (!apply) {
  console.log('Validation complete: no Sanity API calls or mutations were made.');
  process.exit(0);
}
if (!process.env.SANITY_IMPORT_TOKEN) {
  throw new Error('SANITY_IMPORT_TOKEN is not set. Save a separate write-scoped token in GitHub Actions secrets, never in source code or chat.');
}
const {createClient} = await import('@sanity/client');
const client = createClient({
  projectId,
  dataset,
  apiVersion: '2026-03-01',
  useCdn: false,
  perspective: 'raw',
  token: process.env.SANITY_IMPORT_TOKEN,
});
const existing = await client.fetch('*[_id in $ids]{_id}', {ids: [guideId, draftId]});
if (existing.length) {
  throw new Error('Guide already exists in Sanity. Import refuses to overwrite: ' + existing.map(x => x._id).join(', '));
}
// Create source references as public editorial records. They are safe to read,
// but this does NOT publish the guide or change the Hostinger site.
for (const id of allSourceIds) await client.createIfNotExists(sourceDoc(id));
const draft = await guideDraft(client);
await client.createIfNotExists(draft);
console.log('Created draft: ' + draftId + '. Open the Sanity Studio and review before publishing.');
console.log('No Hostinger deployment or public guide publishing has occurred.');
