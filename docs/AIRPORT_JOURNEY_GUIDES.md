# Four all-mode airport journey guides — independent of private-transfer landings

Date: 18 October 2026. Scope: **four new informational routes**, shared content and rendering; existing private route pages in `src/data/airportRoutes.ts` and `src/components/AirportRoutePage.tsx` untouched.

## Canonical / intent split
| Informational journey comparison (new, broad query) | Private-transfer landing (unchanged, commercial query) |
|---|---|
| /travel-blog/how-to-get-from-ben-gurion-airport-to-jerusalem/ | /travel-blog/ben-gurion-airport-to-jerusalem/ |
| /travel-blog/how-to-get-from-ben-gurion-airport-to-tel-aviv/ | /travel-blog/ben-gurion-airport-to-tel-aviv/ |
| /travel-blog/how-to-get-from-ben-gurion-airport-to-haifa/ | /travel-blog/ben-gurion-airport-to-haifa/ |
| /travel-blog/how-to-get-from-ben-gurion-airport-to-ein-bokek/ | /travel-blog/ben-gurion-airport-to-ein-bokek/ |

New H1/title: **How to get from...** with train/bus/taxi alternatives. Old H1/title: **Private transfer...** with personal quote. Each has its own self-canonical through `pageMeta()`. Neither type is canonicalized to the other. Broad guides link to the appropriate private landing at #request-quote in two differentiated CTA boxes and the private option section, while honestly describing price basis and unsent draft. Nav and guide directory feature the new routes, without rewriting the private-landing copy.

## Editorial coverage added
- Four detailed transport comparison tables (time, historical fare or current private starting rate, target traveler, door-to-door and operating caveats).
- Jerusalem: 26–30-minute railway to deep Yitzhak Navon station, final light rail/taxi leg; restricted 485 bus, former Nesher closure, Old City vehicle access.
- Tel Aviv: four rail stations; line 445 from Terminal 3 Level 2 Exit 21; separate Terminal 1 limited weekend line 711; Jaffa and seafront onward connections.
- Haifa: Hof HaCarmel, Bat Galim, Center HaShmona, HaMifrats; limited 905; Carmel hills, port timing, former Amal closure.
- Ein Bokek: railway only as far as Jerusalem, then possible 486/444 bus connections and limited 421 via Tel Aviv; no direct railway; exact resort stop and last bus critical.
- Each page: independent 5–6 service descriptions, travel tips, Shabbat, terminal transfer notes, contextual FAQs, author identity/Tripadvisor, links to accommodation and other guides, informational Article JSON-LD and citations.

## Price/schedule guardrails
Cost ranges and the illustrative journey times are **historical estimates from the publisher's August 2026 material, not live fares or verified travel-date timetables**. Avoid treating bus numbers as services guaranteed to operate. Link to official [Israel Railways](https://www.rail.co.il/), [Israel Airports Authority](https://www.iaa.gov.il/en/airports/ben-gurion/directions/directions-list/?categoryId=10038), [Gett's official airport instructions](https://www.gett.com/il/airport-en/), [Egged](https://www.egged.co.il/), [National Journey Planner](https://bus.gov.il/) and [Tel Aviv's weekend bus programme](https://www.tel-aviv.gov.il/Residents/Transportation/Pages/naimbesofash.aspx). Users must verify current stop, timetable, fares, reservation and accessibility information with the provider.

The displayed Moshe starting rate comes from the same current registry as the private landing, not a retyped promise. Quotes are per vehicle / weekday / up to four passengers with extras potentially applicable; they require written confirmation. These guides do not collect booking requests or promise live prices.

## Quality assurance
- Added four explicit file routes to the generated TanStack route tree for immediately valid typed navigation, with 30-entry guide directory tests.
- Maintained staging `noindex`, canonical origin config, existing private routes and no deployment-setting changes.
- Final confirmation requires GitHub Actions TypeScript, Vitest and build success; published SEO performance/Google results cannot be inferred before indexing.
