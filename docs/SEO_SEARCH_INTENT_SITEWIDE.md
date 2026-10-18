# Search intent review — remaining editorial and commercial landing pages
Date: 2026-10-18. GitHub-only changes; no Lovable agent or credits.

## Method & evidentiary limits
- Audited the page templates and source copy in the repository to distinguish destination hub, hotel-area, hotel-category, practical guide, booking/service and attraction intents.
- Used live public search exploration across Jerusalem/Tel Aviv/Haifa/Tiberias/Dead Sea hotel location queries; Masada, Jordan baptism sites and Israel transport queries. Search observations were *qualitative*: no Keyword Planner volumes, GSC impressions/CTR, exact rank positions or booked conversion data were available.
- Prioritized unique titles and description summaries that reflect the already visible body copy. Avoided fabricated popularity, cheapest prices, firsthand hotel reviews, current availability or generic SEO filler.
- **Important:** Metadata adjustments do not substitute for a full competitive content gap study or Search Console research. Recommendations below describe intent targets, not proven rankings or search volumes.

## Hotel neighborhood intents (14 unique pages)
| Path | Distinct target query intent | Content already serving it |
|---|---|---|
| /jerusalem/downtown-hotels/ | Downtown Jerusalem hotel base, first visit / without car | Jaffa Road, light rail, walk to Old City, noise |
| /jerusalem/mamilla-king-david-hotels/ | Mamilla luxury hotels close to Jaffa Gate | Hotels and luxury setting, drop-off, views |
| /jerusalem/old-city-hotels/ | Staying within Jerusalem's Old City walls | Historic quarters, gate approach, steps |
| /jerusalem/mahane-yehuda-nachlaot-hotels/ | Hotels near Mahane Yehuda Market and Nachlaot | Food, nightlife, local character and arrival |
| /jerusalem/east-jerusalem-hotels/ | Hotels by Damascus Gate and Nablus Road | Heritage hotels, Old City access |
| /jerusalem/german-colony-baka-hotels/ | Quiet Jerusalem hotel stays, Emek Refaim and Baka | Residential area, tradeoffs, transport |
| /tel-aviv/beachfront-hotels/ | Tel Aviv seafront near Gordon and Frishman | Beach location, sea-view rooms, noise |
| /tel-aviv/dizengoff-city-center-hotels/ | Central Tel Aviv boutique hotels without a car | Cafés, center, beach walks, transit |
| /tel-aviv/old-north-port-hotels/ | Old North, Tel Aviv Port, family beach stay | Northern beaches, park and distance |
| /tel-aviv/neve-tzedek-hotels/ | Neve Tzedek boutique/heritage hotels | Historic lanes, accommodations, access |
| /tel-aviv/jaffa-hotels/ | Old Jaffa versus flea-market area hotels | Luggage, Jaffa atmosphere, hotel picks |
| /tel-aviv/florentin-hotels/ | Florentin street-art/nightlife area hotels | Nightlife tradeoffs, location and rooms |
| /tel-aviv/kerem-hateimanim-hotels/ | Carmel Market/Yemenite Quarter accommodation | Food market, beach walk, noise |
| /tel-aviv/rothschild-boulevard-hotels/ | Rothschild Boulevard / White City hotels | Bauhaus, cafés, nightlife and room selection |

## Hotel category and destination intents (8 pages)
| Path | Distinct target intent |
|---|---|
| /dead-sea/spa-hotels/ | Dead Sea spa and age-restricted wellness facilities versus treatments |
| /dead-sea/family-hotels/ | Dead Sea family resorts, water activities and meal plans |
| /haifa/boutique-hotels/ | German Colony heritage/design boutique hotels |
| /haifa/family-hotels/ | Haifa beach versus Carmel family stays |
| /tiberias/family-hotels/ | Tiberias family pools, water parks and meals |
| /tiberias/luxury-hotels/ | Tiberias lakeside, spa and upscale couples' hotels |
| /travel-blog/best-hotels-in-haifa/ | Broad Haifa hotel choice, lower town versus Carmel versus beach |
| /travel-blog/best-hotels-in-tiberias/ | Broad Tiberias/Sea of Galilee hotel choice by style/location |

## Practical editorial queries (13 guides)
| Topic ID | Intent covered by new metadata |
|---|---|
| uber | Uber available? Alternatives in Israel |
| sherut | Ben Gurion Airport sherut status and substitutes |
| esim | Choosing eSIM package and activation, distinct from generic first-time tips |
| arrival | Ben Gurion airport arrival process and onward transport |
| telAviv | Getting around Tel Aviv without a car |
| travelTips | General first-time Israel preparation, not ranking on a specialist eSIM-only query |
| jerusalem | Multi-day Jerusalem sights and itinerary planning |
| jerusalemDeadSea | Transport/choice of stop between Jerusalem and Dead Sea |
| baptism | Yardenit versus Qasr al-Yahud site choice (verify current access directly) |
| jerusalemChurches | Area-grouped church itinerary |
| jerusalemShopping | Jerusalem shopping areas by product/experience |
| jerusalemDayTrips | Day trip choices from Jerusalem |
| telAvivDayTrips | Day trip choices from Tel Aviv |

## Other commercial and navigation landings (9)
| Route | Intent |
|---|---|
| /transfers/ | Private Ben Gurion transfers, destinations and starting rates |
| /hotels/ | Hotels by Israeli city and vacation style |
| /car-rental/ | Airport versus city rental, rules and trip fit |
| /shore-excursions/ | Haifa/Ashdod port shore excursions and ships' time |
| /tickets/ | Ticket-only entry to Masada and Caesarea versus tours |
| /attractions/ | Attraction discovery by Israeli region |
| /private-driver/ | Intercity and full-day private driver quote |
| /guides/ | Guide-library navigation (not a substitute for individual long-tail pages) |
| /attractions/caesarea/ | Planning Caesarea National Park visit and admissions |

## Cannibalization and accuracy guardrails
- Destination hotel overview pages target **where to stay in city**; neighborhood pages target the **specific neighborhood**; spa/family/luxury subpages target **specific travel style**. Do not create parallel generic “best X hotels” URLs.
- General Israel travel tips vs eSIM: terms like “eSIM” in general metadata can make directory search present multiple guides. The generic guide now uses “mobile data” for appropriate broader intent, while specialist guide retains eSIM query.
- Airport authorized metered taxi vs private transfers, day-tour tickets vs site-only admission, Qasr al-Yahud vs Yardenit, and historic or changing operator schedules must stay distinguishable.
- Existing user-visible editorial copy, price/booking disclosures, source lists and cancellation limitations were retained in this pass. Changes are title/description-focused; no unsupported live pricing claims.
- Do not claim Search Console positions, keyword volumes, hotel room availability or rich-result eligibility.

## Next verification
- GitHub Actions full TypeScript, test suite and build success on the final commit.
- After launch (separate approval), inspect actual SERPs, GSC queries and CTR by URL and device, compare impressions for overlapping title clusters, and revisit each guide for deeper content additions based on measured demand.
- No site indexing settings, live destination hub design, quote submission, domain changes or Lovable agent activity were included.
