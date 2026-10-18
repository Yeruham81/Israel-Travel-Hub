# SEO landing pages — phase 2: content accuracy, share metadata, query intent

**Completed via GitHub on 18 October 2026.** This pass updates the same ten URLs studied in phase 1. Deferred: launch/indexing/sitemap (#1) and quote-form delivery/conversion measurement (#5). Tours/Destinations hub pages are deliberately untouched.

## Changes and rationale

1. Ten unique concise meta descriptions (129–147 characters) now emphasize the query's question and the actual available content. This is editorial prioritization, not a character-limit ranking claim.
2. Shared `pageMeta` generates an absolute `og:image` and matching `twitter:image` for all ten selected pages using their existing bundled editorial image and the configured canonical origin. Where available, OG alt text comes from the existing image alt. Article, WebPage, Service and BreadcrumbList schema remain accurate and unchanged. Live share-preview and image HTTP checks must be done at publication, not inferred from metadata.
3. Four private airport guides remove user-visible references to the "original guide". Driving times remain estimates **after pickup**, not guarantees or live traffic results. A concise comparison panel differentiates private pre-arranged transfers from the official metered airport taxi queue, with a neutral internal taxi-guide link and official IAA guidance.
4. Hotel landing page body text now addresses distinct search tasks: Jerusalem first-time/no-car and Old City luggage access; Tel Aviv first-time beachfront or Dizengoff versus Jaffa; Dead Sea family/all-inclusive versus spa admission and age-policy checks. Exact facilities and prices still need confirmation for each booking.
5. Existing email-draft-only forms, quote prices and price basis, author card, photo credits, link disclosures, URLs and staging noindex were not altered.

## Ten query clusters (editorial hypotheses, no volume or ranking claims)

| URL suffix | Main intent | Related search questions answered or signposted |
|---|---|---|
| `ben-gurion-airport-to-jerusalem/` | Arrange private pickup to Jerusalem | Old City hotel drop-off, drive time, taxi vs private transfer, luggage, weekend |
| `ben-gurion-airport-to-tel-aviv/` | Arrange private pickup to Tel Aviv/Jaffa | Beach hotel entrance, Jaffa, group luggage, taxi vs advance booking |
| `ben-gurion-airport-to-haifa/` | Arrange private pickup to Haifa | Mount Carmel, coastal hotel, cruise terminal, travel time |
| `ben-gurion-airport-to-ein-bokek/` | Arrange private pickup to Dead Sea hotels | Exact Ein Bokek hotel, return trip, alternate Dead Sea areas |
| `from-ben-gurion-airport-on-shabbat/` | Arrange transport during Shabbat | Limited weekend 711 at T1, taxi, private transfer, first returning train |
| `getting-around-israel/` | Plan transport without a car | Train/bus/light rail, city vs rural stops, payment and weekend exceptions |
| `taxis-in-israel/` | Understand and book taxis | Meter vs private quote, Gett pickup, card or cash, receipts |
| `where-to-stay-in-jerusalem/` | Pick a hotel neighborhood | Downtown vs Mamilla vs Old City, car-free stay, Shabbat arrivals |
| `where-to-stay-in-tel-aviv/` | Pick a hotel neighborhood | Beachfront vs Dizengoff vs Jaffa, first visit, walking/noise |
| `best-dead-sea-hotels/` | Compare Dead Sea hotel types | Ein Bokek vs Neve Zohar/Ein Gedi, family and spa suitability, inclusions |

## Current authoritative checks
- [Israel Airports Authority — Ben Gurion directions](https://www.iaa.gov.il/en/airports/ben-gurion/directions/directions-list/?categoryId=10450): authorized, metered taxis use a designated pickup area; distinct from private advance booking.
- [Gett airport instructions](https://www.gett.com/il/airport-en/): official on-demand taxi ride-code/queue and separate scheduled taxi pickup.
- [Tel Aviv municipality weekend network](https://www.tel-aviv.gov.il/Residents/Transportation/Pages/naimbesofash.aspx): limited Line 711 stops at Terminal 1; does not imply flight-connected Terminal 3 frequency.
- [Israel Railways](https://www.rail.co.il/): check dated operating schedules and changing Saturday-evening service.
- Changing hotel access, guest-age restrictions, spa inclusions and prices **were not independently reverified for each individual property**; wording advises booking-date checks rather than claiming current inventory.

## Quality gates & unfinished research
- New assertions added to existing ten-page test: exactly one OG and one Twitter image per page; absolute URL and consistency; concise descriptions; no original-guide phrasing in route journey copy. Retain phase 1 H1, robots, canonical, schema, SSR and internal-link tests.
- GitHub Actions full validation must pass on this commit (TypeScript, tests, build).
- This SERP- and source-informed intent mapping is **qualitative**; no access to actual query volumes, historical Search Console data or real CTR. Once the production domain is approved, validate OG image HTTP response and social previews, schema, crawlability and Web Vitals, and prioritize further edits using GSC data rather than guessing demand.
