# Build status — Israel Taxi & Travel (staging preview)

## Built and working
- Homepage `/` with 4 intent entries (1 internal route, 3 existing israel-taxi.com guides labeled as existing guides) and nav to real sections/guide URLs.
- Route page `/travel-blog/ben-gurion-airport-to-jerusalem/`: journey planner (past-date/time validation, 1–16 passengers, luggage 0–40), local-state summary, pre-booked / on-arrival toggle, Reset, compare checkboxes + side-by-side table, >4 passengers replaces ILS 550 with "Request group quote", unknown capacity = "Confirm with provider", FAQs, sources with 16 Oct 2026 check date, final booking block, sticky desktop rail, mobile section nav + compact sticky Compare button.
- `/about/` methodology page with Moshe Barak relationship disclosure.
- Typed registry `src/data/registry.ts` (sources with checkedAt, operators vs booking partners with declared capability, offers, indicative price model, empty `affiliateConfig`).
- Anonymous outbound click events stored in browser localStorage (`itt_outbound_clicks_v1`) — clicks only, not bookings.
- Staging SEO: every page `noindex,nofollow`; robots.txt allows crawling so the directive is seen; canonical uses staging origin, override with `VITE_CANONICAL_ORIGIN`, `VITE_INDEXABLE=true` at launch. JSON-LD: BreadcrumbList + Article only.

## Outbound links only (no integration)
- Moshe Barak: https://www.israel-taxi.com/airport-transfers/ (the `#request-your-quote` anchor was not found on the page, so the plain URL is used).
- Intui.travel airport page, GetTransfer.com English home, Gett airport info (informational). All regular `noopener noreferrer` links; none are affiliate.

## Still required
- Affiliate agreements + tracking URLs for Intui / GetTransfer (and any partner deep-link parameter documentation).
- Database/CMS, admin with draft/review/published, server-side click logging.
- Live quote APIs (credentials), hotel/tour/ticket templates, Masada ticket inventory validation.
- Production domain + canonical config at launch.

## Tests
- `bunx vitest run` — routing, outbound URL, rel, FAQ and price-cap checks.
- Browser checks: see handoff.
