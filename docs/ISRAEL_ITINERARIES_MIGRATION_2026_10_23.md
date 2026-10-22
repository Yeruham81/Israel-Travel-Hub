# Four Israel itinerary articles — migration and editorial rebuild
Date: 2026-10-23

## URLs and search intent
Retained the original publisher's page slugs:
- /travel-blog/israel-itinerary-3-days/ — limited-time, realistic first visit with optional desert day
- /travel-blog/israel-itinerary-5-days/ — classic first visit, two city bases and one coastal extension
- /travel-blog/israel-itinerary-7-days/ — one-week multi-region route and a northern hotel base
- /travel-blog/israel-itinerary-10-days/ — slower Jerusalem–Galilee–coast circuit, with an alternative that substitutes Eilat/Timna for northern days

The legacy URLs use /travel-blog/ and are deliberately preserved; no separate redirects are required if the original domain and route are served by the new site.

## Implemented
- src/data/israelItineraries.ts — unique daily editorial schedule, morning/afternoon/evening, limits, hotel suggestions, transport choices, adaptation options, FAQs, destination-specific internal links and map waypoints.
- src/components/IsraelItineraryPage.tsx — responsive, accessible day-by-day layout, canonical/meta and Article JSON-LD, table of contents, credits for existing site photos, cross-article links and editorial reference URLs.
- Four route files: src/routes/travel-blog.israel-itinerary-{3,5,7,10}-days.tsx
- src/routeTree.gen.ts updated to register the four file routes (the TanStack generator may rewrite formatting in later builds).
- public/maps/area.html accepts an optional bounded list of numbered destination pins. Pins indicate approximate geographic destinations, **not** a road route, journey duration, or map-directions guarantee; the existing one-pin hotel area maps remain unchanged.
- Internal links added from Travel Guides directory/topic category, side navigation, Accommodation itinerary cards, selected attraction guides, city/transport guides and regional accommodation guides.
- The Accommodation hub's former off-site itinerary links and old-site notice are removed; all four are internal links.
- public/sitemap.xml includes all four additional original URLs and retains the preview environment's existing domain/indexability configuration.
- src/data/israelItineraries.test.ts checks daily lengths, distinct content intent, map pins, old URL preservation, link registration and directory/hub integrations.

## Editorial decisions
These are **sample itineraries** assuming fully usable sightseeing days, not travel packages. They do not claim first-hand stays, guaranteed access, specific live fares, or that operator availability has been checked for the visitor's dates. Day-specific descriptions focus on real logistical decisions rather than repeating generic promotional copy.

Important limitations explicitly disclosed:
- Masada cable-car, trail restrictions and park timing: https://en.parks.org.il/reserve-park/masada-national-park/
- Bahá’í Gardens self-guided viewpoints versus guided reserved tours: https://ganbahai.org.il/visit-us-haifa/
- Current train/bus schedules: https://www.rail.co.il/ and https://bus.gov.il/
- Ein Gedi trails and protected-area restrictions: https://en.parks.org.il/
- Bethlehem/Jericho visits need their own verified access and operator arrangements, and regional/nature trips must follow date-specific official guidance.
- The 10-day main route excludes Eilat/Timna; a southern trip replaces several northern days and requires a realistic return before international departure.

## SEO and verification notes
Page titles/meta descriptions are length-specific. The body has readable day headings, relevant internal destination anchors and a separate cross-link to the other trip lengths. Structured Article schema uses the publisher as author and a current editorial modified date; there is no fake Offer schema or invented public-transport inventory.

GitHub Actions checks: inspect the newest "Full Project Validation" run for this branch; workflow runs TypeScript, all Vitest suites, and production build. Do not represent a queued or cancelled run as completed. Preview/publication is managed separately; committing to GitHub does not by itself prove what custom domain currently serves.
