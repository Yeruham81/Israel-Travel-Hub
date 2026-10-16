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
- Images stored in `src/assets/home/` as WebP (≤1200–1400px, ~100–230 KB each). Hero is the Jerusalem Old City photo (eager, high priority); all others lazy.
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
  - Generic category illustrations (AI-generated, alt text marks them illustrative, no named property/company): hotel-room, airport-pickup, guided-tour, road-trip.
- Attribution implemented: collapsed "Photo credits" disclosure at the bottom of the homepage (data in `src/data/photoCredits.ts`). License URLs: CC BY 2.5 https://creativecommons.org/licenses/by/2.5/ ; CC BY 2.0 https://creativecommons.org/licenses/by/2.0/ ; CC BY-SA 2.0 https://creativecommons.org/licenses/by-sa/2.0/ ; CC BY-SA 4.0 https://creativecommons.org/licenses/by-sa/4.0/ . Source file pages: https://commons.wikimedia.org/wiki/File:PikiWiki_Israel_58105_jaffa_-_old_city.jpg ; https://commons.wikimedia.org/wiki/File:Tiberias_from_the_Sea_of_Galilee_(5809646279).jpg ; https://commons.wikimedia.org/wiki/File:Ben_Gurion_Airport_terminal_3_reception_hall.jpg ; https://commons.wikimedia.org/wiki/File:Palestine,_Bethlehem,_Church_of_the_Nativity_or_Birthplace_of_Jesus_(Square).jpg ; https://commons.wikimedia.org/wiki/File:Israel-2013-Aerial_13-Masada.jpg ; https://commons.wikimedia.org/wiki/File:Masada_Cable_Car_1438_(511094328).jpg ; https://commons.wikimedia.org/wiki/File:Israel_Aerial_Ropeway_Masada_BW_1.jpg ; https://commons.wikimedia.org/wiki/File:125342_caesarea_national_park_PikiWiki_Israel.jpg ; https://commons.wikimedia.org/wiki/File:125359_caesarea_national_park_PikiWiki_Israel.jpg ; https://commons.wikimedia.org/wiki/File:Caesarea_maritima_BW_4.JPG . All resized and converted to WebP. The former AI-created Jerusalem hero has been removed. Jerusalem hero and card variants (jerusalem-old-city-hero.webp 1600px, jerusalem-old-city.webp 900px) now use "Jerusalem Dome of the rock BW 14.JPG" by Berthold Werner, public domain, https://commons.wikimedia.org/wiki/File:Jerusalem_Dome_of_the_rock_BW_14.JPG (Commons metadata checked 16 Oct 2026). The accommodation feature image is now an AI-generated generic hotel room (hotel-room.webp) that replaces the rooftop-pool illustration; it shows no skyline or landmark.
- Validation: browser at 1280px and 390px — 26/26 homepage images loaded (naturalWidth>0), horizontal overflow 0, all 16 internal homepage link targets returned 200; whole page scrolled and screenshots reviewed (screenshots/home-desktop-v2.png, home-mobile-v2.png). Noindex unchanged; nothing published.

## Homepage refinement: content-first sections + rotating hero (16 Oct 2026)
- Six service sections are now bounded panels (alternating card / accent backgrounds) with numbered eyebrow, H2 (Accommodation in Israel; Airport transfers & private transport; Tours & day trips; Attractions & experiences; Tickets & admission; Car rental), intro and hub CTA ABOVE the media. One modest feature image (16:10, max 300px tall on desktop) plus compact photo+text cards (H3 labels) as full internal links. Popular destinations section headed "Popular destinations". One H1, 7 H2, 16 H3.
- Hero is `src/components/HeroCarousel.tsx`: six real-location slides, 6 s auto-advance, 1 s crossfade, stable headline/CTAs, location caption, prev/next, position selectors, pause/play. Pauses on hover, focus within, hidden tab; manual selection resets the timer; prefers-reduced-motion starts paused with no fade (manual nav works; Play opts in). Caption is aria-live only while paused. Only current + next slide images are mounted (first one eager/high priority); 1920px desktop / 900px mobile WebP variants via <picture>.
- Hero photo sources (Commons metadata re-read 16 Oct 2026; all cropped to ~2.2:1, resized, WebP):
  - Jerusalem — https://commons.wikimedia.org/wiki/File:Jerusalem_Dome_of_the_rock_BW_14.JPG — Berthold Werner — Public domain
  - Tel Aviv promenade — https://commons.wikimedia.org/wiki/File:Tel_Aviv_Tayelet-Strand-Promenade_Beach_(34257299744).jpg — FLASHPACKER TRAVELGUIDE — CC BY-SA 2.0 https://creativecommons.org/licenses/by-sa/2.0/
  - Haifa/Carmel — https://commons.wikimedia.org/wiki/File:Panorama_Haifa_(cropped).jpg — Юкатан — CC BY-SA 3.0 https://creativecommons.org/licenses/by-sa/3.0/
  - Masada — https://commons.wikimedia.org/wiki/File:Israel-2013-Aerial_13-Masada.jpg — Godot13 — CC BY-SA 4.0
  - Caesarea — https://commons.wikimedia.org/wiki/File:125342_caesarea_national_park_PikiWiki_Israel.jpg — זאב שטיין — CC BY 2.5
  - Sea of Galilee — https://commons.wikimedia.org/wiki/File:Tiberias_from_the_Sea_of_Galilee_(5809646279).jpg — Ian Scott — CC BY-SA 2.0
  Visible homepage photo credits updated (Tel Aviv promenade and Haifa added). The single-image `jerusalem-old-city-hero.webp` was removed.
- Validation (Playwright, desktop 1280 + mobile 390): auto-advance Jerusalem→Tel Aviv after ~6.8 s; Next and selector jump immediately; Pause held for 7 s; Play resumed and advanced; keyboard focus inside the carousel held for 7 s; simulated hidden tab held for 7 s; reduced-motion mobile started paused (Play button shown), did not advance in 7 s, Next worked. All 6 slides showed a loaded image (naturalWidth 1920) with unchanged hero height. All six H2s sit above their section media; card counts 3/3/2/3/2/3; all section images loaded; horizontal overflow 0 on both viewports; 16/16 internal homepage links 200; no page errors; type check clean. Screenshots: screenshots/home-desktop-v3-sections.png, home-hero-slides.png, home-mobile-v3.png.

## Hero carousel robustness fix (16 Oct 2026)
- Switching (manual selectors/arrows and automatic advance) now waits until the target slide's displayed image has loaded and decoded; until then the current photo and caption stay visible. Each request gets an id and only the newest request may switch, so a late older image cannot overwrite a newer choice. A failed image leaves the current slide and controls usable (the failed slide can be retried later).
- Prefetch one slide ahead is retained. Requested slide images stay mounted (hidden) once fetched, so previously viewed/prefetched photos remain in the page; the earlier note saying only current + next are mounted is superseded. Only the first slide has high fetch priority.
- Visibility state is read on mount, so a page first opened in a hidden tab does not start autoplay.
- Checks (Playwright, Caesarea image delayed 3 s, Tiberias image blocked): first direct jump to uncached Caesarea kept Jerusalem photo + caption at 1 s, then showed Caesarea (naturalWidth 1920) once loaded; Caesarea then Haifa clicked rapidly → Haifa stayed after Caesarea's late load; blocked Tiberias kept Haifa visible and Next still worked; Tel Aviv delayed 9 s → autoplay held Jerusalem until it loaded, then advanced; page opened hidden did not advance in 7.5 s; type check clean, build OK.

## Shore excursions — seventh service domain (16 Oct 2026)
- New routes (page count now 21): `/shore-excursions/` (hub with two photo port cards), `/ashdod-shore-excursions/` and `/haifa-shore-excursions/` (existing production paths preserved). Port pages use shared `src/components/PortPage.tsx`: overview, itinerary ideas, timing around all-aboard, driver vs licensed guide vs shared, checklists, then the provider area, FAQ, sources, related links, end CTA.
- Registry: 4 new sources (owner Ashdod and Haifa pages; Bein Harim Ashdod-port and Haifa-port Jerusalem/Bethlehem products, checkedAt 2026-10-16 for public page facts only) and 4 provider links (Moshe = publisher_operator, provider_inquiry; Bein Harim = independent_operator, provider_redirect). All non-affiliate; no prices, availability, port-access, return guarantees or ship tracking claimed. Owner's Ashdod prices/ILS-USD wording and guarantee wording deliberately not reproduced.
- Navigation: `serviceNav` gains "Shore excursions"; header now uses `serviceDomains` (all seven services, shown at 2xl+, sidebar below that); shortcuts add both ports (sidebar + mobile drawer); footer lists all services. Homepage section 04 "Shore excursions" (after Tours) with cruise feature image and compact Ashdod/Haifa cards; quick nav is 2 cols (last item spans) / 4 cols sm / 7 cols xl.
- Images: `ashdod-port.webp` — https://commons.wikimedia.org/wiki/File:Ashdod_Port_Aerial_View.jpg, Amos Meron, CC BY-SA 3.0, cropped 3:2/resized/WebP. `haifa-port.webp` — cropped from the existing Haifa hero (https://commons.wikimedia.org/wiki/File:Panorama_Haifa_(cropped).jpg, Юкатан, CC BY-SA 3.0). `cruise-port.webp` — AI-generated generic illustration (unnamed ship, no operator). Visible photo credits updated.
- Checks: type check clean; 15/15 existing tests pass. Playwright at 1280/1536/390: section order accommodation→transfers→tours→shore-excursions→attractions→tickets→car-rental; Shore H2 above media; 3 section images loaded; card links resolve; quick nav single row of 7 on desktop, 2-col wrap on mobile; header (1536) shows all 7 + About with no overflow; sidebar and drawer contain hub + both port links; drawer closes after navigating to Haifa page; no horizontal overflow; no page errors. Hub/port pages 200, noindex, images loaded, sections in information-first order, provider URLs match each port, no price strings. Carousel smoke: delayed-image direct jump still holds the current slide until ready.
