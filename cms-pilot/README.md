# Israel Travel Hub — Sanity pilot (isolated)

This directory is **scaffolding for a separate editorial pilot**, not a deployment.
Nothing here changes existing routes, public pages, forms, Hostinger files, or the root build.

## Scope

First guide: `/travel-blog/uber-in-israel/`, source `travelGuides.uber` in
`src/data/travelGuides.ts`. The schema supports titles, introduction, quick
answer, media, tables, sections with Portable Text, FAQ, official references,
related internal links, and shared facts.

The remaining pilot templates (airport journey and city stay) are not being
migrated in this first step.

## Setup prerequisites

1. Create a **new Sanity project and pilot dataset** via your own Sanity account.
2. Install Node.js 22.12+; from `cms-pilot/`, run `npm install`.
3. Copy `.env.example` to `.env.local` and set the real Sanity project ID.
4. Run `npm run dev` and sign in to your Sanity account.
5. Do **not** publish to production from this pilot; configure an approved
   staging integration before migrating actual website content.

The project ID/dataset are configuration, **not secret API tokens**.
Never put read/write tokens, private data, contact submissions, or credentials
in Studio environment variables or in documents in a public dataset.

## Remaining engineering tasks (not completed)

- Implement a one-time importer from `travelGuides.uber`, converting inline
  phrases to Portable Text links and mapping official sources to references.
- Implement an adapter that renders Studio content using the existing
  `TravelGuidePage` design (and retains canonical URL/structured metadata).
- Build a protected staging Preview that does not leak draft content.
- Add a manual **Publish to Hostinger** action which builds + validates the
  entire static export before any upload. Avoid confusing Sanity's ordinary
  document Publish with the public Hostinger deployment.
- Validate static HTML, SEO, images, FAQ, internal links, outbound link safety,
  and existing business forms.
- Add rollback, off-platform backups, and deployment status reporting.
- Add further shared-content references only after impact-preview testing.

The existing static Hostinger release continues independently of Sanity.
This pilot is not operational until its import, rendering, preview, and deploy
stages have been implemented and tested.
