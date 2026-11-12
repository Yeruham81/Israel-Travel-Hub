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
