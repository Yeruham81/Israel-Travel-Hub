# Transportation cluster: SEO, content and internal-link audit

Reviewed: 22 October 2026 · Branch: `main` · Project: Israel Travel Hub

## Scope and search-intent map — 16 URLs

This cluster contains **12 informational guides** (eight general/taxi guides and four all-mode airport-to-destination comparisons) and **four commercial private-transfer landings**. Keep distinct self-canonicals and existing URLs; do not redirect an informational journey page to its commercial counterpart.

| URL path | Primary search intent / page responsibility | Intent boundary |
| --- | --- | --- |
| `/travel-blog/taxis-in-israel/` | Understand licensed taxis, booking, passenger checks, payment and practical use | Do not reproduce detailed fare schedules or airport kiosk instructions |
| `/travel-blog/taxi-fares-in-israel/` | Regulated meter, A/B/C tariffs, additions, worked fare examples and reference date | Do not represent private quotes as meter prices |
| `/travel-blog/ben-gurion-airport-taxis/` | Official TLV taxi ordering, ride codes, exits, meter and pickup process | Link to fare guide rather than restating rate tables |
| `/travel-blog/uber-in-israel/` | Whether Uber works; Gett/Yango availability and how to choose apps | Defer general taxi regulations to the taxi hub |
| `/travel-blog/sherut-in-israel/` | Explain the term sherut and the discontinued Nesher/Amal airport services | Do not present defunct airport shared rides as bookable |
| `/travel-blog/from-ben-gurion-airport-on-shabbat/` | What changes for an airport arrival during Shabbat/holidays | Preserve the distinction between limited Terminal 1 line 711 and other modes |
| `/travel-blog/getting-around-israel/` | National multi-mode transportation overview, tickets and journey planning | Link to local/tariff/airport specialist pages for detail |
| `/travel-blog/getting-around-tel-aviv/` | City walking, buses, Red Line, mainline rail, local weekend network | Do not compete with dedicated airport-to-Tel Aviv route comparison |
| `/travel-blog/how-to-get-from-ben-gurion-airport-to-jerusalem/` | Compare all airport-to-Jerusalem modes and the final hotel leg | Not a booking landing |
| `/travel-blog/how-to-get-from-ben-gurion-airport-to-tel-aviv/` | Compare all airport-to-Tel Aviv/Jaffa modes and the final hotel leg | Not a booking landing |
| `/travel-blog/how-to-get-from-ben-gurion-airport-to-haifa/` | Compare all airport-to-Haifa modes, stations and cruise/hill connections | Not a booking landing |
| `/travel-blog/how-to-get-from-ben-gurion-airport-to-ein-bokek/` | Compare TLV-to-Dead-Sea modes; emphasize Jerusalem rail+bus and hotel stop | Not a booking landing; limited 421 via Tel Aviv is only a short note |
| `/travel-blog/ben-gurion-airport-to-jerusalem/` | Request a private vehicle, meet-and-greet logistics, price basis and Old City drop-off | Do not reproduce broad rail/bus comparisons |
| `/travel-blog/ben-gurion-airport-to-tel-aviv/` | Private vehicle to a specific Tel Aviv/Jaffa address | Do not reproduce broad rail/bus comparisons |
| `/travel-blog/ben-gurion-airport-to-haifa/` | Private vehicle to Haifa hotel/cruise destination | Do not reproduce broad rail/bus comparisons |
| `/travel-blog/ben-gurion-airport-to-ein-bokek/` | Private vehicle to specified resort; vehicle price and itinerary caveats | Do not reproduce broad rail/bus comparisons |

## Completed corrections

1. **Ein Bokek all-mode guide:** revised descriptive title/meta, answer-first comparison and precise hotel-stop advice; no unverified current public-transport/long-metered-ride price ranges. Explains train via Jerusalem–Yitzhak Navon and buses 486/444 with dated schedule, possible reservation and personal rail-voucher checks. The limited 421 via Tel Aviv appears briefly, rather than as a standalone competing route. Shabbat, delayed-arrival, road/access and hotel distinction advice updated; 10 FAQs, six primarily official sources, two supporting photos and in-paragraph links. Rendered related-guide layout is consistent with the other three all-mode guides.
2. **Four private landings:** the shared `AirportRoutePage` links contextually to the matching all-mode guide while keeping its own private-vehicle H1, quote form, written-confirmation message and narrow search intent. A related-guide link reinforces the reciprocal path. Added direct specialist links to the official airport-taxi pickup and taxi-meter pages.
3. **Three taxi guides:** five stale links to the legacy `/transfers/ben-gurion-airport/` redirect were replaced with direct links to the canonical `/transfers/` hub. The deliberate permanent redirect route itself remains intact for legacy traffic.
4. **Getting Around Tel Aviv:** improved 2026 title/description; inserted contextual paragraph links in all four sections (city accommodation, national ticketing, airport journey guide, taxi and airport weekend specialist pages), added focused next steps and expanded FAQ from 3 to 7. The city-level intent remains distinct from the airport-route guide.
5. **Regression coverage:** added `src/test/transport-cluster-seo.test.tsx` to check all 16 self-canonical URLs, titles, descriptions, role-specific schema and editorial link phrases. Extended `src/test/airport-journeys.test.tsx` to render the Ein Bokek article, verify its paragraphs' actual clickable links, photos, two related-guide sections, separate booking CTA and source disclosure.

## Internal-link topology

- **General hubs → specialist pages:** national travel → public-transport/payment, taxis/fares, apps, Shabbat and local pages; Tel Aviv city page → its airport route; taxi hub → fare and airport taxi guides.
- **Four airport journey comparisons → relevant specialists:** in-paragraph taxi/regulated-fare/private-transfer links; arrival and Shabbat guidance in context; destination-specific accommodation or attraction guide; comparisons for the other airport destinations.
- **Four private transfer pages → four airport journey comparisons:** one direct in-paragraph link and one related-guide link, with separate commercial conversion paths retained.
- **All-mode guide → private-transfer form:** `privatePath` plus `#request-quote`; published starting amount comes from the shared transfer registry instead of a hand-copied figure.
- **Link integrity:** source review of the transport content files, related shared components, navigation, generated route tree and sitemap found no unexplained static internal-path omissions. The API endpoints are intentionally not in the sitemap; the legacy `/transfers/ben-gurion-airport/` route is a deliberate redirect, not an editorial link target.
- **Sitemap:** all eight airport destination paths (four comparison and four private pages) appear with their current slugs. Trailing slash policy is preserved.

## Technical SEO and content safeguards

- All 16 pages use distinct canonical paths. The informational pages use `Article` structured data; the private airport landings use `WebPage` with a `Service` main entity, not a live-price Offer promise.
- Existing `noindex,nofollow` is **intentional for staging**, not an issue to "fix" during this task. Indexability and production canonical origin must be configured only at launch, under a separate explicit decision; no production/indexing settings were changed here.
- General pages and destination comparisons avoid implying a booking has been made or that an old bus timetable or fare is a real-time quotation. The private landings distinguish weekday per-vehicle published starting rates from the final written quote, optional supplements and confirmed availability.
- No changes to the quote-delivery service, affiliate URLs, domain, publication configuration, redirect rules, or routing structure.

## Remaining release checks and limits

- **Staging browser QA** (desktop/mobile screenshots, layout, tap targets, images, structured-data inspection after SSR) still requires a live build preview. Source/component parity and automated tests are not a substitute for a visual pass.
- **Current-service verification:** bus, rail, road/access, fares and specific stop times can change after 22 October 2026. The guide links to operator/authority planners rather than claiming real-time schedules; recheck before public release. A complete external-link HTTP status audit and a live crawl of the deployed site were not performed.
- **Indexing measurement:** after launch, inspect canonical and indexing in Search Console, actual sitemap fetch, link discovery, 301 chains and page-query distribution. Staging `noindex` means current search visibility is not a suitable indicator of content quality.
- **Potential future enrichment:** the Tel Aviv local guide remains intentionally shorter and uses fewer section photos than the long-form taxi guides. Add original/use-licensed illustrative imagery only if a visual review shows a real need; do not pad the article just to match length.

## Validation

GitHub Actions workflow `Full Project Validation` on `main` runs frozen dependencies, `npx tsc --noEmit`, `bun run test` and `bun run build`. The post-link-fix commit `1c4e36bc9b01462b89b14b17f7961d909915fa8a` passed the full workflow. Run the final workflow again after subsequent documentation/test commits before reporting final completion.
