# Sanity Uber — staging deployment record

Date: 2026-11-12

This change authorizes a **single staging publication** of the Sanity
`Uber in Israel` draft to the temporary Hostinger site using the
already-validated static build.

- Temporary destination URL: https://saddlebrown-guanaco-454061.hostingersite.com/travel-blog/uber-in-israel/
- Legacy production website: `https://www.israel-taxi.com/` — **must not be touched**.
- Sanity project/dataset: `ekfs0mfw/production`
- Source mode: authorized draft snapshot, built to static HTML
- Pinned main baseline: `08f734356389b6fead2151af3aa34004e69c750b`
- Preflight: all pages, route/SEO checks, and Sanity source image verification passed on GitHub Actions run `43280269903`
- Rollback provision: incremental rsync backup of overwritten files outside public_html; no deletion of remote files
- Concurrency: shares the deployment lock with the regular Hostinger workflow
- If `main` advances before the upload, the deployment **fails closed**.

The content snapshot does not store a Sanity token in the browser bundle.
This record does not by itself approve a future production-domain migration.
