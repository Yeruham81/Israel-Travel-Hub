# Jerusalem content cluster redesign — 24 October 2026

## Review and decisions
Existing WordPress originals were compared with the new React guide pages:
- /travel-blog/jerusalem-travel-guide/
- /travel-blog/old-city-jerusalem/
- /travel-blog/mount-of-olives/
- /travel-blog/mount-zion/
- /travel-blog/museums-in-jerusalem/
- /travel-blog/churches-in-jerusalem/
- /travel-blog/shopping-in-jerusalem/
- /travel-blog/day-trips-from-jerusalem/
- /travel-blog/jerusalem-to-bethlehem/
- /travel-blog/jerusalem-to-the-dead-sea/

Do not merge any of these: their search intents are distinct. The city guide is the planning hub, the four standalone attraction guides cover individual places, churches is a theme/pilgrimage guide, museums is a comparison guide, shopping answers shopping search intent, day trips compares departures, and the Bethlehem and Dead Sea routes are transport-decision guides. The Jerusalem tours, airport transfer, cruise and accommodation pages retain conversion-oriented or logistical intent and must not duplicate the informational guides.

## Information recovered from WordPress originals
- Museums: original covered roughly 12 museums/experiences, whereas the shortened new index had grouped several under generic "specialist museums". Restore named coverage without unverified review ratings, 2026 prices or opening hours.
- Churches: original has Old City, Mount of Olives, Mount Zion and Ein Karem subsections. Retain churches not previously named but avoid reprinting each place guide verbatim.
- Shopping: old top-ten list included Old City souks, Mahane Yehuda, Mamilla, Malha, Ben Yehuda, Cardo, Emek Refaim, First Station, Hutzot Hayotzer and the Bezalel fair. Restore coverage, but a recurring fair's location/dates cannot be assumed from an old article.
- Mount Zion and Mount of Olives: clearer religious-tradition language, visitor access limitations and coherent pedestrian route planning.
- Avoid copywriting cliches, generic repeated calls to action, unverifiable superlatives, exact tariff claims based on old web pages, and old promises of public transport/tour availability.
- Existing old article /travel-blog/jerusalem-day-trip-from-tel-aviv/ also merits separate URL-retention/redirect review in the Tel Aviv departure cluster; do not silently redirect it to a generic Jerusalem tour.

## Changes
- src/data/jerusalemClusterEditorial.ts provides in-place editorial upgrades to 6 practical TravelGuide pages and substantial updates to four individual Attraction guides. Existing high-value sections remain; new sections fill identified topical gaps and use inlineLinks inside paragraphs.
- src/components/JerusalemClusterLinks.tsx renders direct, topic-sensitive link cards without reused images; maps reciprocal links from Jerusalem places to tours and transport, including Jerusalem tours, Bethlehem and Dead Sea tours, Ashdod cruise excursions, airport guide and city accommodation.
- src/components/JerusalemPartnerOffers.tsx reserves independently configurable ProviderLink page IDs for later verified Viator/GetYourGuide/Tiqets/etc. integrations; no offers, prices or affiliate claims are rendered unless actually configured in the existing provider registry.
- Correct canonical routes retained. No Lovable agent, no change to customer-request forms.
- All editorial additions have update date 2026-10-24. This records an editorial update, not a guarantee that every site's opening status has been independently reconfirmed.

## Affiliate plan (not published until approved)
- Jerusalem city and churches: optional approved guided walks / site-specific tours.
- Museums: official tickets or approved reseller products only if inventory and booking links are confirmed; never invent museum price.
- Shopping: approved food-tasting tours and genuine market experiences, not generic retail redirect links.
- Day trips: guide departure city and operator/product, compare current inclusions, group size and cancellation.
- Bethlehem: provider must document crossing arrangements and actual pickup.
- Dead Sea: verify beach identity, park admissions, itinerary and return city.
- Existing ProviderCard provides affiliate disclosure, external-click tracking and operator terms once registry entries are reviewed and added.

## Follow-up QA
- Confirm source claims with park/municipal/attraction official pages before listing schedules, prices or access availability. Current public pages checked include Tower of David, Jerusalem tourism, Yad Vashem, Israel Museum and Israel Parks Authority as pointers to official sites.
- Run production build, TypeScript and full tests; inspect desktop/mobile layout and test links. Additional editorial audits for 2027 changes should be scheduled before the season.
- Verify the entire visual page for duplicates and third-party image rights (filename-based checks cannot detect re-encoded copies).
