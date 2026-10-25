# Hostinger Premium Static Hosting Trial — 25 October 2026

**Status:** Initial build succeeded. Static HTML output exists for **114/114
canonical routes** in the current sitemap. The public site, GitHub main,
WordPress, DNS and Lovable deployment were not modified by this experiment.

## What this experiment proves

- TanStack Start's prerendering can generate a separate HTML document for every
  sitemap route using the site's existing code and dependencies.
- The output directory is `.output/public/`, containing `index.html`,
  `assets/`, and route directories with `index.html` inside them.
- The site can be tested on ordinary PHP/HTML static hosting, without a
  continuously running Node.js process on Hostinger.

## What it does not prove yet

- The files have not yet been uploaded to Hostinger; the runtime, HTTPS,
  headers, caching and browser navigation need real-host testing.
- `/api/quote-request/` and `/api/exchange-rates/` are server routes. They
  cannot run from HTML files alone. Reimplement the exact validated handlers
  using Hostinger PHP plus server-only secrets before using real quote forms.
- The existing Workers-based SSR security headers are NOT automatically
  available from static output. Configure Hostinger's `.htaccess` and test.
- The test build intentionally contains `noindex,nofollow` and uses the
  placeholder origin `https://static-trial.invalid`. A production build must
  use the final canonical domain and `VITE_INDEXABLE=true`.
- WordPress legacy 301s still need to be migrated and validated before launch.
- Lovable remains the editor; GitHub Actions will build files and a separate
  delivery mechanism (e.g., SFTP or deployed build-output branch) will publish
  only the compiled files to Hostinger.

## Test deployment (no DNS change)

1. In Hostinger hPanel, open **Websites** on the existing Premium plan.
2. Add a new **Custom PHP/HTML website** and use a **temporary domain**.
   Do not replace the existing WordPress site.
3. Download the artifact named `hostinger-premium-static-trial` from the
   successful GitHub Actions run for this branch.
4. Extract the artifact; upload its **contents** to the new website's
   `public_html/`. Ensure `public_html/index.html`, `public_html/assets/`,
   `public_html/travel-blog/masada/index.html`, and `public_html/.htaccess`
   are present, not nested inside another `.output` directory.
5. Test the temporary domain homepage, `/guides/`,
   `/travel-blog/masada/`, and `/accommodation/`. Check responsive
   design, hydration, internal navigation, images, direct deep-page visits and
   404 behavior. Test in a normal browser and in PageSpeed.
6. Do NOT send real quotes or expect USD/EUR conversions to refresh yet.

The experimental `.htaccess` is included only for the temporary trial. It
disables directory listings and tells crawlers to avoid indexing the trial
domain. It is not the final production security and redirect configuration.

## Feasible production architecture on Premium

```
Lovable editing → GitHub main → GitHub Actions build/prerender
  → deploy static files to Hostinger Premium /public_html
  → Hostinger PHP endpoints for quote requests and currency rates
```

Production requires an authorized delivery method (prefer SFTP or a dedicated
build-output branch). Never expose SFTP credentials or Brevo API keys in code,
`VITE_*` variables, or this repository. Use GitHub Actions encrypted secrets,
and store any PHP server secrets outside the public webroot.

## Constraints

The Premium plan supports PHP/HTML static hosting, SSH/SFTP and Git deployment,
but the current dynamic TanStack Start SSR runtime cannot run unmodified there.
This is a successful **static export build test**, not yet a successful
**production migration**.
