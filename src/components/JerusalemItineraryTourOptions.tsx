import { ExternalProviderTourCard } from "@/components/ExternalProviderTourCard";
import { affiliateConfig } from "@/data/registry";
import { deadSeaTourCards, type DeadSeaTourCard } from "@/data/deadSeaTourOffers";
import { bethlehemTourCards, type BethlehemTourCard } from "@/data/bethlehemTourOffers";
import { recordOutboundClick } from "@/lib/outbound";

import deadSeaMud from "@/assets/guides/dead-sea-excursions/dead-sea-mud-bathing.webp";
import masadaPalace from "@/assets/guides/dead-sea-excursions/masada-palace.webp";
import bethlehemNativity from "@/assets/guides/dead-sea-excursions/bethlehem-nativity.webp";
import bethlehemGrottos from "@/assets/guides/bethlehem/catholic-grottos.jpg";
import jordanRiver from "@/assets/guides/dead-sea-excursions/jordan-river-qasr-al-yahud.webp";
import qasrAlYahud from "@/assets/guides/dead-sea-excursions/qasr-al-yahud.webp";

/**
 * Reuses the exact approved products, editorial price/review snapshots and
 * provider-specific affiliate links already used in the Bethlehem and Dead Sea
 * guides. No tour price, rating or availability is retrieved or invented here.
 *
 * Show a balanced choice of OPTIONAL day trips from Jerusalem, on the
 * three-, five-, seven- and ten-day itineraries without duplicating catalog data.
 */
export const threeDayJerusalemTourSelections = [
  { id: "jslm-deadsea-beach-viator", area: "Dead Sea", image: deadSeaMud, alt: "Mud bathing on the Dead Sea shore" },
  { id: "jslm-deadsea-masada-viator", area: "Masada & Dead Sea", image: masadaPalace, alt: "Ancient ruins at Masada" },
  { id: "jslm-bethlehem-halfday-viator", area: "Bethlehem", image: bethlehemNativity, alt: "Inside the Church of the Nativity in Bethlehem" },
  { id: "jslm-bethlehem-halfday-gyg", area: "Bethlehem", image: bethlehemGrottos, alt: "Catholic grottos beneath the Church of the Nativity" },
  { id: "jslm-bethlehem-jericho-viator", area: "Jericho & Bethlehem", image: jordanRiver, alt: "Jordan River baptism area near Jericho" },
  { id: "jslm-deadsea-jericho-jordan-viator", area: "Jericho & Dead Sea", image: qasrAlYahud, alt: "Qasr al-Yahud baptism site on the Jordan River" },
] as const;

const tourCatalog = new Map<string, DeadSeaTourCard | BethlehemTourCard>(
  [...deadSeaTourCards, ...bethlehemTourCards].map(tour => [tour.id, tour] as const),
);

function trackedItineraryTourUrl(url: string, tourId: string, days: 3 | 5 | 7 | 10): string {
  // Travelpayouts allows a short link's SubID to be replaced per source page.
  // Preserve the approved deep-link destination and partner attribution.
  const parsed = new URL(url);
  if (parsed.protocol === "https:" && parsed.hostname.endsWith(".tpm.li")) {
    parsed.searchParams.set("sub_id", `itt_${days}day_${tourId.replace(/[^a-z0-9]+/gi, "_")}`);
  }
  return parsed.toString();
}

/** Shares the compact Bethlehem/Dead Sea photo, duration, price and review-card visual language. */
export function JerusalemItineraryTourOptions({ days = 3 }: { days?: 3 | 5 | 7 | 10 }) {
  return <details
    className="group min-w-0 rounded-lg border bg-background"
    data-testid="itinerary-jerusalem-tours"
  >
    <summary className="flex cursor-pointer list-none items-center justify-between gap-3 rounded-lg px-4 py-3 font-semibold text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary [&::-webkit-details-marker]:hidden">
      <span>Alternative day tours from Jerusalem</span>
      <span aria-hidden="true" className="shrink-0 text-sm text-muted-foreground transition-transform group-open:rotate-180">⌄</span>
    </summary>
    <div className="min-w-0 border-t px-4 pb-4 pt-3">
      <p className="text-sm leading-relaxed text-muted-foreground">
        {days === 7
          ? "These tours replace a planned excursion; they are not extra stops to add to an already full day. For example, choose a Bethlehem or Jericho outing instead of the Jerusalem programme on Day 2, or a Masada and Dead Sea tour in place of the independent Day 3 desert plan."
          : days === 10
          ? "These day tours are alternatives to the independent itinerary, not additional sightseeing stops. Choose a Bethlehem or Jericho excursion in place of Jerusalem sightseeing on Day 2, or a Masada and Dead Sea tour instead of the self-planned desert day on Day 3."
          : "These tours replace part or all of a planned sightseeing day; they are not additional stops. For example, a Masada and Dead Sea tour replaces your independent desert programme, while a Bethlehem or Jericho visit needs a separate Jerusalem day. Compare routes, meeting points and time at the sites."}
      </p>
      <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {threeDayJerusalemTourSelections.map(item => {
          const tour = tourCatalog.get(item.id);
          const approvedLink = tour ? affiliateConfig[tour.id]?.trackingUrl : undefined;
          if (!tour || !approvedLink) return null;
          const groupRate = "priceUnit" in tour && tour.priceUnit === "group-up-to-four";
          return <ExternalProviderTourCard
            key={tour.id} testId="itinerary-jerusalem-tour-card"
            image={item.image} alt={item.alt} platform={tour.provider}
            title={tour.title} description={tour.subtitle} duration={tour.duration}
            rating={{ value: tour.rating, count: tour.reviewCount }}
            price={{ amount: tour.fromUsd, currency: "USD", basis: groupRate ? "per_group" : "per_person", maxPartySize: groupRate ? 4 : undefined }}
            href={trackedItineraryTourUrl(approvedLink, tour.id, days)}
            onClick={() => recordOutboundClick({ pageId: `israel-itinerary-${days}-days`, productId: tour.id, offerId: tour.id })}
          />;
        })}
      </div>
      <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
        These tours are operated by independent providers and booked through their own platforms. Tour details, availability, prices and booking conditions are set by the operators and may change. Before booking, check the departure date and location, itinerary, guiding, walking requirements, admissions, meeting and return arrangements, and cancellation policy directly with the booking provider.
      </p>
    </div>
  </details>;
}
