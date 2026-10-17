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
- Copy accuracy correction (16 Oct 2026 review, literal copy only): `owner-haifa-shore` note no longer claims "No numeric prices published" — the public source does publish figures; it now states those figures are not reproduced here and that a current offer must be requested from the operator. Ashdod page: header intro rephrased as published excursion options whose feasibility depends on the ship's port-call hours (dropped the unmeasured "main southern cruise call" and "all reachable in a day"); overview "most passengers choose" replaced with "the published day options spread between"; the "Classical Jerusalem" itinerary card and the one-day FAQ no longer assert "the most popular"/"the most common choice" — Jerusalem is described as a published option and the timing checks are retained; `providerIntro` now states explicitly that Moshe Barak's business advertises Ashdod car-and-driver excursions with itinerary and price agreed by inquiry, and that the combined Jerusalem and Bethlehem day named in the itinerary ideas is a separate product published by Bein Harim, so the listed itineraries are not presented as one provider's. No prices, links, images, routes, layout or publication settings changed.

## Full-width homepage hero (16 Oct 2026, direct code edit)
- Extracted `HomeHero.tsx` from the homepage route and rendered it in the root layout above the shared sidebar/content columns. The panorama now spans the viewport edge to edge, directly below the site header; the desktop sidebar starts at the bottom of the hero and remains sticky while reading the content below.
- Removed the inset rounded frame from the carousel. Text and controls retain a centered 90rem maximum width for readability on large screens. The seven service shortcuts sit in the content column below the hero. The root layout owns the homepage's single main landmark; other routes retain their existing main landmarks and sidebar layout. The hero follows the displayed route matches during navigation.
- Existing six photos, image loading/decoding behavior, autoplay interval, reduced-motion behavior and slideshow controls are preserved. No provider data, booking behavior, dependencies, publication settings or production domain changes.
- Validation: production build and TypeScript check passed; all 15 existing tests passed. Playwright at 1920, 1536, 1280, 1024, 768 and 390px confirmed hero left = 0, hero right = viewport width, no horizontal overflow, one H1 and one main landmark. On desktop the sidebar top equals the hero bottom; it sticks below the header after scrolling. Manual Next, desktop navigation away from and back to the homepage, and mobile drawer navigation to Shore excursions passed with no page errors. External Google Fonts requests were unavailable in the local browser, so visual review used the configured fallback fonts.
- Delivery: direct code changes through GitHub, with write access verified after installing ChatGPT Codex Connector on `Yeruham81` and granting it access to this repository. The earlier attempt returned HTTP 403 before that App installation existed. No Lovable AI turn or production publishing was used. The implementation and earlier downloadable patch are based on `a21fb14db79506a9142f39c7cccd6279fa06ab26`.

## Jerusalem city and neighborhood stay guides (17 Oct 2026, direct code edit)
- Retained the existing city URL, `/travel-blog/where-to-stay-in-jerusalem/`, and the Home → Accommodation → Jerusalem journey. It is now a six-area hub with location photographs, short introductions, nearby sights, real OpenStreetMap embeds, travel-style filters, a comparison table and links to full neighborhood guides.
- Added six complete, internally linked pages:
  - `/jerusalem/downtown-hotels/`
  - `/jerusalem/mamilla-king-david-hotels/`
  - `/jerusalem/old-city-hotels/`
  - `/jerusalem/mahane-yehuda-nachlaot-hotels/`
  - `/jerusalem/east-jerusalem-hotels/`
  - `/jerusalem/german-colony-baka-hotels/`
- Each neighborhood page explains the area, attractions, map, walking and arrival considerations before displaying two accommodation recommendations. The 12-property shortlist covers Herbert Samuel, Arthur, Mamilla, King David, New Imperial, Sephardic House, Bezalel, Market Courtyard, American Colony, Jerusalem Hotel, Orient and Rafael Residence. Breadcrumbs, back-to-city links and links between all six neighborhoods are included.
- Editorial basis: the supplied publisher guide at https://www.israel-taxi.com/travel-blog/where-to-stay-in-jerusalem/ . Hotel identity, general style and location were cross-checked against the hotel's own information; the sources are registered and visible. Recommendations do not claim firsthand stays. Unverified detailed amenities, fixed room rates and availability are not advertised. The German Colony construction note asks visitors to obtain a current update rather than repeating a projected works timetable.
- Booking: reused exactly 19 existing Expedia affiliate URLs from the supplied guide (12 property links, 6 area links, 1 city link). Tracking URLs live only in `affiliateConfig`; typed property records and provider referrals remain separate from editorial area content. Sponsored labels, sponsored/noopener/noreferrer attributes and anonymous outbound-click records apply. All 12 property short links followed via HTTP HEAD to the corresponding Expedia property, returning 200; no date-specific inventory or completed reservation was checked. The ordinary city-level Booking.com link remains an alternative.
- Images: five photographs reused from the supplied publisher guide and optimized as local WebP assets. The original East Jerusalem hillside image depicts a different part of the city, so the northern hotel district uses Damascus Gate instead: https://commons.wikimedia.org/wiki/File:Damaskustor_BW_2.jpg — Berthold Werner, public domain (Commons metadata checked). Source and credit links are visible in the image disclosure. Maps mark area reference points, not hotel pins or official neighborhood boundaries, and provide an external-map fallback; no map API key is required.
- Reuse: `CityStayHub`, `NeighborhoodStayPage` and `AreaMap` use typed editorial records; other cities keep their existing guides until detailed area records are added. The accommodation hub and methodology copy reflect the new Jerusalem shortlist. Global navigation, the full-width homepage hero, staging noindex and publication/domain settings are preserved.
- Validation: production build, TypeScript and all 19 tests pass. New integration checks cover the existing city URL, all six neighborhood URLs, image/map/guide links, filtering and reset, information before hotel cards, breadcrumbs and configured sponsored booking targets. All 19 tracking URLs were also checked for exact equality with links in the supplied source guide. Browser layout and remote map rendering were not visually tested in this environment because its required browser-control skill is unavailable.
- Delivery uses the existing connected GitHub repository and normal Lovable source synchronization. No Lovable AI build turn, API integration or production publication is requested.

## Tel Aviv city and neighborhood stay guides (17 Oct 2026, direct code edit)
- Preserved `/travel-blog/where-to-stay-in-tel-aviv/` and Home → Accommodation → Tel Aviv. The city page now compares all eight areas in the supplied guide, with photographs, short area introductions, nearby highlights, OpenStreetMap embeds, travel-style filters, quick picks and a comparison table.
- Added eight separate, internally linked neighborhood guides:
  - `/tel-aviv/beachfront-hotels/`
  - `/tel-aviv/dizengoff-city-center-hotels/`
  - `/tel-aviv/old-north-port-hotels/`
  - `/tel-aviv/neve-tzedek-hotels/`
  - `/tel-aviv/jaffa-hotels/`
  - `/tel-aviv/florentin-hotels/`
  - `/tel-aviv/kerem-hateimanim-hotels/`
  - `/tel-aviv/rothschild-boulevard-hotels/`
- Each guide explains neighborhood character, three nearby highlights, location, getting around and arrival with luggage before showing two accommodation picks. Hotel cards explain who each property suits and what to confirm before booking. The 16 picks are Carlton, Embassy, Backstage, Cinema, Port Tower, Melody, Elkonin, Ruby, The Jaffa, Market House, Albi Florentin, Florentin House, Poli House, Assemblage, The Norman and 65 Hotel Rothschild.
- Editorial basis: https://www.israel-taxi.com/travel-blog/where-to-stay-in-tel-aviv/ . All eight neighborhood photos were reused from that supplied guide, inspected and optimized as local WebP assets with visible source links. Maps mark area reference points, not hotel positions or formal boundaries. Neighborhood-edge properties are described as such, including stays near Neve Tzedek, the Yemenite Quarter and Rothschild.
- Property identity, location and general style were checked against primary hotel/operator sources, registered with a 17 Oct 2026 review date and linked on each page. The Jaffa uses the current Fattal Limited Edition identity; Poli House uses AFI and Florentin House uses HOMY. Assemblage's operator-stated lack of a lift is called out. No firsthand stays, live room prices, inventory, rankings or guaranteed amenities are claimed.
- Booking: copied exactly 25 existing publisher-owned Expedia links from the supplied guide: 16 property links, eight area links and one city link. All final links followed via HTTP HEAD to the expected Expedia destination and returned 200; property links reached specific property pages. The guide's House of Palm short link instead reached Expedia's generic `/Hotels` page, so House of Palm was replaced by the same guide's Assemblage recommendation and verified property link. No date-specific availability, commission attribution or completed booking was tested. The regular Booking.com city link remains available.
- Shared components now take the city introduction, quick picks, review date, airport guide and source IDs from city records. Recommendations are scoped by area and city. Jerusalem's six guides and 12 hotel picks remain covered by the same integration tests; Tiberias retains its existing simpler guide. Accommodation-hub and methodology copy now cover both detailed cities. The homepage hero, global navigation, publication state, staging noindex and domain settings are unchanged.
- Validation: production build, TypeScript and all 25 tests pass. Integration checks cover both city URLs and all 14 neighborhood URLs, photos, map pins, travel-style filters and reset, information before recommendations, breadcrumbs, city-specific airport/source links, and exact configured sponsored destinations. All 25 new affiliate URLs were checked for exact equality with the source guide. Browser layout and external map rendering were not visually tested because this environment's required browser-control skill is unavailable.
- Delivery: direct changes to the existing GitHub repository with normal Lovable source synchronization. No Lovable AI turn, new API integration or production publication is requested.
