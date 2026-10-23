# Basic website security baseline — 23 October 2026

Scope: Israel Taxi & Travel (TanStack Start/React SSR, hosted on Lovable).
This is a code and dependency configuration review, not a penetration test and
not proof of which HTTP headers the deployed platform is actually serving.

## Implemented in this change

1. `src/lib/security-headers.server.ts` and `src/server.ts`
   - Non-disruptive security headers on SSR/API responses: X-Content-Type-Options,
     Referrer-Policy, Permissions-Policy, X-Permitted-Cross-Domain-Policies.
   - Production-only `X-Frame-Options: SAMEORIGIN` on HTML responses for
     `israel-taxi.com` and `www.israel-taxi.com`.
   - Preview sites remain embeddable in Lovable's editor.
   - Existing cookies, status codes, no-store API cache settings and response
     bodies are preserved, including errors.
2. `public/_headers`
   - Matching safe baseline headers for static assets when the hosting platform
     supports Cloudflare-compatible `_headers` files.
   - The file DOES NOT configure SSR responses or APIs on its own.
3. `.github/dependabot.yml`
   - Weekly Bun lockfile and GitHub Actions version-update pull requests.
   - No automatic merging/deployment. Human review and CI remain required.
4. `.github/workflows/dependency-security-audit.yml`
   - Weekly/on-demand audit and checks after dependency manifest changes.
   - Separate production dependency and full dependency audits at high/critical
     severity. Workflow intentionally fails when unresolved advisories are found.
5. `src/test/security-headers.test.ts`
   - Tests normal, production, preview, API, error and non-HTML responses.

## Existing website protections preserved

- Same-origin check and JSON-only POST on the quote endpoint.
- Server-side Zod schema and business-specific quote validation, plus consent.
- Small (20KB) request body cap, honeypot, request UUID de-duplication.
- Per-instance rate limiting and concurrency cap for Brevo mail delivery.
- Server-only Brevo API key; no direct visitor-selected recipient or raw
  visitor/provider details in normal mail-delivery error responses.
- HTML-escaped visitor content in transactional emails.
- Server-side fetch with 20s timeout and redirects disabled for Brevo.

## Findings requiring separate fixes or account access

- The first Bun dependency audit reported **14 high/critical advisories** in
  the full dependency graph (13 high + 1 critical), and **5 high** in the
  production-reachable dependency graph. Transitive packages include
  `js-yaml`, `nanoid`, `source-map-js`, `vite`; developer tooling additionally
  includes `shell-quote` and `brace-expansion`. These are advisory matches,
  not proof of exploitable flaws on the live site. Review available fixed
  versions and test upgrades in a separate controlled dependency PR. Never
  silently disable or ignore the audit to show a green workflow.
- No shared rate limiter at the hosting/WAF layer is confirmed; memory-based
  throttles work only per server instance. Add an edge/WAF rule for
  `POST /api/quote-request/` in the actual hosting control panel if available.
  Ensure legitimate customer submissions can still reach Brevo.
- GitHub Dependabot alert/settings and account 2FA cannot be verified or enabled
  by these code changes. Confirm in GitHub Settings → Security and in Lovable,
  GitHub, Brevo, QUIC.cloud DNS and Hostinger account security.
- `Strict-Transport-Security` is deliberately NOT enabled until all production
  hostnames/redirects/certificates are tested after domain cutover.
- A strict script/style CSP is NOT enabled: TanStack Start uses inline hydration
  and the Lovable preview may be framed. First measure CSP violations using an
  environment-appropriate Report-Only policy, then implement nonce/hash support
  and test every page, map, quote form and booking link.
- It is not confirmed that Lovable's platform honors `public/_headers` or uses
  exactly the `src/server.ts` Worker entry in the live deployment; verify the
  live HTTP response headers after publishing.

## Verify after publishing

```sh
curl -I https://israel-taxi-travel.lovable.app/
curl -I https://israel-taxi-travel.lovable.app/api/quote-request/
curl -I https://www.israel-taxi.com/   # only after domain cutover
```

Expected: nosniff/referrer/permissions headers for HTML and JSON; no X-Frame-Options
on preview, but SAMEORIGIN for production HTML; no-store for the quote API.
No permissions/cookie/storage policy should be replaced with static caching rules.
Check the response through browser devtools too, as a host may add/override headers.

Reference: OWASP HTTP Security Response Headers Cheat Sheet and
GitHub Dependabot configuration docs.
