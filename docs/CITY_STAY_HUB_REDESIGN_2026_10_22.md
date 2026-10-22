# Jerusalem and Tel Aviv accommodation hubs — 22 October 2026

## Scope and page intent

Updated the two existing editorial pages without changing their routes, SEO metadata, canonical origin, property ranking, affiliate configuration, or detailed area-guide structure:

- `/travel-blog/where-to-stay-in-jerusalem/`
- `/travel-blog/where-to-stay-in-tel-aviv/`

All implementation was performed directly via GitHub; no Lovable AI agent invocation.

## Area cards and travel-planning links

The shared `CityStayHub` now uses consistent 16:10 cropped local neighborhood photographs on both the highlight cards and full-area cards. Removed the small embedded maps from the overview cards; each detailed area page still provides its own larger map in the location section. Removed ordinal badges and hotel counts from the cards' CTA. The new action is **Explore Area & Hotels**. Nearby sights, price-level context and one practical caveat remain visible. Keyboard-accessible links and travel-style filters are preserved.

The city hubs use `CityStayPlanning` instead of a compact group of text-only related links: six real internal planning/transport/day-trip guides per city, each with an appropriate existing local image. Source and licence attributions for third-party images are disclosed below these cards when applicable. No new external booking service was added.

## Tel Aviv browse-by-area catalog

`TelAvivHotelBrowser` lists the **16 existing Tel Aviv hotel records** from `hotelRecommendations`, representing the eight existing city neighborhoods. Visitors can filter by area (the default is All Areas) and sort by area or hotel name. Selecting a tag changes which hotels are shown; it does **not** query a provider or check rates.

Each card draws its editorial name, style, summary and best-for details from the existing registry and derives the corresponding current booking `ProviderLink` for `stay-area-${hotel.areaId}`. The individual property CTA redirects to the configured provider destination, with the existing sponsored `rel` treatment and click-only analytics event. Dates and guests must be entered on the provider site; the preview never claims room availability or payment completion. Any active operating notice is retained.

### Catalog visuals and compact property cards

The owner approved **general licensed hotel-room, lobby and Tel Aviv scenery photographs** for the catalog rather than images of the exact named properties. The sixteen current cards use sixteen different selected illustrations from `src/data/telAvivHotelPhotos.ts`; corresponding source, author and license information appears in the collapsed photo-credit disclosure. None is presented as a verified photograph of the hotel named beside it. Direct image sources may fall back to the appropriate area photograph if an image request fails.

Each compact card contains only its image, the exact hotel name, a clickable neighborhood name, a property-specific short description, a brief **Best for** phrase, and the existing tracked booking link opening in a new tab. The existing operating notice is retained when applicable; no unsupported availability or price claims are added. The catalog-level disclosure is deliberately concise and does not repeat beneath each card.

Area tags are compact on desktop; mobile uses one labeled area select. Changing a filter does not query a supplier or alter offers. The booking links retain configured affiliate URL, secure new-tab attributes, and outbound click tracking.

If adding genuine property-specific photography later, verify rights and keep full source/usage metadata; do not substitute unlabeled pictures as actual hotel imagery.

## Validation and release

`src/test/city-stays.test.tsx` covers the two hub URLs and area images (including no map iframe in the overview), guide links, existing full-area maps and hotel bookings, the new city planning cards, all sixteen Tel Aviv hotel cards, area filtering, sort, and outbound tracking. Final GitHub Actions validation should pass TypeScript, Vitest and production build before marking release-ready. Staging noindex, provider metadata, sitemap URLs, DNS and production publishing remain unchanged.
