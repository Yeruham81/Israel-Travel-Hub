/**
 * Convert the Sanity Uber guide into the existing site's TravelGuide shape.
 * Pure functions only: no network, no credentials, no draft publishing.
 *
 * When a supported field cannot be translated faithfully, fail the build
 * rather than silently dropping editorial content or broken links.
 */
const PROJECT = 'ekfs0mfw';
const DATASET = 'production';
const imageBase = 'https://cdn.sanity.io/images/' + PROJECT + '/' + DATASET + '/';

const existingGuides = Object.freeze({
  '/travel-blog/taxis-in-israel/': 'taxis',
  '/travel-blog/taxi-fares-in-israel/': 'taxiFares',
  '/travel-blog/ben-gurion-airport-taxis/': 'airportTaxis',
  '/travel-blog/from-ben-gurion-airport-on-shabbat/': 'shabbat',
  '/travel-blog/sherut-in-israel/': 'sherut',
  '/travel-blog/getting-around-israel/': 'israel',
});

const topicIds = new Set([
  'transportation','destinations','attractions','itineraries','tips',
  'accommodation','connectivity','religion','shopping',
]);
const isString = x => typeof x === 'string';
function assert(condition, message) {
  if (!condition) throw new Error('Sanity Uber content validation: ' + message);
}
function requiredString(value, field) {
  assert(isString(value) && value.trim().length > 0, field + ' must be nonempty');
  return value;
}
function stringArray(arr, field, minimum = 0) {
  assert(Array.isArray(arr) && arr.length >= minimum, field + ' must contain at least ' + minimum + ' items');
  return arr.map((x, i) => requiredString(x, field + '[' + i + ']'));
}
function httpUrl(value, field) {
  requiredString(value, field);
  let parsed;
  try { parsed = new URL(value); } catch { throw new Error(field + ' must be a valid URL'); }
  assert(['http:', 'https:'].includes(parsed.protocol) && !!parsed.hostname, field + ' must be HTTP(S)');
  return value;
}
function internalPath(value, field) {
  assert(isString(value) && /^\/(?!\/)[a-z0-9/-]+\/$/.test(value), field + ' must be an existing site-relative path');
  return value;
}
function image(photo, field) {
  assert(photo && photo._type === 'guidePhoto', field + ' must be a guidePhoto');
  const assetId = photo.image?.asset?._ref;
  const match = /^image-([A-Za-z0-9]+)-(\d+x\d+)-([a-z0-9]+)$/.exec(assetId || '');
  assert(match, field + ' requires an uploaded Sanity image asset');
  const ext = match[3];
  assert(['jpg','jpeg','png','webp','gif','avif'].includes(ext), field + ' contains unsupported image format');
  return {
    src: imageBase + match[1] + '-' + match[2] + '.' + ext,
    alt: requiredString(photo.alt, field + '.alt'),
    ...(photo.credit ? {credit: photo.credit} : {}),
    ...(photo.sourceUrl ? {sourceUrl: httpUrl(photo.sourceUrl, field + '.sourceUrl')} : {}),
    ...(photo.licenseUrl ? {licenseUrl: httpUrl(photo.licenseUrl, field + '.licenseUrl')} : {}),
  };
}
function table(value, field) {
  assert(value?._type === 'comparisonTable', field + ' must be a comparisonTable');
  const headers = stringArray(value.headers, field + '.headers', 2);
  assert(Array.isArray(value.rows) && value.rows.length > 0, field + ' has no rows');
  return {
    caption: requiredString(value.caption, field + '.caption'),
    headers,
    rows: value.rows.map((row, index) => {
      assert(row._type === 'comparisonRow', field + '.rows[' + index + '] has the wrong type');
      const cells = stringArray(row.cells, field + '.rows[' + index + '].cells', headers.length);
      assert(cells.length === headers.length, field + '.rows[' + index + '] does not match header count');
      return cells;
    }),
  };
}
function siteLinks(items = [], field) {
  assert(Array.isArray(items), field + ' must be an array');
  return items.map((l, i) => ({
    label: requiredString(l.label, field + '[' + i + '].label'),
    to: internalPath(l.path, field + '[' + i + '].path'),
    ...(l.note ? {note: l.note} : {}),
  }));
}
function externalLinks(items = [], field) {
  assert(Array.isArray(items), field + ' must be an array');
  return items.map((l, i) => ({
    label: requiredString(l.label, field + '[' + i + '].label'),
    href: httpUrl(l.href, field + '[' + i + '].href'),
    ...(l.context ? {context: requiredString(l.context, field + '[' + i + '].context')} : {}),
  }));
}
function refs(items = [], field) {
  assert(Array.isArray(items), field + ' must be an array');
  return items.map((item, i) => {
    assert(isString(item._ref) && item._ref.startsWith('sourceReference.'), field + '[' + i + '] invalid reference');
    return item._ref.slice('sourceReference.'.length);
  });
}
function portableBlocks(body, field) {
  assert(Array.isArray(body), field + ' must be an array');
  return body.map((block, i) => {
    const where = field + '[' + i + ']';
    assert(block._type === 'block' && (!block.style || block.style === 'normal') && !block.listItem, where + ' requires a normal paragraph');
    const marks = new Map((block.markDefs || []).map(mark => [mark._key, mark]));
    assert(Array.isArray(block.children), where + ' children must be an array');
    const segments = block.children.map((span, j) => {
      const spot = where + '.span[' + j + ']';
      assert(span._type === 'span' && isString(span.text), spot + ' is not a text span');
      const decorators = [], result = {text: span.text};
      for (const markKey of span.marks || []) {
        if (['strong','em','underline','code'].includes(markKey)) {
          decorators.push(markKey);
        } else {
          const definition = marks.get(markKey);
          assert(definition, spot + ' contains unknown annotation ' + markKey);
          if (definition._type === 'internalLink') {
            assert(!result.to && !result.href, spot + ' contains multiple links');
            result.to = internalPath(definition.path, spot + '.internalLink');
          } else if (definition._type === 'externalLink') {
            assert(!result.to && !result.href, spot + ' contains multiple links');
            result.href = httpUrl(definition.href, spot + '.externalLink');
          } else {
            throw new Error(spot + ' contains unsupported annotation type: ' + definition._type);
          }
        }
      }
      if (decorators.length) result.marks = decorators;
      return result;
    });
    assert(segments.length > 0, where + ' must have text spans');
    const text = segments.map(s => s.text).join('');
    return {text, segments};
  });
}
function section(doc, i) {
  assert(doc?._type === 'guideSection', 'sections[' + i + '] must be guideSection');
  const field = 'sections[' + i + ']';
  const blocks = portableBlocks(doc.body || [], field + '.body');
  const out = {
    id: requiredString(doc.sectionId, field + '.sectionId'),
    title: requiredString(doc.title, field + '.title'),
    paragraphs: blocks.map(p => p.text),
    richParagraphs: blocks.map(p => p.segments),
    ...(doc.bullets?.length ? {bullets: stringArray(doc.bullets, field + '.bullets')} : {}),
    ...(doc.photo ? {photo: image(doc.photo, field + '.photo')} : {}),
    ...(doc.tables?.length ? {tables: doc.tables.map((t, j) => table(t, field + '.tables[' + j + ']'))} : {}),
    ...(doc.links?.length ? {links: siteLinks(doc.links, field + '.links')} : {}),
    ...(doc.externalLinks?.length ? {externalLinks: externalLinks(doc.externalLinks, field + '.externalLinks')} : {}),
    ...(doc.highlightedLinks?.length ? {highlightedLinks: externalLinks(doc.highlightedLinks, field + '.highlightedLinks')} : {}),
    sourceIds: refs(doc.sources || [], field + '.sources'),
  };
  assert(/^[a-z0-9-]+$/.test(out.id), field + '.sectionId invalid');
  assert(!doc.sharedFacts?.length, field + '.sharedFacts not yet supported by pilot renderer');
  return out;
}
function sourceRecord(doc) {
  assert(doc?._type === 'sourceReference', 'sourceReference type mismatch');
  assert(isString(doc._id) && doc._id.startsWith('sourceReference.'), 'sourceReference ID invalid');
  const legacyId = doc._id.slice('sourceReference.'.length);
  assert(legacyId === doc.legacyId, 'sourceReference legacyId mismatch for ' + legacyId);
  return {
    id: legacyId,
    title: requiredString(doc.title, legacyId + '.title'),
    publisher: requiredString(doc.publisher, legacyId + '.publisher'),
    url: httpUrl(doc.url, legacyId + '.url'),
    checkedAt: doc.checkedAt || null,
    note: doc.note || '',
  };
}
/**
 * @param {object} doc Sanity published or authenticated draft-perspective guide
 * @param {object[]} sourceDocs referenced Sanity source documents
 * @returns {{guide: object, sources: object[]}}
 */
export function adaptUberGuide(doc, sourceDocs) {
  assert(doc?._type === 'travelGuide', 'missing travelGuide document');
  assert(doc.legacyId === 'uber', 'wrong legacyId');
  assert(doc.canonicalPath === '/travel-blog/uber-in-israel/', 'wrong canonical path');
  assert(!doc._id || ['travelGuide.uber','drafts.travelGuide.uber'].includes(doc._id), 'unexpected document ID');
  assert(Array.isArray(doc.sections) && doc.sections.length > 0, 'no guide sections');
  const topics = stringArray(doc.topics, 'topics', 1);
  topics.forEach(t => assert(topicIds.has(t), 'unknown topic ' + t));
  const sections = doc.sections.map(section);
  const sectionIds = sections.map(s => s.id);
  assert(sectionIds.length === new Set(sectionIds).size, 'duplicate section anchor IDs');
  const mainSources = refs(doc.sources || [], 'sources');
  const sourceIds = [...new Set([...mainSources, ...sections.flatMap(s => s.sourceIds)])];
  assert(Array.isArray(sourceDocs), 'source documents must be an array');
  const sourceMap = new Map(sourceDocs.map(s => [s._id, s]));
  const sourceRecords = sourceIds.map(id => {
    const s = sourceMap.get('sourceReference.' + id);
    assert(s, 'missing published sourceReference.' + id);
    return sourceRecord(s);
  });
  assert(doc.hero, 'hero photo is required');
  const guide = {
    id: 'uber',
    title: requiredString(doc.title, 'title'),
    description: requiredString(doc.description, 'description'),
    intro: requiredString(doc.intro, 'intro'),
    answer: requiredString(doc.answer, 'answer'),
    topics,
    photo: image(doc.hero, 'hero'),
    facts: (doc.facts || []).map((fact, i) => ({
      label: requiredString(fact.label, 'facts[' + i + '].label'),
      text: requiredString(fact.text, 'facts[' + i + '].text'),
    })),
    comparison: table(doc.comparison, 'comparison'),
    sections,
    checklist: stringArray(doc.checklist, 'checklist', 1),
    faqs: (doc.faqs || []).map((faq, i) => ({
      q: requiredString(faq.question, 'faq[' + i + '].question'),
      a: requiredString(faq.answer, 'faq[' + i + '].answer'),
    })),
    sourceIds: mainSources,
    related: (doc.related || []).map((item, i) => {
      const p = internalPath(item.path, 'related[' + i + '].path');
      assert(existingGuides[p], 'unknown related guide route: ' + p);
      return existingGuides[p];
    }),
    services: siteLinks(doc.services || [], 'services'),
    ...(doc.nextSteps ? {nextSteps: siteLinks(doc.nextSteps, 'nextSteps')} : {}),
    ...(doc.reviewNote ? {reviewNote: doc.reviewNote} : {}),
    ...(doc.reviewedAt ? {updatedAt: doc.reviewedAt} : {}),
  };
  // Preview with a full snapshot: never silently hide an editorial field.
  assert(!doc._typeMismatch, 'unexpected schema shape');
  return {guide, sources: sourceRecords};
}
