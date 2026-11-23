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
  must have a marker, no WordPress `wp-config.php`, and both PHP API endpoints.
  Its rsync excludes PHP, `/api/`, `.htaccess`, `.well-known` and does not
  delete files. It does not update the server-managed redirect rules.

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

## Launch window

1. Associate the production domain with the new Hostinger website/webroot and
   install valid TLS for `www.israel-taxi.com` and `israel-taxi.com`.
   Do **not** upload over the old WordPress installation.
2. Arrange 301 for apex -> www (and HTTP -> HTTPS), preserving the existing
   page-level redirects. Be careful about redirect rule order.
3. Ensure staging/temporary hostname is not independently indexable once
   production HTML is published (prefer host-specific 301 to www; otherwise
   a host-specific `X-Robots-Tag: noindex`). Remove any server-level production
   `noindex` or `X-Robots-Tag` header before allowing indexing.
4. Only after the production webroot/domain is confirmed, set repository
   Actions variables:
   - `HOSTINGER_CANONICAL_ORIGIN=https://www.israel-taxi.com`
   - `HOSTINGER_INDEXABLE=true`
   - `HOSTINGER_REMOTE_PATH`: keep its existing secret if the verified new
     site still serves the same webroot; otherwise update only to a verified,
     non-WordPress webroot carrying `.ith-static-deploy-ok` and the PHP APIs.
5. Trigger **Deploy static website to Hostinger Premium** manually with
   `dry_run=true`, inspect the planned remote path and uploaded files. Then
   run with `dry_run=false` only after reviewing safety checks. Automatic
   deployment may remain disabled until production health tests pass.
6. Confirm a real public 200 response and correct HTML canonical/meta robots
   on the home page and sampled routes. Verify `/robots.txt`,
   `/sitemap.xml`, important 301 redirects, `/privacy-policy/`,
   `/terms-of-use/`, CSS/images/fonts, widgets and both PHP APIs.
7. Verify enquiry delivery **end to end** again on the final production host;
   a status 200 alone does not prove inbox delivery.
8. Submit `https://www.israel-taxi.com/sitemap.xml` in the existing
   Search Console property; inspect indexing/404s and GA4 real-time events.

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
