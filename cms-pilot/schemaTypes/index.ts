import {defineArrayMember, defineField, defineType} from 'sanity'

/**
 * Pilot-only Sanity schema. Existing website components remain untouched.
 * References to page IDs, never free-form HTML/JS.
 */

const pageLink = defineType({
  name: 'pageLink',
  title: 'Internal page link',
  type: 'object',
  fields: [
    defineField({name: 'label', title: 'Label', type: 'string', validation: Rule => Rule.required()}),
    defineField({
      name: 'path',
      title: 'Existing internal path',
      type: 'string',
      description: 'Preserve the existing public route. A page registry / reference picker will replace this field later.',
      validation: Rule => Rule.required().custom(value =>
        typeof value === 'string' && /^\/(?!\/)[a-z0-9/-]+\/$/.test(value)
          ? true
          : 'Use a site-relative path such as /travel-blog/taxis-in-israel/',
      ),
    }),
    defineField({name: 'note', title: 'Optional note', type: 'string'}),
  ],
  preview: {select: {title: 'label', subtitle: 'path'}},
})

const photo = defineType({
  name: 'guidePhoto',
  title: 'Guide photo',
  type: 'object',
  fields: [
    defineField({name: 'image', title: 'Image', type: 'image', options: {hotspot: true}, validation: Rule => Rule.required()}),
    defineField({name: 'alt', title: 'Alt text', type: 'string', validation: Rule => Rule.required()}),
    defineField({name: 'credit', title: 'Credit', type: 'string'}),
    defineField({name: 'sourceUrl', title: 'Source URL', type: 'url'}),
    defineField({name: 'licenseUrl', title: 'License URL', type: 'url'}),
  ],
})

const faqItem = defineType({
  name: 'faqItem',
  title: 'Question and answer',
  type: 'object',
  fields: [
    defineField({name: 'question', title: 'Question', type: 'string', validation: Rule => Rule.required()}),
    defineField({name: 'answer', title: 'Answer', type: 'text', rows: 4, validation: Rule => Rule.required()}),
  ],
  preview: {select: {title: 'question'}},
})

const factItem = defineType({
  name: 'factItem',
  title: 'At-a-glance fact',
  type: 'object',
  fields: [
    defineField({name: 'label', title: 'Label', type: 'string', validation: Rule => Rule.required()}),
    defineField({name: 'text', title: 'Text', type: 'text', rows: 2, validation: Rule => Rule.required()}),
  ],
  preview: {select: {title: 'label', subtitle: 'text'}},
})

const comparisonRow = defineType({
  name: 'comparisonRow',
  title: 'Comparison row',
  type: 'object',
  fields: [
    defineField({
      name: 'cells', title: 'Cells in column order', type: 'array',
      of: [defineArrayMember({type: 'string'})],
      validation: Rule => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {cells: 'cells'},
    prepare({cells}: {cells?: string[]}) {
      return {title: cells?.[0] || 'Comparison row', subtitle: (cells || []).slice(1).join(' · ')}
    },
  },
})

const comparisonTable = defineType({
  name: 'comparisonTable',
  title: 'Comparison table',
  type: 'object',
  fields: [
    defineField({name: 'caption', title: 'Table heading', type: 'string', validation: Rule => Rule.required()}),
    defineField({
      name: 'headers', title: 'Column headings', type: 'array',
      of: [defineArrayMember({type: 'string'})],
      validation: Rule => Rule.required().min(2),
    }),
    defineField({
      name: 'rows', title: 'Rows', type: 'array',
      of: [defineArrayMember({type: 'comparisonRow'})],
      validation: Rule => Rule.required().min(1),
    }),
  ],
})

const richText = [
  defineArrayMember({
    type: 'block',
    marks: {
      annotations: [
        defineArrayMember({
          name: 'internalLink', title: 'Link to site page', type: 'object',
          fields: [
            defineField({
              name: 'path', title: 'Internal path', type: 'string',
              validation: Rule => Rule.required().custom(value =>
                typeof value === 'string' && /^\/(?!\/)[a-z0-9/-]+\/$/.test(value)
                  ? true : 'A valid site-relative path is required',
              ),
            }),
          ],
        }),
        defineArrayMember({
          name: 'externalLink', title: 'External source', type: 'object',
          fields: [defineField({name: 'href', title: 'URL', type: 'url', validation: Rule => Rule.required().uri({scheme: ['http', 'https']})})],
        }),
      ],
    },
  }),
]

const sourceReference = defineType({
  name: 'sourceReference',
  title: 'Source reference',
  type: 'document',
  fields: [
    defineField({name: 'legacyId', title: 'Existing source ID', type: 'string', validation: Rule => Rule.required()}),
    defineField({name: 'title', title: 'Title', type: 'string', validation: Rule => Rule.required()}),
    defineField({name: 'publisher', title: 'Publisher', type: 'string', validation: Rule => Rule.required()}),
    defineField({name: 'url', title: 'URL', type: 'url', validation: Rule => Rule.required().uri({scheme: ['http', 'https']})}),
    defineField({name: 'note', title: 'Editorial note', type: 'text', rows: 3}),
    defineField({name: 'checkedAt', title: 'Last source verification', type: 'date'}),
  ],
  preview: {select: {title: 'title', subtitle: 'publisher'}},
})

const sharedFact = defineType({
  name: 'sharedFact',
  title: 'Shared verified fact',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Editorial title', type: 'string', validation: Rule => Rule.required()}),
    defineField({name: 'body', title: 'Reusable fact', type: 'array', of: richText, validation: Rule => Rule.required()}),
    defineField({name: 'factCheckedAt', title: 'Fact checked on', type: 'date'}),
    defineField({
      name: 'sources', title: 'Official sources', type: 'array',
      of: [defineArrayMember({type: 'reference', to: [{type: 'sourceReference'}]})],
    }),
    defineField({name: 'editorialNote', title: 'Editor-only note', type: 'text', rows: 3}),
  ],
})

const externalResource = defineType({
  name: 'externalResource',
  title: 'External resource',
  type: 'object',
  fields: [
    defineField({name: 'label', title: 'Link label', type: 'string', validation: Rule => Rule.required()}),
    defineField({name: 'href', title: 'URL', type: 'url', validation: Rule => Rule.required().uri({scheme: ['http', 'https']})}),
  ],
  preview: {select: {title: 'label', subtitle: 'href'}},
})

const highlightedResource = defineType({
  name: 'highlightedResource',
  title: 'Highlighted resource link',
  type: 'object',
  fields: [
    defineField({name: 'label', title: 'Link label', type: 'string', validation: Rule => Rule.required()}),
    defineField({name: 'href', title: 'URL', type: 'url', validation: Rule => Rule.required().uri({scheme: ['http', 'https']})}),
    defineField({name: 'context', title: 'Context', type: 'text', rows: 2, validation: Rule => Rule.required()}),
  ],
  preview: {select: {title: 'label', subtitle: 'href'}},
})

const guideSection = defineType({
  name: 'guideSection',
  title: 'Guide section',
  type: 'object',
  fields: [
    defineField({name: 'sectionId', title: 'Stable anchor ID', type: 'string', validation: Rule => Rule.required().regex(/^[a-z0-9-]+$/)}),
    defineField({name: 'title', title: 'Heading', type: 'string', validation: Rule => Rule.required()}),
    defineField({name: 'body', title: 'Body', type: 'array', of: richText}),
    defineField({name: 'photo', title: 'Optional photo', type: 'guidePhoto'}),
    defineField({name: 'bullets', title: 'Bullet points', type: 'array', of: [defineArrayMember({type: 'string'})]}),
    defineField({name: 'tables', title: 'Tables', type: 'array', of: [defineArrayMember({type: 'comparisonTable'})]}),
    defineField({
      name: 'sources', title: 'Sources for this section', type: 'array',
      of: [defineArrayMember({type: 'reference', to: [{type: 'sourceReference'}]})],
    }),
    defineField({
      name: 'sharedFacts', title: 'Shared facts shown in this section', type: 'array',
      of: [defineArrayMember({type: 'reference', to: [{type: 'sharedFact'}]})],
    }),
    defineField({name: 'links', title: 'Related internal links', type: 'array', of: [defineArrayMember({type: 'pageLink'})]}),
    defineField({name: 'externalLinks', title: 'Official external links', type: 'array', of: [defineArrayMember({type: 'externalResource'})]}),
    defineField({name: 'highlightedLinks', title: 'Highlighted links / callouts', type: 'array', of: [defineArrayMember({type: 'highlightedResource'})]}),
  ],
  preview: {select: {title: 'title', subtitle: 'sectionId'}},
})

const travelGuide = defineType({
  name: 'travelGuide',
  title: 'Travel guide (pilot)',
  type: 'document',
  fields: [
    defineField({name: 'legacyId', title: 'Existing guide ID', type: 'string', validation: Rule => Rule.required()}),
    defineField({
      name: 'canonicalPath', title: 'Canonical path — preserve existing URL', type: 'string',
      validation: Rule => Rule.required().custom(value =>
        typeof value === 'string' && /^\/travel-blog\/[a-z0-9-]+\/$/.test(value)
          ? true : 'Required: /travel-blog/some-guide/',
      ),
    }),
    defineField({name: 'title', title: 'Article title', type: 'string', validation: Rule => Rule.required()}),
    defineField({name: 'description', title: 'Meta description', type: 'text', rows: 3, validation: Rule => Rule.required()}),
    defineField({name: 'intro', title: 'Introduction', type: 'text', rows: 4, validation: Rule => Rule.required()}),
    defineField({name: 'answer', title: 'Quick answer', type: 'text', rows: 4, validation: Rule => Rule.required()}),
    defineField({name: 'reviewNote', title: 'Optional editorial note', type: 'text', rows: 2}),
    defineField({name: 'topics', title: 'Guide topics', type: 'array', of: [defineArrayMember({type: 'string'})]}),
    defineField({name: 'hero', title: 'Hero image', type: 'guidePhoto'}),
    defineField({name: 'facts', title: 'At a glance', type: 'array', of: [defineArrayMember({type: 'factItem'})]}),
    defineField({name: 'comparison', title: 'Main comparison', type: 'comparisonTable'}),
    defineField({name: 'sections', title: 'Ordered article sections', type: 'array', of: [defineArrayMember({type: 'guideSection'})]}),
    defineField({name: 'checklist', title: 'Before you go', type: 'array', of: [defineArrayMember({type: 'string'})]}),
    defineField({name: 'faqs', title: 'FAQs', type: 'array', of: [defineArrayMember({type: 'faqItem'})]}),
    defineField({
      name: 'sources', title: 'Article sources', type: 'array',
      of: [defineArrayMember({type: 'reference', to: [{type: 'sourceReference'}]})],
    }),
    defineField({name: 'related', title: 'Related practical guides', type: 'array', of: [defineArrayMember({type: 'pageLink'})]}),
    defineField({name: 'services', title: 'Plan next steps', type: 'array', of: [defineArrayMember({type: 'pageLink'})]}),
    defineField({name: 'nextSteps', title: 'Optional quick links', type: 'array', of: [defineArrayMember({type: 'pageLink'})]}),
    defineField({name: 'factCheckedAt', title: 'Facts checked on (not auto-updated)', type: 'date'}),
    defineField({name: 'reviewedAt', title: 'Editorial review date', type: 'date'}),
  ],
  preview: {select: {title: 'title', subtitle: 'canonicalPath', media: 'hero.image'}},
})

export const schemaTypes = [
  pageLink,
  photo,
  faqItem,
  factItem,
  comparisonRow,
  comparisonTable,
  guideSection,
  externalResource,
  highlightedResource,
  sourceReference,
  sharedFact,
  travelGuide,
]
