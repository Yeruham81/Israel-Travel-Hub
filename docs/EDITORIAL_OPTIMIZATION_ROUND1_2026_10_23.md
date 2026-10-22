# Editorial optimization — Round 1 (23 October 2026)

## Scope and implementation
Direct GitHub edits on main, preserving page structure and booking infrastructure. The first pass tightened existing copy across airport transfers, the four private-route pages, the four all-mode journey pages, Ashdod/Haifa shore excursions and the shore hub, and the accommodation city/area/category guides.

Modified content files:
- src/data/airportTransfers.ts
- src/data/airportRoutes.ts
- src/data/airportJourneyGuides.ts
- src/data/registry.ts
- src/data/shoreExcursions.ts
- src/data/shoreHub.ts
- src/components/PortPage.tsx
- src/data/content.ts

## Editorial decisions
- Replace formulaic promotional openings with concrete travel decisions (gate/drop-off, hotel district, coastal versus uphill destinations, realistic port-call planning).
- Reduce repeated generic calls to compare/check details while retaining relevant caveats.
- Clarify differences among official taxis, pre-booked rides, rail/bus itineraries and per-vehicle private-service offers.
- Retain licensed-guiding exclusions, operator-specific booking conditions, source-dependent transport facts, accessibility and child-seat cautions.
- Remove the old mandatory 24-hour advance-request wording from airport FAQ and registry copy; recommend early inquiries without a fixed minimum.
- Preserve existing URLs, commercial links, fees, registry IDs, booking and request forms, CTAs, SEO metadata, schemas, image credits, navigation and layouts.
- Do not fabricate firsthand anecdotes or add new unverified facts.

## QA and remaining work
- Inspected exact source text before replacement. All 48 planned literal replacements across eight changed files were successful except for one redundant phrase already removed by a larger replacement; no files were changed as a result of unsuccessful patterns.
- Refetched edited files from GitHub and verified no '24 hours' / '24-hour' strings remain in those eight files.
- Did not run local typecheck, tests, lint, production build or browser E2E in this connector-based pass; these remain unverified.
- This is a prose-only first pass, not the later round of original local insights, new route matrices, hotel-specific fact verification, port timing tables or layout changes.
- Some longer specialist airport taxi/arrival/Shabbat guides were reviewed earlier and intentionally not heavily rewritten, to avoid eliminating their nonduplicative technical instructions.

