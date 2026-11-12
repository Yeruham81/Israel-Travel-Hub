# Israel Taxi & Travel — Sanity Studio pilot

This directory contains an **isolated editorial pilot**, not a site deployment. It
does not change the existing TanStack Start routes, live website, forms, Hostinger
files, or the root build.

## Connected project configuration

- **Sanity project:** Israel Taxi & Travel
- **Project ID:** `ekfs0mfw`
- **Dataset:** `production` (visibility: **PUBLIC**)
- **Studio config:** `sanity.config.ts`
- **Pilot article:** `/travel-blog/uber-in-israel/`

The dataset name `production` refers only to the Sanity data store. It
does **not** deploy anything to Hostinger, and it does not automatically
publish the site or replace the working static version.

Sanity's public dataset allows unauthenticated reads of **published**
documents. Standard drafts require authentication. Do not store any passwords,
API tokens, customer details, private booking records, or confidential terms
in this dataset. Published source references and editorial copy are suitable.

## Launch Studio locally

1. Install Node.js (compatible with Sanity v4; use a current LTS version).
2. Clone the GitHub branch `feature/sanity-uber-pilot-20261112`.
3. In the repository root, run:
   ```sh
   cd cms-pilot
   npm install
   npm run dev
   ```
4. Sign into Sanity with the account that owns the `Israel Taxi & Travel` project.
5. The editing interface shows document types:
   **Travel guide (pilot)**, **Shared verified fact**, **Source reference**.

**No API token is required to open Studio and sign in through Sanity's normal
authentication flow.** The Studio's create/edit operations require the
signed-in user's authorized project membership.

If you prefer not to operate a local development environment, a future step
is to build and deploy the static Studio interface at a separately
authenticated address. The Studio is not yet hosted.

## What the pilot schema supports

The existing `src/data/travelGuides.ts` record for `uber` will map to
structured fields for: title, SEO description, intro, quick answer, hero
image, at-a-glance facts, comparison table, ordered rich-text sections,
FAQ, article sources, related links, and references to reusable facts.

The source record has not been imported yet. Existing article text remains
in the application's original source files.

## Editing is not yet website publishing

At this stage:
- Saving a draft changes only Sanity.
- Clicking Sanity's built-in **Publish** updates published documents inside
  the public Sanity dataset. It **does not** update Hostinger.
- Public content changes will require a separately engineered and verified
  **Publish to Hostinger** workflow which builds a static site, checks it,
  and then uploads the approved release.
- The current Hostinger static site remains independent and untouched.

For the full architecture and acceptance tests, see the CMS + Hostinger v0.5
specification from the planning conversation.

## Remaining engineering tasks

- Validate Sanity v4 schema locally against the actual project.
- Implement a safe one-time import from `travelGuides.uber`, including
  correct conversion of inline links and sources.
- Implement a content adapter for existing React components, with an
  authenticated draft preview that never leaks drafts into the public pages.
- Implement the manually initiated static build, SEO audit, SFTP deploy,
  deployment status, backups and rollback.
- Run comparison tests of the Uber guide (mobile, desktop, SEO, links).
- Expand to shared content and the airport/hotel templates only after the
  first guide passes all acceptance tests.

**Security:** Never commit secrets, browser-visible write tokens or
contact submissions. The root `.gitignore` already excludes local `.env*`
files other than `.env.example`.


## Optional GitHub Actions deployment (prepared, not yet active)

The draft branch includes `.github/workflows/cms-studio-pilot.yml`.
It validates the Studio and can deploy **only the editor** to
`<studio_hostname>.sanity.studio` after an explicit workflow dispatch.

This workflow is on a **draft branch**, so it is not available as a normal
manual Action until the workflow file is present on GitHub's default branch.

Once the schema has been validated and the workflow is approved:

1. In Sanity Manage → Israel Taxi & Travel → API → Tokens, create a token
   with the **Deploy Studio** grant (not an administrator/content-write token).
2. Store it directly in the GitHub repository at
   Settings → Secrets and variables → Actions as the repository secret
   `SANITY_AUTH_TOKEN`. **Never send the token in chat**.
3. Run the `CMS pilot - Validate or deploy Sanity Studio` workflow
   with `deploy_studio = true`, using an unused studio hostname.

Studio deployment does not affect Hostinger. It also does not automatically
publish or migrate content to the site's public HTML.


## First real content import — Uber in Israel

A safe importer is implemented at `cms-pilot/scripts/import-uber.mjs`.

- `npm run check:uber` parses `travelGuides.uber` from the source repository,
  verifies all article and section source records, detects the two local
  image assets, builds rich-text annotations from the editorial inline links
  and validates comparison table lengths. **No network or writes.**
- `npm run import:uber` requires a distinct write-scoped
  `SANITY_IMPORT_TOKEN`. It creates **one Sanity draft** using the stable
  document ID `drafts.travelGuide.uber` and creates missing public
  `sourceReference.*` records, then uploads the article's image assets.
- The importer **refuses to overwrite** either an existing draft or a
  published `travelGuide.uber`. It never deletes any documents, does not
  mark the guide as published, and does not update Hostinger.
- Media uploads may create asset records even if a later step fails. Re-running
  after an interrupted import can reuse existing source records, but do not
  reuse after manually editing or publishing the guide without inspecting it.

### One-time GitHub Actions import procedure

1. Create a **separate content-write token** in Sanity Manage for this pilot.
   The existing `SANITY_AUTH_TOKEN` deploy credential is *not* enough to
   create or upload content. Use a project permission suitable for content
   creation and image upload; do not grant organizational administration.
2. Save this token directly to GitHub → repository Settings → Secrets and
   variables → Actions as **`SANITY_IMPORT_TOKEN`**. Do not share it in chat.
3. Run and review the dry-run validation on PR #12. Only after it passes,
   add the `cms-import-uber` label to PR #12 to trigger
   `.github/workflows/cms-uber-import.yml`. This workflow can **only create**
   the named Uber draft and source records in the configured project/dataset.
4. Open Sanity Studio → **Travel guide (pilot)** and inspect the
   unpublished **Uber** draft. Pay particular attention to the two images,
   table cells, section link callouts and sources.
5. Remove the import label after execution to prevent accidental reruns,
   and revoke/delete the one-time write token when import is confirmed.

**Important:** The button **Publish** inside Sanity makes the document
publicly readable from Sanity's `production` dataset. It still does **not**
rebuild or update the Hostinger test site. Until an adapter and safe
`Publish to Hostinger` workflow exist, keep the article as a draft.


## Pilot website integration: Uber page only

The existing page template (`src/components/TravelGuide.tsx`) remains the renderer.
An explicitly selected Sanity snapshot is converted to the site's
`TravelGuide` shape **before** the static site build:

- `SANITY_UBER_SOURCE=published`: fetches approved published content.
  Public dataset reads need no API token.
- `SANITY_UBER_SOURCE=drafts`: previews the latest draft inside a temporary
  static-build workspace. Use a server-only `SANITY_READ_TOKEN` or the existing
  temporary `SANITY_IMPORT_TOKEN`; never expose it in a `VITE_*` variable.
- Without `SANITY_UBER_SOURCE`, nothing is fetched from Sanity and the existing
  static article continues to render unchanged.
- A missing guide, missing source reference, invalid link, wrong canonical
  URL, unsupported Portable Text block, or inconsistent table **fails the
  selected build** rather than silently discarding content.

Implementation: `scripts/sanity/uber-adapter.mjs`,
`scripts/sanity/fetch-uber.mjs`,
`src/data/generated/sanityUberSnapshot.ts`, and
`scripts/build-validated-static.sh`.

The generated snapshot file is temporary CI working data and contains public
site text and citations, not authorization tokens. It must not be committed
from a draft preview. No queries or tokens are sent to site visitors.

### Trial static preview without deploying

On draft PR #12, add the `cms-preview-uber` label to run
`.github/workflows/cms-uber-static-preview.yml`. It reads the draft using
the existing GitHub secret, renders a complete static export in GitHub Actions,
runs SEO and route checks, and attaches the Uber HTML plus a conversion snapshot
as a short-lived artifact. **It does not change Hostinger**.

This preview must pass before integrating a user-initiated Hostinger publishing
pipeline. Keep `israel-taxi.com` untouched throughout the pilot.
