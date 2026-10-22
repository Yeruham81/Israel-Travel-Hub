# Accommodation hub upgrade — 22 October 2026

## Scope
Updated the existing `/hotels/` accommodation hub. All edits were made directly through GitHub on `main`, not the Lovable agent. Preserved the existing canonical URL, six destination cards and booking-model distinctions. Added dedicated guide-link cards, hotel-style explanations, choice factors, season and holiday planning, and illustrated arrival and itinerary sections.

## Existing internal destination and editorial links
- Accommodation: Jerusalem, Tel Aviv, Haifa, Tiberias and the Dead Sea destination guides, plus Eilat's already-existing city guide section `/travel-blog/eilat/#arrival-stay`.
- Hotel styles: existing Haifa boutique, Jerusalem Downtown, Tel Aviv beachfront, Dead Sea spa, Tiberias family and Tel Aviv Florentin neighborhood guides.
- Seasons and events: `/travel-blog/best-time-to-visit-israel/` and `/travel-blog/calendar-of-events/`.
- Arrival: `/travel-blog/ben-gurion-airport-arrival-tips/`, `/travel-blog/from-ben-gurion-airport-on-shabbat/`, the four ALL-MODE `/travel-blog/how-to-get-from-ben-gurion-airport-to-...` destination pages, `/travel-blog/getting-around-israel/`, and `/transfers/`.

### Eilat future migration
The card CTA is **Explore Eilat Hotels**, but there is no dedicated hotel comparison for Eilat yet. It currently opens only the relevant hotel-area planning section in the existing Eilat city guide. When a verified Eilat hotel guide is actually built, update the `accommodationDestinations` Eilat link to its real, tested page and keep its existing destination page intact.

### Blocking item before domain cutover: four itinerary articles
The full 3-, 5-, 7- and 10-day itineraries are **not yet present as internal pages** in this codebase. Their cards currently open old-site URLs as clearly identified external links:

- `https://www.israel-taxi.com/travel-blog/israel-itinerary-3-days/`
- `https://www.israel-taxi.com/travel-blog/israel-itinerary-5-days/`
- `https://www.israel-taxi.com/travel-blog/israel-itinerary-7-days/`
- `https://www.israel-taxi.com/travel-blog/israel-itinerary-10-days/`

**Before switching israel-taxi.com from WordPress to the new portal:**
1. Migrate all four original itineraries into genuine, high-quality TanStack pages, using exactly the four same paths (with trailing slash).
2. Integrate them into the Guides directory, navigation where suitable, sitemap, appropriate related pages and relevant internal links.
3. Replace the `href` entries in `src/data/hotelHub.ts` with typed internal `to` links and update `src/routes/hotels.tsx` rendering accordingly.
4. Test the internal routes on staging and all applicable redirects. Do not ship links to the old WordPress site at the same domain once that website has been replaced.

The external links are a **temporary editorial bridge**, not a final migration strategy.

## SEO/content boundaries
The hub is a decision-making page, not a duplicate of detailed hotel comparisons, an availability API, a seasonal climatology article, or a taxi-booking landing. The airport-to-city cards link to the all-mode journey guides; `/transfers/` is the separate private-transfer option. No prices, availability, affiliate parameters or operator claims were invented.

## Photographs
All added photo content reuses existing local project image assets and typed provenance records; the hub includes a consolidated, deduplicated on-page photo-credit disclosure for images with original source URLs. Generic pickup/road-trip illustrations are described as illustrations rather than real providers or vehicles.

## Verification
`src/test/hotel-hub.test.tsx` checks hub metadata and route resolution, cards and their images, exact temporary itinerary URLs, Eilat section hash and visual text. GitHub Actions is the project validation entrypoint; verify its latest run before marking this change release-ready. Visual browser review remains a separate release check. No DNS, publication or staging indexing configuration was changed.
