# Israel Taxi & Travel — Sanity CMS integration

This folder contains the hosted Sanity Studio source for the existing project:

- Project ID: `ekfs0mfw`
- Dataset: `production` (PUBLIC)
- Hosted editor: https://israel-taxi-travel-ekfs0mfw.sanity.studio/

This repository is the source of truth for the Studio schema. It does not
connect the old public domain `israel-taxi.com` or store any secrets.

## Studio development

From `cms-pilot/`, run `npm install && npm run dev` to edit Studio locally.
The project is already created; do not create a second dataset.

The one-time importer at `scripts/import-uber.mjs` was used to create the
Uber guide draft and references. Do not run it over existing editorial content.
Use `npm run check:uber` for a read-only integrity check.

## Static rendering pilot

`scripts/sanity/fetch-uber.mjs` reads a selected Sanity perspective at build
time; the resulting `src/data/generated/sanityUberSnapshot.ts` is temporary.
The source-controlled version of that file contains a null fallback.

- `SANITY_UBER_SOURCE=drafts`: authorized draft preview (server-only token).
- `SANITY_UBER_SOURCE=published`: publicly published guide.
- Unset: render the existing hardcoded Uber guide as before.

Only the Uber guide is connected in this pilot. The existing TravelGuide
React template, 114-page export, and PHP API endpoints are retained.

Never put read/write tokens in client-side `VITE_*` variables. Secrets
belong in GitHub Actions and must not be committed to this repository.

The legacy public domain remains live and independent. The temporary
Hostinger domain is the development environment. Updates to Sanity alone
do not deploy or rebuild the website.
