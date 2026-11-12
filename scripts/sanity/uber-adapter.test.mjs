import test from 'node:test';
import assert from 'node:assert/strict';
import {adaptUberGuide} from './uber-adapter.mjs';

const IMAGE_ID = 'image-ABC123ab-900x600-webp';
const photo = {
  _type: 'guidePhoto',
  alt: 'Ben Gurion terminal',
  image: {_type: 'image', asset: {_ref: IMAGE_ID}},
  credit: 'Photographer',
  sourceUrl: 'https://example.org/photo',
  licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
};
const source = {
  _id: 'sourceReference.source-test',
  _type: 'sourceReference',
  legacyId: 'source-test',
  title: 'Test official source',
  publisher: 'Test publisher',
  url: 'https://example.org/test',
  note: 'Check for updates',
  checkedAt: '2026-11-11',
};
const bodyBlock = {
  _type: 'block',
  style: 'normal',
  _key: 'p1',
  children: [
    {_type: 'span', text: 'Read ', marks: []},
    {_type: 'span', text: 'official taxis', marks: ['l1','strong']},
    {_type: 'span', text: ' and ', marks: []},
    {_type: 'span', text: 'more information', marks: ['l2']},
    {_type: 'span', text: '.', marks: []},
  ],
  markDefs: [
    {_type: 'internalLink', _key: 'l1', path: '/travel-blog/taxis-in-israel/'},
    {_type: 'externalLink', _key: 'l2', href: 'https://example.org/faq'},
  ],
};
function input() {
  return {
    _id: 'travelGuide.uber',
    _type: 'travelGuide',
    legacyId: 'uber',
    canonicalPath: '/travel-blog/uber-in-israel/',
    title: 'Uber in Israel — Test',
    description: 'This is a safe test description.',
    intro: 'Test introduction.',
    answer: 'Test answer.',
    topics: ['transportation','tips'],
    hero: structuredClone(photo),
    facts: [{_type: 'factItem', label: 'Apps', text: 'Only licensed taxis'}],
    comparison: {
      _type: 'comparisonTable',
      caption: 'Compare transport',
      headers: ['Choice','How'],
      rows: [{_type: 'comparisonRow', cells: ['Gett','Licensed taxis']}],
    },
    sections: [{
      _type: 'guideSection',
      sectionId: 'status',
      title: 'What works?',
      body: [structuredClone(bodyBlock)],
      sources: [{_ref: source._id}],
      photo: structuredClone(photo),
      highlightedLinks: [{label: 'Provider', href: 'https://example.org', context: 'Read before booking'}],
    }],
    checklist: ['Confirm pickup'],
    faqs: [{question: 'Is this a test?', answer: 'Yes.'}],
    sources: [{_ref: source._id}],
    related: [{label: 'Licensed taxis', path: '/travel-blog/taxis-in-israel/'}],
    services: [{label: 'Private driver', path: '/private-driver/'}],
    nextSteps: [{label: 'Fare guide', path: '/travel-blog/taxi-fares-in-israel/'}],
    reviewedAt: '2026-11-11',
  };
}
test('converts all important Uber guide fields without dropping inline links', () => {
  const {guide, sources} = adaptUberGuide(input(), [source]);
  assert.equal(guide.id, 'uber');
  assert.equal(guide.updatedAt, '2026-11-11');
  assert.equal(guide.sections[0].paragraphs[0], 'Read official taxis and more information.');
  assert.deepEqual(guide.sections[0].richParagraphs[0][1], {
    text: 'official taxis', to: '/travel-blog/taxis-in-israel/', marks: ['strong'],
  });
  assert.deepEqual(guide.sections[0].richParagraphs[0][3], {
    text: 'more information', href: 'https://example.org/faq',
  });
  assert.equal(guide.sections[0].highlightedLinks[0].context, 'Read before booking');
  assert.equal(guide.comparison.rows[0][0], 'Gett');
  assert.equal(guide.related[0], 'taxis');
  assert.equal(guide.services[0].to, '/private-driver/');
  assert.equal(guide.faqs[0].q, 'Is this a test?');
  assert.deepEqual(guide.sourceIds, ['source-test']);
  assert.equal(sources[0].publisher, 'Test publisher');
  assert.equal(guide.photo.src, 'https://cdn.sanity.io/images/ekfs0mfw/production/ABC123ab-900x600.webp');
  assert.equal(guide.sections[0].photo.credit, 'Photographer');
});
test('rejects changed canonical route', () => {
  const doc = input();
  doc.canonicalPath = '/travel-blog/different/';
  assert.throws(() => adaptUberGuide(doc, [source]), /wrong canonical path/);
});
test('rejects missing sources instead of silently hiding citations', () => {
  assert.throws(() => adaptUberGuide(input(), []), /missing published sourceReference/);
});
test('rejects unknown blocks which cannot render faithfully', () => {
  const doc = input();
  doc.sections[0].body[0].style = 'h2';
  assert.throws(() => adaptUberGuide(doc, [source]), /requires a normal paragraph/);
});
test('rejects unknown destination in related guide links', () => {
  const doc = input();
  doc.related[0].path = '/travel-blog/does-not-exist/';
  assert.throws(() => adaptUberGuide(doc, [source]), /unknown related guide route/);
});
test('rejects unsafe URLs', () => {
  const doc = input();
  doc.sections[0].highlightedLinks[0].href = 'javascript:alert(1)';
  assert.throws(() => adaptUberGuide(doc, [source]), /must be HTTP\(S\)/);
});
test('rejects duplicate section anchors', () => {
  const doc = input();
  doc.sections.push(structuredClone(doc.sections[0]));
  assert.throws(() => adaptUberGuide(doc, [source]), /duplicate section anchor/);
});
