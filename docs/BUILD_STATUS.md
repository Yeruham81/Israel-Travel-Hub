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
- `provider_inquiry`: Moshe Barak (airport transfers, private driver, private day trips) — disclosed as publisher's business. Relevance correction 16 Oct 2026: `private-daytrips-moshe` no longer lists the Bethlehem page (`pageIds` is `["tours-hub", "masada"]`) because the operator's general private-day-trips page does not verify a Bethlehem itinerary; the Bethlehem leaf's offer area and end CTA show only the verified Bein Harim combined tour, with Moshe's page retained as a source reference for generic private-tour planning advice.
- `official_info`: Gett/IAA airport taxi, INPA Masada and Caesarea.
- All links non-affiliate (`affiliateConfig` empty). Click logging is local-only, not bookings.

### Still pending
- Affiliate tracking links (Intui, GetTransfer, Booking.com, DiscoverCars), any live quote API credentials, database/CMS with protected editing, verified property lists, production domain/canonical at launch.

### Validation performed
- Relevance correction 16 Oct 2026: removed `bethlehem` from `private-daytrips-moshe.pageIds`; `portal.test.ts` 7/7 passed; type check and build OK; live check of `/tours/bethlehem-from-jerusalem/` confirms only Bein Harim in the provider area and end CTA ("Request a quote on Israel-Taxi.com" no longer appears; "Private day trips" remains only in the Sources list as planning reference). Still unpublished/noindex, non-affiliate links, API-free prototype.
- `tsgo` type check clean; vitest 15/15 incl. new `portal.test.ts` (sidebar links resolve, hotel shortcuts, no affiliate/live-quote links, no ILS 550 on Tel Aviv, Bethlehem labeled combined, Booking.com not a fact source, live-quote guard).
- Playwright desktop 1280px: all 18 routes 200 with noindex; all internal hrefs resolve; Home > Transfers > Ben Gurion > Jerusalem works; journey essentials render before #plan and #options; 6 passengers → "Request group quote"; comparison table works; sidebar active state; sidebar → Tiberias hotels (preference highlight works, Booking.com link) → Tours → Bethlehem (Bein Harim page); Tickets > Masada → parks.org.il; Car rental pickup toggle → DiscoverCars. No page errors.
- Playwright mobile 390px: no horizontal overflow on any route; drawer opens with focus inside, Escape closes, closes after navigating.

## Homepage visual redesign (16 Oct 2026)
- Homepage rebuilt as photo-led portal: full-bleed Jerusalem hero with overlay CTAs and six-category quick nav; each of the six service sections has a large feature photo (text on gradient overlay + hub CTA) beside/above smaller photo cards that are full internal links; popular destinations are photo cards. Hover zoom disabled under prefers-reduced-motion. No provider data, prices, booking behaviour or routes changed.
- Images stored in `src/assets/home/` as WebP (≤1200–1400px, ~100–230 KB each). Hero is the existing Jerusalem image (eager, high priority); all others lazy.
- Named-place photos (Wikimedia Commons, location verified by file title/visual review):
  - tel-aviv-coast — "PikiWiki Israel 58105 jaffa - old city.jpg", Ariel Manor, CC BY 2.5 (Tel Aviv shoreline seen from Jaffa)
  - tiberias-lake — "Tiberias from the Sea of Galilee (5809646279).jpg", Ian Scott, CC BY-SA 2.0
  - ben-gurion-t3 — "Ben Gurion Airport terminal 3 reception hall.jpg", GeorgeDement, CC BY-SA 2.0
  - bethlehem-nativity — "Palestine, Bethlehem, Church of the Nativity or Birthplace of Jesus (Square).jpg", Britchi Mirela, CC BY-SA 4.0
  - masada-dead-sea — "Israel-2013-Aerial 13-Masada.jpg", Godot13, CC BY-SA 4.0
  - masada-cable-car — "Masada Cable Car 1438 (511094328).jpg", James Emery, CC BY 2.0
  - masada-cable-car-wide — "Israel Aerial Ropeway Masada BW 1.jpg", Berthold Werner, public domain
  - caesarea-dusk — "125342 caesarea national park PikiWiki Israel.jpg", Zeev Stein, CC BY 2.5
  - caesarea-aqueduct — "125359 caesarea national park PikiWiki Israel.jpg", Zeev Stein, CC BY 2.5
  - caesarea-theatre — "Caesarea maritima BW 4.JPG", Berthold Werner, public domain
  - jerusalem-old-city — resized copy of existing project hero image
- Generic category illustrations (AI-generated, alt text marks them illustrative, no named property/company): hotel-pool, airport-pickup, guided-tour, road-trip.
- Pending: a visible photo-credits line/page for CC BY / BY-SA attribution should be added before launch.
- Validation: browser at 1280px and 390px — 26/26 homepage images loaded (naturalWidth>0), horizontal overflow 0, all 16 internal homepage link targets returned 200; whole page scrolled and screenshots reviewed (screenshots/home-desktop-v2.png, home-mobile-v2.png). Noindex unchanged; nothing published.
