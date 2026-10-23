# Attractions hub redesign — 23 October 2026

## Scope
The existing /attractions/ directory has been redesigned in place without changing any existing guide route or modifying guide bodies. It remains a discovery directory rather than replacing /destinations/ (destination planning), /tours/ (bookable tour categories), or /guides/ (all practical travel articles).

## New page structure
- Compact illustrated hero with a direct region jump and one optional Israel-highlights guide.
- Seven geographic sections, in a geographic sequence: Jerusalem; Tel Aviv & Jaffa; Haifa & Mediterranean coast; Nazareth & Lower Galilee; Sea of Galilee & Jordan River; Dead Sea & Masada; Negev & Eilat.
- Each section has a region image, short editorial summary, photo-backed guide cards and a short set of tightly relevant planning links.
- Native anchor navigation is semantic, keyboard accessible and works without state or heavy filtering; mobile uses a two-column jump-link layout from sm breakpoint onward. The section IDs support direct links.
- Exactly 31 distinct guide cards; all 17 original AttractionGuidePage routes survive unchanged. Includes Shopping in Jerusalem, Masada and Caesarea.
- JSON-LD CollectionPage/ItemList, canonical metadata and existing main sitemap URL preserved. No prices, live opening hours or unverified opening-status claims.
- New media are hosted under public/images/attractions and never hotlink to the legacy WordPress site. Other existing guide photos remain imported from existing assets.

## Media provenance
Images selected visually from the owner's existing WordPress uploads mirrored to connected Google Drive /ChatGPT/{year}/{month}. The selected source filenames and paths are declared in src/data/attractionsHub.ts and displayed in a compact disclosure on the hub for tracking. This import does not establish independent copyright/photographer/license attribution; any third-party credit requirements need original-file rights review prior to broader repurposing.

Selected media filenames:
- The_Old_City_of_Jerusalem_3.jpg.webp
- jaffa1.jpg.webp
- haifa_panorama_1.jpg.webp
- courtyard_basilica_of_annunciation_.jpg.webp
- sea_of_galilee_panorama.webp
- dead-sea-israel.jpg.webp
- clouds_at_ramon_crater.jpg.webp
- Eilat_Village_Beach.jpg.webp
- mahane_yehuda_jerusalem.webp

## Future content work
This first phase does not rewrite any guide. For each regional cluster, subsequently review the original legacy article for missing content and create context-specific links in both directions between the relevant attractions, tours, transfers, excursions and accommodations, keeping search-intent distinctions clear.

## Checks
src/test/attractions-hub.test.ts verifies region structure, all 17 existing attraction paths, no duplicated card paths, Jerusalem shopping, topical planning links, and no reliance on remote legacy photos. Run the existing workflow (TypeScript, unit tests and production build) on main and inspect desktop/mobile layouts.
