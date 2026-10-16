# Israel Travel Hub

Create a NEW project named "Israel Taxi & Travel" in the selected workspace.

The owner is evolving www.israel-taxi.com into an English-language travel information, comparison and affiliate directory for international visitors to Israel. They want focused editorial landing pages where a specific search leads to useful advice, selection and relevant booking links.

READ THE LONG-TERM BRIEF BELOW AS PRODUCT CONTEXT. FOR THIS FIRST BUILD IMPLEMENT ONLY THE FOCUSED SCOPE IN THIS MESSAGE. This scoped iteration takes priority over the larger brief. Deliver working code and a preview, not a plan.

FIRST BUILD SCOPE
- A polished, responsive homepage.
- One complete, substantial route landing page at EXACTLY /travel-blog/ben-gurion-airport-to-jerusalem/.
- A small real About / comparison-methodology page explaining how options are selected and the publisher's relationship with Moshe Barak.
- A typed data model / source registry / provider adapter interface that can later be backed by a database.
- Working filtering, jump links, validation, comparison controls and actual source/provider outbound links.
- Do not provision paid services, connect a production domain, publish to production, add checkout, make reservations, or modify any other project. This is an unpublished noindex working preview.
- Database/CMS and live-price integrations come in the next build. Do not create a fake admin login or fake backend in this iteration.

DESIGN
Use an editorial travel design, generous readable typography and strong information hierarchy: warm ivory background, deep navy text, restrained Mediterranean blue actions, tasteful destination photography, a small working brand wordmark. Aim for a premium useful travel guide with booking selection. Avoid oversized generic dashboard chrome, a giant blank search form or a wall of identical cards. Desktop route page should have a sticky contents/planning rail; mobile should have clear section navigation, stacked cards and a compact sticky Compare options action that doesn't cover content. Use accessible contrast, labels, keyboard focus and restrained motion. The traveler sees travel information and useful choices, not implementation details or notices about APIs.

HOMEPAGE
Hero introduces finding reliable travel information and booking options across Israel. Lead action opens the Jerusalem airport route. Display 4 intent cards:
1 Airport taxi to Jerusalem -> internal complete route above
2 Hotels in Tiberias -> the owner's existing https://www.israel-taxi.com/travel-blog/best-hotels-in-tiberias/ as "Read hotel guide"
3 Bethlehem day trips -> https://www.israel-taxi.com/travel-blog/jerusalem-to-bethlehem/ as "Read planning guide" (this is a transport/planning guide, not an existing tour marketplace)
4 Masada tickets and visiting -> https://www.israel-taxi.com/travel-blog/masada/ as "Read visiting guide"
Use a clear existing-guide indication for these external links. Main navigation Transfers, Tours, Hotels, Car Rental, Destinations must lead to meaningful on-page content or the exact existing guide URLs, not broken or empty routes. Existing useful guide URLs: /airport-transfers/, /private-day-trips/, /travel-blog/where-to-stay-in-jerusalem/, /travel-blog/where-to-stay-in-tel-aviv/, /travel-blog/getting-around-israel/, /travel-blog/jerusalem-travel-guide/ on https://www.israel-taxi.com.

ROUTE PAGE
H1: "Ben Gurion Airport to Jerusalem: taxis & private transfers".
Make this a genuinely useful route-specific editorial landing page, with booking choices available near the beginning, alongside the comparisons and again at the end. Sections:
- Clear quick answer, who prebooking suits, and how to use the comparison.
- Compact journey planning inputs: fixed origin TLV, fixed destination Jerusalem, optional arrival date/time, passengers 1-16 and luggage count. Validate past dates and valid counts. Keep the choices in local page state and show a truthful journey summary. A button "Compare booking options" scrolls to the options and applies relevant filters. Because no live API/deep-link parameter schema is configured, do not imply these inputs fetched live offers, reserved a car, or were automatically transferred to a provider. Briefly tell travelers to reconfirm these details on the provider's site.
- Booking-options comparison with a working toggle for pre-booked options / on-arrival taxi, and a clear Reset. Treat unknown vehicle capacity as "Confirm with provider", not guaranteed suitability.
- Pricing and what's included: distinguish an operator's published indicative starting rate from live quotes; explain final total, group/luggage needs, waiting, meeting point, child seats, cancellation and flight changes must be confirmed on the chosen offer.
- Arrival and pickup guide, practical checklists, how to compare like-for-like, travel to a precise Jerusalem address.
- Short train/other transport alternative with official-source links, without invented schedules or live fares.
- 5-7 genuinely useful FAQs.
- Sources and the specific information-check date 16 October 2026. This date refers only to the source facts actually supplied below. Do not imply every provider's current availability/vehicle details were verified.
- Related destination/hotel/day-trip links and a final booking choice.

VERIFIED SOURCE FACTS AVAILABLE FOR THIS BUILD
A. Israel Airports Authority official directions:
https://www.iaa.gov.il/en/airports/ben-gurion/directions/directions-list/
Checked 16 Oct 2026. The IAA lists licensed taxis at Terminal 3, ground floor, Exit/Gate 03; Terminal 1 at the exit of the domestic arrivals welcome hall. The listed on-arrival taxi service operates around the clock and fares are metered. The IAA links to https://www.rail.co.il/ for current train information and lists a free internal terminal shuttle. Only paraphrase relevant facts; do not reproduce its text. A pre-booked provider's meeting point can differ: travelers follow their own confirmation.
B. Gett's official airport page:
https://www.gett.com/il/airport-en/
Gett describes its role in the authorized airport taxi system. Link for current on-arrival ordering instructions. Do not fabricate an affiliate relationship, customer rating, specific fare or a specific number of available cars.
C. The owner's current operator page:
https://www.israel-taxi.com/airport-transfers/
Checked 16 Oct 2026. It publishes a Ben Gurion -> Jerusalem starting fare of ILS 550 for up to four passengers. It says weekday rates apply and nighttime/weekend/holiday surcharges may apply. A minimum of 24 hours' notice is stated; details require a quote. This is an INDICATIVE published operator starting fare, NOT a live quote or guaranteed amount. Show a source link and this limitation next to any displayed 550. For a party over 4, replace the numeric starting fare with "Request group quote", not 550. Do not convert it to USD/EUR without real exchange data.
D. https://en.intui.travel/tel-aviv-ben-gurion-international-airport-transfer/ is Intui's airport transfer information/search page and lists Jerusalem as a direction. There is no checked date-specific price, vehicle inventory or current booking guarantee.
E. https://gettransfer.com/sr/directions/israel/jerusalem is a retrievable GetTransfer Jerusalem page, but it is Serbian. Use GetTransfer's main English site https://gettransfer.com/en for the outbound provider entry, clearly ask travelers to enter their route and check availability. Do not invent a route-specific deep link, a quote or proof of current service.
F. Owner's broader existing route guide:
https://www.israel-taxi.com/travel-blog/ben-gurion-airport-to-jerusalem/
Treat as local editorial context, not a primary source for regulated fares or current availability. Avoid importing its unsourced numeric taxi estimates or claims of guaranteed pickup for all providers.

PROVIDERS TO DISPLAY TRUTHFULLY
- Moshe Barak, local operator, published indicative "from ILS 550" only within the qualification above, CTA "Request a quote" to https://www.israel-taxi.com/airport-transfers/#request-your-quote (use the page URL without fragment if that anchor isn't actually present). Disclose relationship: operated by the publisher's local transport business. Do not use his reviews to rate the directory or others.
- Intui.travel, transfer booking platform, "Check current price", CTA to the verified airport page D. Capacity, cancellation, payment and availability to be confirmed on selected offer.
- GetTransfer.com, transfer booking platform, "Check availability", CTA to main English site E. No invented price or data.
- Gett authorized airport taxi information, on-arrival category, "Metered fare", CTA "View official taxi instructions" to B. This is an informational alternative, not a partner offer.

Keep operator and booking platform concepts distinct in the model. Affiliate tracking URLs have not been provided for these transfer providers: use the actual official URLs as regular non-affiliate outbound links for this iteration. DO NOT invent affiliate IDs. Add a clear global disclosure that some site links may earn a commission, while only actual configured affiliate links receive sponsored labeling. No statement that these particular non-affiliate links already earn commission. Configure rel noopener noreferrer on external new-tab links; rel sponsored applies when isAffiliate really is true. Keep affiliate URL configuration separate for the next integration.

TECHNICAL / QA
Use the default supported Lovable stack with crawlable HTML and route metadata. Add noindex/nofollow staging metadata, while permitting bots to see the noindex directive. Canonical should use the staging origin for now; production canonical must be configurable at launch. Use schema only for real visible editorial content/breadcrumbs, not invented aggregate reviews, provider offers or a publisher LocalBusiness for all suppliers.
Keep all provider/source/travel records in a typed data registry that can be replaced with database records later. Record fact sources and checkedAt. Persist only anonymous outbound click events locally as a preview demonstration, distinguish them from bookings; no contact details or private flight data.
Do not write backend success claims. Build the complete route and homepage first. Run build/type checks and test navigation, mobile layout, filters, past-date validation, >4-passenger price handling, FAQs, source links and outbound URLs. Put real capabilities and remaining account/API/affiliate requirements in docs/BUILD_STATUS.md. Return the relevant source files and test outcomes in your handoff.

LONG-TERM PRODUCT CONTEXT:
Build the first iteration of an English-language Israel travel comparison and affiliate directory for the future evolution of www.israel-taxi.com.

Working display name: Israel Taxi & Travel. Audience: independent international travelers planning a trip to Israel.

Business model: users read original local guidance, compare products and booking partners, and complete purchases on the partner's website. This iteration needs affiliate outbound links, not our own checkout or driver dispatch.

Create a separate staging project. Do not change the production domain or delete existing content. Keep staging pages noindex until launch is explicitly requested. Preserve existing URL paths supplied in the accompanying page map.

Design a clear, polished, mobile-first travel interface. Use navy, warm ivory and restrained Mediterranean blue. Prioritize readable comparison tables, clear filters and honest prices. Use the working brand instead of making the whole platform a personal taxi-service page.

Main navigation: Transfers, Tours, Hotels, Car Rental, Destinations. Add an About and comparison-methodology area explaining the publisher and affiliate model.

Build:
1. Homepage with destination and service navigation, curated entry points and four featured comparison pages.
2. Route-comparison template with transport alternatives, origin/destination, passenger and luggage filters when supported by data, price basis, pickup details, inclusions and partner outbound links.
3. Tour-collection template with origin, destination, duration, private/shared, guide, hotel pickup, admissions and cancellation fields.
4. Hotel-collection template with map-ready location data, editorial category criteria, hotel facts separated from room-type facts, and links to check prices with configured partners.
5. Attraction-ticket guide template with admission options, inclusions, official information, visit planning and configured booking links. Keep entry tickets separate from tours that include a visit.
6. Protected admin interface for destinations, operators, booking partners, products, offers, source references and landing-page editorial content. Use draft, review and published states. Public users can only read published content.

Use a database-driven architecture. Separate the actual operator from the booking platform. Products can have multiple partner offers. Keep different products separate even when their titles sound similar. Store the source URL and last-checked date for important facts. Store API credentials only on the server.

Start with these four page intents:
- Prebook a taxi from Ben Gurion Airport to Jerusalem, using /travel-blog/ben-gurion-airport-to-jerusalem/.
- Find and book a hotel in Tiberias, using /travel-blog/best-hotels-in-tiberias/.
- Compare and book a Bethlehem day tour from Jerusalem, using proposed /tours/bethlehem-from-jerusalem/, supported by the existing /travel-blog/jerusalem-to-bethlehem/ guide.
- Plan a Masada visit and find the appropriate tickets, using /travel-blog/masada/. This page requires ticket-inventory validation before affiliate booking buttons are enabled. Show the official booking source when no authorized affiliate ticket exists.

Each page must support the journey from a specific search intent through reliable local information and practical selection to a relevant booking option. Make booking access available to ready-to-book users near the top, alongside relevant comparisons, and at the end. Avoid replacing these pages with a generic search-results interface.

Create the templates and administrative records with minimal seed content from the supplied map. Product facts require source-backed records. Do not invent hotel amenities, operator reviews, ratings, availability, discounts, live prices or affiliate IDs. Use “Check prices with [partner]” when a valid price quote is unavailable. Hide price comparison claims until real comparable quotes are configured.

For each partner, declare the actual supported capability: editorial_only, affiliate_link, widget, content_api, or live_quote_api. Use an adapter per partner. Only pass search parameters supported by the partner's documented and authorized deep-link format. Keep unconfigured affiliate offers out of public booking results. A regular official information link can remain clearly labeled as information.

For prices, support currency, per-person/per-vehicle/per-room basis, party size, dates, inclusions, quote timestamp and expiry. Do not sort unlike price bases as if they were equivalent. Do not call a price “total” when mandatory charges are unknown. Expiry rules must follow the partner agreement.

Use a distinct outbound event for page ID, product ID and offer ID. Report clicks as clicks. Completed bookings and commissions may be added later from authorized partner reporting. Mark affiliate links rel="sponsored" and display a clear disclosure. Do not attach personal contact details to affiliate links.

Provide SSR/crawlable HTML for published landing pages, unique title/description, self-canonical URLs, breadcrumbs and appropriate structured data reflecting visible content. Only selected published landing pages enter the sitemap. Do not generate indexable pages for every date/filter combination. Use normal HTML links between destinations, service collections and products.

Keep Moshe Barak as one possible operator and a disclosed local contributor. His reviews and cancellation terms belong only to his own services. Do not apply them to other suppliers.

Include useful empty, loading, unavailable-data and expired-quote states. Verify mobile comparison usability, filtering, configured outbound links, source timestamps and admin/public permissions before presenting this iteration as complete.

At completion, report exactly which integrations are real and working, which only have configured outbound links, and which still need credentials or verified inventory. Keep these implementation notes in the project handoff, not in the traveler's booking flow.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/7cd7aae9-57c0-4ced-b1fa-2f0691483fee).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
