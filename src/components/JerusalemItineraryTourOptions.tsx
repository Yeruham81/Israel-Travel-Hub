import { Clock3, ExternalLink, Star } from "lucide-react";
import { affiliateConfig } from "@/data/registry";
import { deadSeaTourCards, type DeadSeaTourCard } from "@/data/deadSeaTourOffers";
import { bethlehemTourCards, type BethlehemTourCard } from "@/data/bethlehemTourOffers";
import { recordOutboundClick, relFor } from "@/lib/outbound";

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
 * three-, five- and seven-day itineraries without duplicating catalog data.
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

function trackedItineraryTourUrl(url: string, tourId: string, days: 3 | 5 | 7): string {
  // Travelpayouts allows a short link's SubID to be replaced per source page.
  // Preserve the approved deep-link destination and partner attribution.
  const parsed = new URL(url);
  if (parsed.protocol === "https:" && parsed.hostname.endsWith(".tpm.li")) {
    parsed.searchParams.set("sub_id", `itt_${days}day_${tourId.replace(/[^a-z0-9]+/gi, "_")}`);
  }
  return parsed.toString();
}

/** Shares the compact Bethlehem/Dead Sea photo, duration, price and review-card visual language. */
export function JerusalemItineraryTourOptions({ days = 3 }: { days?: 3 | 5 | 7 }) {
  return <details
    className="group min-w-0 rounded-lg border bg-background"
    data-testid="itinerary-jerusalem-tours"
  >
    <summary className="flex cursor-pointer list-none items-center justify-between gap-3 rounded-lg px-4 py-3 font-semibold text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary [&::-webkit-details-marker]:hidden">
      <span>More day trips from Jerusalem</span>
      <span aria-hidden="true" className="shrink-0 text-sm text-muted-foreground transition-transform group-open:rotate-180">⌄</span>
    </summary>
    <div className="min-w-0 border-t px-4 pb-4 pt-3">
      <p className="text-sm leading-relaxed text-muted-foreground">
        Explore optional day trips from Jerusalem to Masada, the Dead Sea, Bethlehem, Jericho and the Jordan River, with choices for different interests, budgets and amounts of time.
      </p>
      <div className="mt-4 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {threeDayJerusalemTourSelections.map(item => {
          const tour = tourCatalog.get(item.id);
          const approvedLink = tour ? affiliateConfig[tour.id]?.trackingUrl : undefined;
          if (!tour || !approvedLink) return null;
          const groupRate = "priceUnit" in tour && tour.priceUnit === "group-up-to-four";
          return <a
            key={tour.id}
            data-testid="itinerary-jerusalem-tour-card"
            href={trackedItineraryTourUrl(approvedLink, tour.id, days)}
            target="_blank"
            rel={relFor(true)}
            onClick={() => recordOutboundClick({ pageId: `israel-itinerary-${days}-days`, productId: tour.id, offerId: tour.id })}
            className="group/card flex min-w-0 flex-col overflow-hidden rounded-xl border bg-card transition-all hover:-translate-y-0.5 hover:border-primary hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <img src={item.image} alt={item.alt} width={480} height={280} loading="lazy" decoding="async" className="h-40 w-full object-cover" />
            <span className="flex flex-1 flex-col p-3.5">
              <span className="text-[11px] font-semibold uppercase tracking-wide text-primary">{tour.provider}</span>
              <span className="mt-1 text-base font-semibold leading-snug text-foreground group-hover/card:text-primary">{tour.title}</span>
              <span className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">{tour.subtitle}</span>
              <span className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1"><Clock3 size={13} aria-hidden="true" />{tour.duration}</span>
                <span className="inline-flex items-center gap-1" aria-label={tour.rating + " out of 5 from " + tour.reviewCount + " reviews"}>
                  <Star size={13} className="fill-current text-amber-500" aria-hidden="true" />
                  <strong className="font-semibold text-foreground">{tour.rating.toFixed(1)}</strong>
                  <span>({tour.reviewCount.toLocaleString("en-US")})</span>
                </span>
              </span>
              <span className="mt-auto flex items-end justify-between gap-2 border-t pt-3 text-sm">
                <span>
                  <span className="text-xs text-muted-foreground">From</span>{" "}
                  <strong>US${tour.fromUsd}</strong>
                  <span className="block text-[11px] text-muted-foreground">{groupRate ? "per group (up to 4)" : "per person"}</span>
                </span>
                <span className="inline-flex items-center gap-1 font-semibold text-primary">View &amp; book <ExternalLink size={13} aria-hidden="true" /></span>
              </span>
            </span>
            <span className="sr-only"> (affiliate booking link; opens in a new tab)</span>
          </a>;
        })}
      </div>
    </div>
  </details>;
}
