# Sanity editorial publishing → static Hostinger site

## Current pilot scope

- Sanity Studio: https://israel-taxi-travel-ekfs0mfw.sanity.studio/
- Sanity project/dataset: `ekfs0mfw / production` (PUBLIC)
- Current CMS-managed page: `/travel-blog/uber-in-israel/`
- Temporary public testing site: https://saddlebrown-guanaco-454061.hostingersite.com/
- Legacy active site: https://www.israel-taxi.com/ (**not part of this workflow**)

## How editorial publishing works

1. Edit the Uber guide in Sanity Studio. Changes are autosaved as **Draft**.
2. Review the changes; draft-only changes are **not** selected by routine
   Hostinger deployments.
3. Click **Publish** in the Sanity document after approval. This creates
   the public published document in the Sanity `production` dataset.
4. To release the new HTML to Hostinger, open GitHub Actions →
   **Deploy static website to Hostinger Premium** → **Run workflow**.
   - Start with `dry_run=true` to validate credentials and the upload plan
     without writing to the server.
   - Use `dry_run=false` when ready to update the temporary Hostinger website.
5. The workflow checks out the latest verified `main` revision, fetches
   the **published** Uber guide and source references directly from Sanity,
   renders all pages as static HTML, validates 114 sitemap URLs and
   staging `noindex`, creates private backups of files that will be
   overwritten, and uploads only verified assets/HTML.
6. It checks the Uber page and pre-existing PHP API endpoints after deploy.

## How the fallback behaves

- For local development and regular CI, no `SANITY_UBER_SOURCE` setting
  means the historical hard-coded Uber content is used. That keeps builds
  independent of Sanity for tests.
- For **every Hostinger deployment**, `SANITY_UBER_SOURCE=published` is
  enforced. No published Uber document means the build fails **before** any
  upload, rather than rolling the pilot page back to an old hard-coded version.
- The site has no runtime dependency on Sanity and no API token in the HTML.
- Editing or saving a draft does **not** update Hostinger. Only content
  explicitly published in Sanity is eligible for routine deployment.

## Operational safeguards

- Existing SSH credentials and PHP endpoints are reused; no new credentials
  or exposure of Sanity write tokens is needed.
- The legacy `israel-taxi.com` domain is excluded from deploy destinations.
- Each actual upload retains overwritten files in a private
  `cms-static-backups/<GitHub run id>` folder outside `public_html`.
- `rsync` does not use `--delete`. Avoid manual removal of PHP/API,
  `.htaccess`, or deployment markers.
- The main-site freshness guard prevents deploying an obsolete
  commit when another editorial update reaches `main` first.
- Deployment concurrency is shared with all other Hostinger releases.

## Future optional automation

A later Sanity-to-GitHub webhook can trigger the deployment workflow
after the editor clicks **Publish**, or a scheduled read-only sync could
pick up changes. Neither trigger is configured yet; do **not** assume the
Sanity Publish button alone refreshes the Hostinger site.

The editor-side Preview button with a live private draft preview is not yet
implemented. The pilot's manually built draft snapshot was inspected
visually on the temporary Hostinger site and approved.
