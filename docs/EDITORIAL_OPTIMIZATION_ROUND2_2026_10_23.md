# Editorial content optimization — round 2 (23 October 2026)

## Implementation
Made directly in the GitHub main branch (without a Lovable-agent build). This pass adds specific planning guidance and illustrative decision scenarios. It deliberately does not invent personal experience, provide live pricing, or promise operational conditions.

### Ben Gurion Airport transfers and transport guides
- Four independent all-mode journey guides now include three-step destination-specific illustrative journeys and a pragmatic choice note: Jerusalem/Jaffa Gate, Tel Aviv beachfront, Haifa railway/hills/port, and Jerusalem connection to Ein Bokek.
- Four commercial private-transfer route pages now include their own vehicle/drop-off scenario (Old City gate access, four passengers with luggage, Haifa cruise boarding, requested Masada stop).
- The transfer hub now describes the inquiry, written offer and separate confirmation stages.
- Removed two residual 'request at least 24 hours ahead' requirements from the shared commercial route component. Advance contact is encouraged but not imposed as a fixed minimum.

### Ashdod and Haifa shore excursions
- Each port guide now distinguishes three route types by travel priority, access limitation, and sightseeing constraints. No invented drive-time hours or return guarantee.
- Port-specific access guidance is grounded in the official passenger terminal pages; actual day-call operator instructions and designated meeting points take precedence.
  - Haifa passenger terminal pedestrian bridge at HaAtsmaut Street, around number 65; vehicles cannot access the bridge: https://www.haifaport.co.il/en/terminal/
  - Ashdod commercial port pedestrian/private-vehicle restrictions; confirm ship-specific shuttle and operator arrangements: https://www.ashdodport.co.il/serviceslist/passengers/Pages/passengers-cruises.aspx
  - Masada's advance coordination, last entry and last cable car: https://en.parks.org.il/reserve-park/masada-national-park
- Shore hub highlights the distinct access arrangements of each port and leads with route choice instead of generic travel promotion.

### Accommodation
- Fourteen neighborhood guides (six Jerusalem and eight Tel Aviv) use distinct short local decision aids about block selection, alternatives and actual vehicle/luggage arrival. Hotel recommendation cards remain compact and untouched.
- The Jerusalem and Tel Aviv hub comparison tables add a short 'Arriving with bags' column for each area.
- Dead Sea, Tiberias and Haifa hotel destination guides now offer three location/base choices based on the visitor's itinerary, with particular emphasis on hotel-vs-beach distinctions, topography and transport.
- Six hotel-category pages add a specific scenario to clarify room, spa, family and setting tradeoffs, without claiming live room availability or property visits.
- The Accommodation hub adds practical planning about a single city base versus several stays across regions.

## Content boundaries and preservation
- Routes, head/meta descriptions, canonical URLs, structured data, existing images, affiliate links, disclosures, provider cards, room prices, transfer/shoreside rates, quote forms, and navigation links have not been intentionally changed.
- The new advice is planning commentary based on established geography or documented operator practices, **not claimed first-hand reviews, hotel inspections, or guaranteed services**.
- Existing fact-check/review timestamps for hotel/operator data were left unchanged because the complete underlying pricing and inventory were not reverified.
- Operational details, especially the cruise ship's actual passenger-handling arrangements, should be reconfirmed for the travel date.

## Files
- src/data/airportJourneyGuides.ts; src/components/AirportJourneyPage.tsx
- src/data/airportRoutes.ts; src/components/AirportRoutePage.tsx
- src/routes/transfers.index.tsx
- src/data/shoreExcursions.ts; src/components/PortPage.tsx
- src/data/shoreHub.ts; src/routes/shore-excursions.tsx
- src/data/localEditorialInsights.ts (new)
- src/components/NeighborhoodStayPage.tsx; src/components/CityStayHub.tsx
- src/components/HotelDestinationPage.tsx; src/components/HotelCategoryPage.tsx
- src/routes/hotels.tsx
- src/data/localEditorialInsights.test.ts (new, coverage assertions for all three clusters)

## Verification
- Each update was committed directly to GitHub and the updated files re-fetched.
- Checked presence of all four all-mode journey scenarios, four commercial examples, two port-specific access blocks and three route-fit rows per port; 14 neighborhood notes/arrival distinctions; three destination groups; six category examples.
- Corrected strict TypeScript indexing errors found in the newly added coverage test after the initial GitHub Actions run.
- Full GitHub Actions TypeScript/test/build results must be read from the final run for the tip commit; do not infer success from the presence of the test or content file.
