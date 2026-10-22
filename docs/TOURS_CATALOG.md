# Tours & Day Trips catalog

Implemented 22 October 2026. Existing Lovable project and staging indexing settings are preserved.

## Visitor pages

`/tours/` is a category gateway with eight illustrated topics and two product examples per topic initially. Its light header pairs plain text with an unobscured destination photograph, without a navy background, owner-promotion block or hero buttons. Destination-tag buttons narrow the categories and examples, keep the selected destination in the URL and carry it into category pages. The gateway has no text-search field or departure selector; old keyword/origin parameters are discarded. Every example links to the shared product's anchor in its full category catalog.

| Category | Permanent URL |
| --- | --- |
| Jerusalem | `/tours/jerusalem/` |
| Tel Aviv & Jaffa | `/tours/tel-aviv-jaffa/` |
| Masada & Dead Sea | `/tours/masada-dead-sea/` |
| Bethlehem, Jericho & Jordan River | `/tours/bethlehem-jericho-jordan-river/` |
| Nazareth & Sea of Galilee | `/tours/nazareth-sea-of-galilee/` |
| Caesarea, Haifa & Acre | `/tours/caesarea-haifa-acre/` |
| Food & markets | `/tours/food-market-tours/` |
| Eilat & Red Sea | `/tours/eilat-red-sea/` |

The former `/tours/bethlehem-from-jerusalem/` route now permanently redirects (301) to `/travel-blog/jerusalem-to-bethlehem/`, the informative guide comparing buses, taxis, private arrangements and organised tours. It appears once in Travel Guides and in the guides sidebar group, rather than under Tours. Topic/product links now point directly to `/tours/bethlehem-jericho-jordan-river/`; the category links back to the transport guide. The redirect-only URL is omitted from the sitemap.

Each category has its own title, description, introduction, comparison content, practical planning, FAQs, four illustrated guide cards and other category links. Metadata uses `pageMeta`, breadcrumbs and a factual `CollectionPage`/`ItemList`. It does not claim live inventory, ratings, product offers or date-specific availability. Canonicals point to the permanent unfiltered URL; no filter permutations are added to the sitemap. Filters are form controls, so the site does not emit crawlable links for every combination. Existing staging `noindex,nofollow` remains unchanged.

The gateway has one illustrated cruise-port callout titled “Arriving in Israel on a cruise?” with the same cruise-ship illustration as the homepage and distinct Haifa/Ashdod entry cards. Its separate six-card “More help planning your trip” section covers general travel tips, seasons, holidays, nationwide transport, eSIM and accommodation; it does not repeat shore-excursion links or destination guides. Category pages use illustrated cards for the other seven categories plus the full hub, retaining an even eight-card layout.

## Records and queries

- `src/data/registry.ts`: `tourProducts` holds 22 unique products (seven owner private days and 15 external experiences); `tourBookingOffers` holds one currently checked marketplace listing per external product. Operators and booking partners remain separate. External source references and `ProviderLink` records are derived by stable offer ID; six owner day-trip source records retain the original departure-specific price pages.
- `src/data/tourTypes.ts`: contracts, place taxonomy and interest tags. Products keep origins separate from destinations, plus format, advertised total duration, pickup and inclusion information. Optional owner `price` records use the existing ILS `published_starting_rate` contract, restricted to a per-vehicle basis. The generic Jerusalem day remains individually quoted.
- `src/data/tours.ts`: editorial category content and image provenance. Category selection rules match destination or interest tags, rather than copying product arrays.
- `src/lib/tours.ts`: queries, safe search parsing, filtering, sorting, offer resolution and price expiry. `toursForCategory` returns the original shared objects. A Jaffa/Carmel product appears in both Tel Aviv and food categories; a Jerusalem/Bethlehem product appears under both destinations.
- The tour-category sidebar branch stays expanded on every page, including the mobile drawer, without a toggle. Catalog section headings use “More [category title]” when owner cards precede them, or the category title alone when there are no visible owner trips; provider-type headings are omitted.
- `TourCatalog` separates owner transport from independently operated experiences even after filtering. Owner itineraries use the same light, bordered image-card style as the shore-excursion pages, with duration, format, departure, inclusions and a direct quote link; there is no dark-blue owner section. All listings appear initially. Optional origin, destination, interest, format, duration, keyword and sort controls persist in the URL. Invalid enum values and unrelated search keys are discarded at the page boundary. Search typing replaces history entries; categorical choices support Back.

Cruise-port products continue to use the existing shore catalog. Ordinary hotel/city departures are not presented as port pickup or ship-return products. No existing shore prices, forms or return arrangements were changed.

Owner quote buttons also have unique product URLs (`/private-driver/?tour=<owner-product-id>#request-quote`). The existing form receives the chosen itinerary and day-hire service type; visitors supply actual pickup/return addresses. Only published owner records are accepted. Existing cruise-port one-way transfer prefills retain precedence and the gated form-delivery service is unchanged.

## Product-specific affiliate configuration

Every external booking offer has a unique key, for example:

```ts
"tour-jaffa-carmel-walk-getyourguide": { trackingUrl: "<approved product-specific URL>" },
```

Add approved values in the existing `affiliateConfig` object **after** its initial `Object.fromEntries` defaults. The key is the offer ID, not the page or destination. A change updates every appearance of the product. Until configured, the original product URL is used, without a false affiliate disclosure or `sponsored` attribute. Configured links receive the affiliate disclosure and `sponsored noopener noreferrer`. Outbound click events keep both `productId` and `offerId`.

To add a genuinely identical tour on another marketplace, verify operator, route, format, pickup and included option first. Then append an offer referencing the same product. Distinct guided, private, hosted and different-departure products must not be merged just because their titles resemble each other. The current set intentionally avoids speculative cross-platform merging.

## Prices and sourcing

The Masada/Dead Sea, Nazareth/Galilee and northern-coast categories each begin with two owner cards, Tel Aviv then Jerusalem, in a responsive two-column grid. Their photographs differ from each other and from external product photographs in the same category. Other operators remain in their own section below. Each departure is a shared product record with its own origins, duration, rate source and quote-prefill URL; existing `my-*-day` IDs are retained for the Tel Aviv versions.

The six original itinerary pages were checked on 22 October 2026:

| Itinerary | Tel Aviv departure | Jerusalem departure |
| --- | --- | --- |
| Masada & Dead Sea | ILS 2,100 · 9 hours | ILS 2,100 · 8 hours |
| Nazareth & Sea of Galilee | ILS 2,300 · 10 hours | ILS 2,900 · 10 hours |
| Caesarea, Haifa & Acre | ILS 2,000 · 9 hours | ILS 2,700 · 10 hours |

These are weekday transport starting rates per vehicle for up to four passengers, including accommodation pickup and return in the named city. Guiding, admissions, parking, tolls, meals and tips are extra. The original pages' explicit ILS price blocks take precedence over a stale USD sentence in their legacy notes. Cards reuse the shore catalog's `PriceDisplay`, including approximate USD/EUR equivalents and charged-in-ILS wording. No cruise-port rates are reused. Availability, extra hours and weekend/holiday pricing still require confirmation. Owner source URLs remain internal provenance under the site's existing publisher-source filtering.

All 15 marketplace product URLs were reviewed on 22 October 2026 for identity and advertised details. No travel date was selected or availability confirmed. Two products have explicitly observed USD reference starting-price snapshots (Eilat boat US$24/person; northern-coast small group US$279/person). Other cards direct the visitor to current dates/prices. Never manufacture an amount from a different tour, recommendation tile, currency or departure option.

`tourSnapshotPrice` verifies positive amount, allowed currency/basis, matching offer/source/check date and a maximum 30-day age. Expired or invalid snapshots disappear in favour of current-price links. These prices are editorial references; no live-price/API or checkout schema was introduced.

Some source text is inconsistent: Mahane Yehuda's meeting map and prose disagree; the card asks for written confirmation of the Jerusalem address. Coastal listings mention multiple route versions, so Rosh Hanikra is not tagged as a guaranteed stop. Advertised total duration is distinguished from time actually snorkeling. Provider pages must be rechecked when refreshing these facts.

The cruise callout reuses `src/assets/home/cruise-port.webp`, the homepage's AI-generated cruise illustration. Its alt text identifies it as an illustration without naming a real ship, operator or port. The earlier Royal Iris photograph is retained as an unused source asset with its original provenance in the assets README.

Eilat's new coral photograph is by Yoav95179, CC BY-SA 4.0, resized and converted to WebP. Its source, licence and modification credit are in the photo record and the page's image-credit disclosure. Existing photographs retain their established provenance.

## Validation

- Category-heading and Bethlehem guide/navigation correction: all 334 tests across 41 files, TypeScript and production build passed. Regressions cover category-specific headings with and without owner cards, permanently expanded desktop/mobile tour navigation, the 301 guide redirect, unique guide-directory entry, reciprocal guide/catalog links and sitemap exclusion of the old URL.
- Departure-specific private days and currency-format update: all 332 tests across 41 files, TypeScript and production build passed. The three category regressions cover owner-first separation, two-column layout, distinct images, six source-backed rates/durations, USD/EUR estimates and disclaimers, quote-prefill identity and Jerusalem-origin filtering.
- Full suite after the gateway redesign: 322 tests across 40 files passed.
- TypeScript and production build passed; sitemap contains the eight new permanent category URLs.
- Catalog integration tests verify shared identity, category matches, origin/destination distinction, compound filtering, multiword search, URL/history behaviour, no-results reset, booking channels, affiliate resolution, click tracking, price expiry, internal links and collection metadata.
- Cloud-browser visual QA could not run: the managed preview hostname `terminal.local` was rejected by this existing project's Vite host configuration. No hosting/security settings were changed for optional QA.
