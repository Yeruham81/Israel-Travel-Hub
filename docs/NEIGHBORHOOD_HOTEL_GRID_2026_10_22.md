# Neighborhood hotel cards — October 22, 2026

## Scope
- All **14** Jerusalem and Tel Aviv area-detail pages now display four compact hotel cards each in a two-column desktop grid (single column on small screens).
- Each area combines the **two existing affiliate-linked recommendations** with **two additional hotel/guesthouse skeleton listings**.
- The Jerusalem/Tel Aviv **city-wide** catalogues intentionally remain 12/16-property editorial shortlists; the new listings appear only on the area subpages.
- Card contents: illustration, hotel style/name, concise specific summary, **Best for**, and one Expedia CTA. Area-page maps, practical details, FAQ and additional browsing sections are preserved.
- Photos are general, licensed illustrations drawn from the existing city pools, **not images of those particular hotels**. Credits are collapsible beneath each grid. Hotel-specific photography can replace them later.

## Property URLs and affiliate migration
- The complete list of **28 direct Expedia property URLs** is in `src/data/neighborhoodHotels.ts`. These are **not affiliate URLs**, and no affiliate or live-pricing claim is made for them.
- Their catalog/source records flow through `src/data/registry.ts`; new offers use `View hotel on Expedia`, `isAffiliate: false` and do not get `rel=sponsored`.
- The existing 28 owner-configured Expedia affiliate links continue to use `Check rooms on Expedia`, `isAffiliate: true` and `rel=sponsored`.
- To replace a new direct Expedia URL with an **approved property-specific tracking link**, add an entry to `affiliateConfig` in `src/data/registry.ts`, e.g. `"hotel-jlm-ibis-expedia": { trackingUrl: "https://...approved..." }`. The existing ProviderLink generator will automatically switch the CTA/disclosure to an affiliate offer. Verify destination and approved tracking link before doing this.
- No API/live quote or dynamic pricing is used or implied.
- The image source and the displayed hotel are deliberately not claimed to be the same.

## Selected substitutes
Where an earlier candidate did not have a clearly verifiable individual Expedia property page, these additions were used instead:
- Austrian Hospice → Hashimi Hotel
- Gloria Hotel → Saladin Boutique Hotel
- De Mar Florentine → Levinski Market Hotel
- Shell House → Carmel Beach House by Berry Stays
- The Rothschild Hotel at 96 → The Rothschild 71

## Main components
- `src/components/NeighborhoodStayPage.tsx`: balanced 2×2 grids, image attribution and short disclosures.
- `src/components/StayHotelCard.tsx`: reusable compact card mode, retaining its existing expanded mode for other site sections.
- `src/data/neighborhoodHotels.ts`: new property source IDs, short editorial skeleton entries, direct Expedia URLs.
- `src/data/registry.ts`: inclusion in area-only `hotelsForArea` and Expedia outbound links, preserving accurate affiliate attribution.
- `src/test/city-stays.test.tsx`: all 14 area counts, 4-image uniqueness per area, source URLs, sponsored flags, CTAs, and existing city-page journeys.

## Follow-up
Before production launch, consider sourcing **hotel-specific property photographs with explicit usage rights** and replacing the generic illustration assignments. Retest supplier inventory and relevant operating notices for the target travel period. The system deliberately does not show prices or assert availability.
