#!/usr/bin/env node
/**
 * Build-time Sanity content snapshot, never fetched by the visitor's browser.
 *
 * Opt in explicitly:
 * SANITY_UBER_SOURCE=published node scripts/sanity/fetch-uber.mjs
 * SANITY_UBER_SOURCE=drafts SANITY_READ_TOKEN=... node scripts/sanity/fetch-uber.mjs
 *
 * No mode (the ordinary site build) makes no changes; the committed fallback
 * stays effective. This script never writes back to Sanity or to Hostinger.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {adaptUberGuide} from './uber-adapter.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const target = path.resolve(root, 'src/data/generated/sanityUberSnapshot.ts');
const source = process.env.SANITY_UBER_SOURCE || '';
const allowed = new Set(['published', 'drafts']);
if (!source) {
  console.log('Sanity Uber source not selected: existing static guide remains unchanged.');
  process.exit(0);
}
if (!allowed.has(source)) throw new Error('SANITY_UBER_SOURCE must be published or drafts');
const token = process.env.SANITY_READ_TOKEN || process.env.SANITY_IMPORT_TOKEN;
if (source === 'drafts' && !token) {
  throw new Error('Draft snapshot requires SANITY_READ_TOKEN (or temporary SANITY_IMPORT_TOKEN) from a server-only CI secret.');
}
const api = 'https://ekfs0mfw.api.sanity.io/v2026-03-01/data/query/production';
async function sanityQuery(query, params = {}) {
  const u = new URL(api);
  u.searchParams.set('query', query);
  u.searchParams.set('perspective', source);
  for (const [key, value] of Object.entries(params)) u.searchParams.set('$' + key, JSON.stringify(value));
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000);
  try {
    const resp = await fetch(u, {
      signal: controller.signal,
      headers: token ? {Authorization: 'Bearer ' + token} : {},
      cache: 'no-store',
    });
    if (!resp.ok) throw new Error('Sanity query returned HTTP ' + resp.status + ' for ' + source + ' snapshot');
    const data = await resp.json();
    if (data.error) throw new Error('Sanity query failed: ' + (data.error.description || data.error.type));
    return data.result;
  } finally {
    clearTimeout(timeout);
  }
}

const guide = await sanityQuery('*[_id == "travelGuide.uber"][0]');
if (!guide) {
  throw new Error('No Uber guide in Sanity ' + source + ' perspective. Publish in Sanity or select an authorized draft preview.');
}
const referenceIds = [...new Set([
  ...(guide.sources || []).map(x => x._ref),
  ...(guide.sections || []).flatMap(x => (x.sources || []).map(y => y._ref)),
])];
if (!referenceIds.every(id => typeof id === 'string' && id.startsWith('sourceReference.'))) {
  throw new Error('Invalid source references in Sanity guide.');
}
const sources = referenceIds.length
  ? await sanityQuery('*[_type == "sourceReference" && _id in $ids]', {ids: referenceIds})
  : [];
const snapshot = adaptUberGuide(guide, sources);
const code = [
  '/**',
  ' * AUTO-GENERATED only by scripts/sanity/fetch-uber.mjs.',
  ' * Rebuild to refresh. Never edit by hand. No credentials are included.',
  ' * Perspective at build: ' + source + '.',
  ' */',
  "import type {TravelGuide} from '@/data/travelGuides';",
  "import type {SourceReference} from '@/data/registry';",
  '',
  'export const sanityUberGuide: TravelGuide | null = ' + JSON.stringify(snapshot.guide, null, 2) + ' as TravelGuide;',
  'export const sanityUberSources: SourceReference[] = ' + JSON.stringify(snapshot.sources, null, 2) + ' as SourceReference[];',
  '',
].join('\n');
await fs.mkdir(path.dirname(target), {recursive: true});
const tmp = target + '.new';
await fs.writeFile(tmp, code, 'utf8');
await fs.rename(tmp, target);
console.log(JSON.stringify({
  source,
  path: '/travel-blog/uber-in-israel/',
  sections: snapshot.guide.sections.length,
  sources: snapshot.sources.length,
  image: !!snapshot.guide.photo,
  output: 'src/data/generated/sanityUberSnapshot.ts',
}));
console.log('Built a local static-content snapshot. No Sanity mutation or Hostinger deployment occurred.');
