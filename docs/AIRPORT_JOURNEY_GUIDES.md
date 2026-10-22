# Four all-mode airport journey guides — independent of private-transfer landings

Initial implementation: 18 October 2026; editorial/SEO and link review: **22 October 2026**. Scope: four informational routes with shared rendering, separate from the existing private airport transfer landings. On 22 October, `AirportRoutePage.tsx` was updated to link back to each informational comparison without changing private offer data, quote forms or page slugs.

## Canonical / intent split
| Informational journey comparison (new, broad query) | Private-transfer landing (unchanged, commercial query) |
|---|---|
| /travel-blog/how-to-get-from-ben-gurion-airport-to-jerusalem/ | /travel-blog/ben-gurion-airport-to-jerusalem/ |
| /travel-blog/how-to-get-from-ben-gurion-airport-to-tel-aviv/ | /travel-blog/ben-gurion-airport-to-tel-aviv/ |
| /travel-blog/how-to-get-from-ben-gurion-airport-to-haifa/ | /travel-blog/ben-gurion-airport-to-haifa/ |
| /travel-blog/how-to-get-from-ben-gurion-airport-to-ein-bokek/ | /travel-blog/ben-gurion-airport-to-ein-bokek/ |

New H1/title: **How to get from...** with train/bus/taxi alternatives. Old H1/title: **Private transfer...** with personal quote. Each has its own self-canonical through `pageMeta()`. Neither type is canonicalized to the other. Broad guides link to the appropriate private landing at #request-quote in two differentiated CTA boxes and the private option section, while honestly describing price basis and unsent draft. Nav and guide directory feature the new routes, without rewriting the private-landing copy.

## Editorial coverage added
- Four transport comparison tables (time, current fare-check instructions or current private starting rate, target traveler, door-to-door and operating caveats).
- Jerusalem: 26–30-minute railway to deep Yitzhak Navon station, final light rail/taxi leg; restricted 485 bus, former Nesher closure, Old City vehicle access.
- Tel Aviv: four rail stations; line 445 from Terminal 3 Level 2 Exit 21; separate Terminal 1 limited weekend line 711; Jaffa and seafront onward connections.
- Haifa: Hof HaCarmel, Bat Galim, Center HaShmona, HaMifrats; limited 905; Carmel hills, port timing, former Amal closure.
- Ein Bokek: train to Jerusalem–Yitzhak Navon, then possible 486/444 intercity bus to the exact Ein Bokek hotel stop; no direct railway or regular direct airport bus. Limited 421 via Tel Aviv appears only as a brief note, not a competing stand-alone itinerary.
- Each page: route-appropriate options (four principal modes for Ein Bokek), travel tips, Shabbat, terminal transfer notes, contextual FAQs, author identity/Tripadvisor, in-paragraph links to specialist guides, additional photos, links to accommodation and other guides, informational Article JSON-LD and citations.

## Price/schedule guardrails
The four upgraded airport journey guides do **not** reproduce old bus/rail or long-metered-taxi price ranges as if they were current. The reader must use the operator's current fare/timetable planner for their own date. Illustrative journey times are planning estimates, not live traffic or guaranteed connections. Do not treat published bus numbers as guaranteed departures. Link to official [Israel Railways](https://www.rail.co.il/), [Israel Airports Authority](https://www.iaa.gov.il/en/airports/ben-gurion/directions/directions-list/?categoryId=10038), [Gett's official airport instructions](https://www.gett.com/il/airport-en/), [Egged](https://www.egged.co.il/), [National Journey Planner](https://bus.gov.il/) and [Tel Aviv's weekend bus programme](https://www.tel-aviv.gov.il/Residents/Transportation/Pages/naimbesofash.aspx). Users must verify current stop, timetable, fares, reservation and accessibility information with the provider.

The displayed Moshe starting rate comes from the same current registry as the private landing, not a retyped promise. Quotes are per vehicle / weekday / up to four passengers with extras potentially applicable; they require written confirmation. These guides do not collect booking requests or promise live prices.

## Quality assurance
- Four explicit file routes remain in the generated TanStack route tree, with dedicated guide directory and route checks. Further regression coverage checks all 12 transport information guides, four private transfer landings and rendered Ein Bokek content.
- Maintained staging `noindex`, canonical origin config, existing private routes and no deployment-setting changes.
- GitHub Actions TypeScript, Vitest and production build passed after the Ein Bokek content and test updates on 22 October 2026. Production search visibility cannot be inferred from staging `noindex`.
- Full 16-page audit, URL/intent matrix, implemented corrections and remaining deployment checks: [`TRANSPORT_CLUSTER_SEO_AUDIT_2026_10_22.md`](./TRANSPORT_CLUSTER_SEO_AUDIT_2026_10_22.md).
