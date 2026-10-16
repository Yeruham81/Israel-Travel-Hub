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

## QA pass — 16 Oct 2026
- Arrival date/time labeled as Israel local time; min date and past-time checks use `Intl.DateTimeFormat` with `Asia/Jerusalem` (`src/lib/israel-time.ts`, `src/lib/journey.ts`). Selected time is not converted.
- Removed the unverified "rail limited on Shabbat/holidays" claim (FAQ + Train section); readers are told to check Israel Railways for their exact date and confirm provider availability and night/weekend/holiday charges.
- Old City advice now says to confirm the nearest permitted drop-off and walking distance with accommodation/provider.
- Breadcrumbs (visible + JSON-LD) are now Home > guide only.
- Validation: `TZ=America/New_York bunx vitest run` 8/8 pass (incl. browser-today-but-past-in-Israel case); `tsgo` clean; Playwright with timezone America/New_York confirmed labels, Israel min date and 2-item breadcrumb.

---

## Portal expansion — 16 Oct 2026

Replaces the earlier three-page scope with a full tourism-portal structure. Still unpublished, noindex, no APIs, no affiliate IDs.

### Route inventory (18 pages, all SSR with own title/description/og/canonical + noindex)
- Home `/`, About `/about/`
- Hubs: `/hotels/`, `/transfers/`, `/transfers/ben-gurion-airport/`, `/tours/`, `/attractions/`, `/tickets/`, `/car-rental/`, `/destinations/`
- Leaves: `/travel-blog/ben-gurion-airport-to-jerusalem/` (enhanced; breadcrumb Home > Transfers > Ben Gurion Airport > Jerusalem), `/travel-blog/ben-gurion-airport-to-tel-aviv/`, `/travel-blog/where-to-stay-in-jerusalem/`, `/travel-blog/where-to-stay-in-tel-aviv/`, `/travel-blog/best-hotels-in-tiberias/`, `/tours/bethlehem-from-jerusalem/`, `/travel-blog/masada/`, `/attractions/caesarea/`

### Navigation
- Global left rail on desktop (lg+) on every page; "Explore Israel" header button opens an accessible left drawer (Radix dialog: focus trap, Escape, closes on navigation) below lg. Local "On this page" chip bar is separate. Airport page no longer has a right column.

### Booking modes (registry `BookingMode`)
- `live_quote`: type + guard `isDisplayableLiveQuote` only. **No live API configured; no live prices shown anywhere.**
- `provider_redirect` (regular links): Intui, GetTransfer, Booking.com city pages (Jerusalem/Tel Aviv/Tiberias), DiscoverCars, Bein Harim tour page.
- `provider_inquiry`: Moshe Barak (airport transfers, private driver, private day trips) — disclosed as publisher's business.
- `official_info`: Gett/IAA airport taxi, INPA Masada and Caesarea.
- All links non-affiliate (`affiliateConfig` empty). Click logging is local-only, not bookings.

### Still pending
- Affiliate tracking links (Intui, GetTransfer, Booking.com, DiscoverCars), any live quote API credentials, database/CMS with protected editing, verified property lists, production domain/canonical at launch.

### Validation performed
- `tsgo` type check clean; vitest 15/15 incl. new `portal.test.ts` (sidebar links resolve, hotel shortcuts, no affiliate/live-quote links, no ILS 550 on Tel Aviv, Bethlehem labeled combined, Booking.com not a fact source, live-quote guard).
- Playwright desktop 1280px: all 18 routes 200 with noindex; all internal hrefs resolve; Home > Transfers > Ben Gurion > Jerusalem works; journey essentials render before #plan and #options; 6 passengers → "Request group quote"; comparison table works; sidebar active state; sidebar → Tiberias hotels (preference highlight works, Booking.com link) → Tours → Bethlehem (Bein Harim page); Tickets > Masada → parks.org.il; Car rental pickup toggle → DiscoverCars. No page errors.
- Playwright mobile 390px: no horizontal overflow on any route; drawer opens with focus inside, Escape closes, closes after navigating.
