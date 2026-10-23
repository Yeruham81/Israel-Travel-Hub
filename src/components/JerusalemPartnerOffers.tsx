import { ProviderCard } from "@/components/Guide";
import { linksForPage } from "@/data/registry";
import type { TravelGuideId } from "@/data/registry";

/**
 * Reserved editorial-to-booking placements for approved affiliate/provider offers.
 * Do not render empty cards, fabricated prices, booking URLs or sample products.
 * Offers are enabled only by adding fully reviewed ProviderLink records to the
 * existing registry using these pageIds.
 */
const pageIds: Partial<Record<TravelGuideId, string>> = {
  jerusalem: "jerusalem-city-activities",
  jerusalemChurches: "jerusalem-church-guided-walks",
  jerusalemShopping: "jerusalem-market-experiences",
  jerusalemDayTrips: "jerusalem-departure-tours",
  bethlehem: "jerusalem-bethlehem-tours",
  jerusalemDeadSea: "jerusalem-deadsea-excursions",
};

export const jerusalemAffiliatePageIds = pageIds;

export function JerusalemPartnerOffers({ id }: { id: TravelGuideId }) {
  const pageId = pageIds[id];
  if (!pageId) return null;
  const offers = linksForPage(pageId);
  if (!offers.length) return null;
  return <section className="mt-12" aria-labelledby="jerusalem-partner-offers-h">
    <h2 id="jerusalem-partner-offers-h" className="text-2xl font-semibold sm:text-3xl">Tours, tickets and experiences</h2>
    <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">Check the operator, dates, inclusions, departure point, cancellation and current total on the provider's booking site. Sponsored offers are identified separately from my own transport services.</p>
    <ul className="mt-5 grid gap-4 sm:grid-cols-2">
      {offers.map(offer => <ProviderCard key={offer.id} link={offer} pageId={pageId} />)}
    </ul>
  </section>;
}
