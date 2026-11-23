# Production domain cutover — Israel Taxi & Travel

**Target:** https://www.israel-taxi.com/ (primary, with non-www redirected to www).

**Current state:** this is a readiness runbook, not an authorization to change DNS,
remove WordPress, publish production HTML, enable indexing, or edit the existing
PHP redirects. All prelaunch work must leave the live site unchanged.

## Automated protections already in place

- `src/lib/site.ts`: a preview cannot set its HTML robots tag to `index,follow`
  even if `VITE_INDEXABLE=true` is accidentally supplied; both the exact
  canonical production origin and explicit indexable flag are required.
- `scripts/generate-sitemap.mjs`: sitemap and robots are generated from file
  routes **at build time**, using `VITE_CANONICAL_ORIGIN`.
- `scripts/verify-hostinger-static-export.mjs`: rejects an indexable export
  for any origin except the exact `https://www.israel-taxi.com`, and verifies
  exported sitemap/robots, all rendered HTML routes and their self canonicals.
- `.github/workflows/launch-production-preflight.yml`: performs a full
  production-configuration prerender and validation **without deployment**.
- `.github/workflows/deploy-hostinger-premium.yml`: the deployed directory
  must have a marker, no WordPress entrypoints/admin directories, and both PHP API
  endpoints. Its rsync excludes PHP, `/api/`, `.htaccess`, `.well-known` and
  does not delete files. It does not update server-managed redirect rules.
- `HOSTINGER_CUTOVER_FREEZE=true` stops automatic publishing and refuses
  real manual uploads while allowing manual `dry_run=true` checks. This must
  be set **before** changing a Hostinger domain binding.
- Publishing to a webroot under `/domains/israel-taxi.com/` or
  `/domains/www.israel-taxi.com/` additionally requires production metadata,
  the normal webroot marker/API/WordPress safety checks, and
  `HOSTINGER_PRODUCTION_DEPLOY_APPROVED=true` for non-dry-run uploads.
  Production approval is never inferred from a directory name.

## Before switching the domain (manual verification)

1. Record the **actual** webroot for the new site in Hostinger. Do not point
   `HOSTINGER_REMOTE_PATH` at the old WordPress webroot. If Hostinger needs
   a website/domain re-assignment, arrange for `israel-taxi.com` to serve the
   **new** application's webroot including its existing `/api/*.php` files and
   reviewed `.htaccess` redirects. Confirm Hostinger's behavior before DNS edits.
2. Back up the old WordPress site and its database, the new webroot, and the
   complete server-managed `.htaccess` and PHP redirect file(s).
3. Audit the existing 301 redirects **on their eventual production host**.
   Preserve the owner-approved PHP redirect map and original public URLs.
   Test a representative set of old routes and destination slugs; no loops
   or redirects to staging, and no WordPress fallback for new routes.
4. Verify the new site's `/api/quote-request/` and
   `/api/exchange-rates/` return valid JSON GET responses in the webroot,
   and send several real low-risk test enquiries (each form type) from the
   new site. Confirm Brevo acceptance **and receipt in the actual mailbox**.
   No secrets or customer details should appear in browser assets.
5. Test the `www` and apex DNS plan. Change **web records only**; preserve
   existing MX, SPF, DKIM, DMARC and any email-verification records.
6. Verify that the legacy WordPress domain and old Google Search Console and
   GA4 properties are identifiable for post-launch comparison.
7. Run the manual **Production domain preflight** GitHub Action and require a
   green status. It creates production canonical/indexable HTML but does not upload.
8. Review Google Analytics consent, contact/lead events, third-party affiliate
   widgets, performance, accessibility, security headers, and error monitoring.
   These need an implementation/verification pass before a public cutover.

## Hostinger domain swap: reviewed sequence

The domain's DNS remains managed by **QUIC.cloud**. Do **not** transfer the
registration or change nameservers. Domain assignment in Hostinger and DNS
record updates in QUIC.cloud are separate operations; changing a hostname
may change the absolute website folder or available backups.

1. Confirm completed UpdraftPlus and separately saved webroot/redirect/API
   backups. Previous WordPress contents must remain restorable.
2. In GitHub repository **Settings → Secrets and variables → Actions →
   Variables**, set `HOSTINGER_CUTOVER_FREEZE=true` and
   `HOSTINGER_AUTO_DEPLOY=false`. Leave
   `HOSTINGER_PRODUCTION_DEPLOY_APPROVED=false`. Verify that no deployment is
   in progress. An unconfigured freeze flag defaults to false.
3. In Hostinger **Websites**, use the old WordPress site's **Change domain**
   option to move that website to a temporary domain. Ensure the website
   remains present under the replacement domain. Hostinger may change its
   filesystem location and temporary-domain URLs.
4. In Hostinger **Websites**, use **Connect domain** for the NEW PHP/HTML site
   and connect `israel-taxi.com`. Never select deletion or overwrite of the
   WordPress website.
5. Using Hostinger's **File Manager → All hosting files** (or SSH), copy the
   **actual** new-site webroot path, then verify it contains
   `.ith-static-deploy-ok`, `index.html`, `.htaccess`,
   `api/quote-request/index.php`, `api/exchange-rates/index.php` and
   `api/_internal/`; verify **no** `wp-config.php`, `wp-load.php`,
   `wp-admin/`, or `wp-includes/`. Find the original WordPress webroot
   separately and do not deploy into it. If the PHP files or the reviewed
   301 redirect rules were not preserved, restore them in the correct site
   before permitting an upload.
6. Check DNS for both `israel-taxi.com` and `www.israel-taxi.com`. Adjust
   only necessary **web** records in QUIC.cloud, based on Hostinger's actual
   instructions. Keep MX, SPF, DKIM, DMARC, mail verification records and
   nameservers unchanged. Verify HTTPS certificates for both hostnames.
7. Update the GitHub **repository secret**
   `HOSTINGER_REMOTE_PATH` **only if** the new site's verified webroot
   changed. Never use the old WordPress path. Set repository variables
   `HOSTINGER_CANONICAL_ORIGIN=https://www.israel-taxi.com` and
   `HOSTINGER_INDEXABLE=true`. Keep `HOSTINGER_CUTOVER_FREEZE=true`.
8. Run the **Production domain preflight (build only, never publish)** action;
   it must pass. Then run **Deploy static website to Hostinger Premium**
   manually with `dry_run=true`. Check its remote-path guard and rsync plan;
   it must show no uploaded files and must identify the NEW site.
9. After verifying the webroot, set
   `HOSTINGER_PRODUCTION_DEPLOY_APPROVED=true` **if and only if** the new root
   is now inside `/domains/israel-taxi.com/` or
   `/domains/www.israel-taxi.com/`. Set
   `HOSTINGER_CUTOVER_FREEZE=false`, keep `HOSTINGER_AUTO_DEPLOY=false`,
   and run the deploy workflow manually with `dry_run=false`.
10. Run **Audit Hostinger website operations (read only)**. Confirm actual
    `https://www.israel-taxi.com/` returns the newly published pages,
    production canonicals and robots, the new Sitemap and both API JSON GET
    responses. Check no host-level Googlebot block or `X-Robots-Tag: noindex`,
    including QUIC.cloud's cached response. Inspect a representative sample
    of approved old-route 301 redirects for no loop or staging target;
    test website images, scripts, forms, affiliate widgets, TLS, and apex→www.
11. A single end-to-end enquiry on the new production hostname should arrive
    in the established Zoho mailbox. Previous successful tests on the
    temporary domain do **not** need repeating before cutover.
12. Only after production passes all checks, set
    `HOSTINGER_AUTO_DEPLOY=true` and keep
    `HOSTINGER_CUTOVER_FREEZE=false`. Submit the canonical sitemap to the
    existing Search Console property and monitor routing and email delivery.

**DNS/webroot caveat:** moving two websites between Hostinger domains can
leave the old and new websites on the same hosting IP yet change their
document roots; do not assume an unchanged IP implies a valid domain mapping.

## Rollback

Keep the old site and backups available during launch. If contact delivery,
routing, or rendering fails, restore the prior working domain mapping or webroot
and its existing PHP configuration, revert `HOSTINGER_INDEXABLE` as appropriate,
and verify mail records remain untouched. Do not replace the production site
until the exact cause is identified.

## Important limitations

- GitHub Actions cannot update server-managed PHP, `.htaccess`, Hostinger domain
  bindings, DNS or mailbox routing using the static deployment workflow.
- `VITE_CANONICAL_ORIGIN` is a build-time setting, not a DNS configuration.
- The current server-side PHP redirect map is **not** in this repository.
  It must be inspected/tested at Hostinger, not inferred from route files.
