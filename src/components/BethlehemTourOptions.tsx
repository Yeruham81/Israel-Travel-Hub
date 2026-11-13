import { Clock3, ExternalLink, Star } from "lucide-react";
import { affiliateConfig } from "@/data/registry";
import { bethlehemTourCards } from "@/data/bethlehemTourOffers";
import { recordOutboundClick, relFor } from "@/lib/outbound";
import nativityInterior from "@/assets/guides/dead-sea-excursions/bethlehem-nativity.webp";
import catholicGrottos from "@/assets/guides/bethlehem/catholic-grottos.jpg";
import jordanRiver from "@/assets/guides/dead-sea-excursions/jordan-river-qasr-al-yahud.webp";
import mangerSquare from "@/assets/guides/bethlehem/manger-square.jpg";
import bethlehemView from "@/assets/home/bethlehem-nativity.webp";
import milkGrotto from "@/assets/guides/bethlehem/milk-grotto.jpg";

const tourPhotos = {
  "nativity-interior": { src: nativityInterior, alt: "Interior of the Church of the Nativity in Bethlehem" },
  "catholic-grottos": { src: catholicGrottos, alt: "The Catholic grottos below Bethlehem's Church of the Nativity" },
  "jordan-river": { src: jordanRiver, alt: "Pilgrimage site beside the Jordan River" },
  "manger-square": { src: mangerSquare, alt: "Christmas decorations and historic buildings in Bethlehem’s Manger Square" },
  bethlehem: { src: bethlehemView, alt: "Church of the Nativity and surrounding Bethlehem buildings" },
  "milk-grotto": { src: milkGrotto, alt: "Stone arches and religious interior at the Milk Grotto in Bethlehem" },
} as const;

/** Same compact price, duration and review cards as the Dead Sea guide.
 * Only publisher-approved product deeplinks can appear as booking cards.
 */
export function BethlehemTourOptions() {
  return <section aria-labelledby="bethlehem-tour-options-h" className="mt-6 scroll-mt-24" data-testid="bethlehem-tour-options">
    <h3 id="bethlehem-tour-options-h" className="text-2xl font-semibold">Compare tours starting in Jerusalem</h3>
    <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">Half-day tours focus on Bethlehem, while longer excursions add Jerusalem or Jericho. Tour operators may change their prices; the booking pages below show the final price, meeting point and inclusions for your selected date.</p>
    <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {bethlehemTourCards.map(tour => {
        const url = affiliateConfig[tour.id]?.trackingUrl;
        if (!url) return null;
        const photo = tourPhotos[tour.photoId];
        const groupRate = tour.priceUnit === "group-up-to-four";
        return <a
          key={tour.id}
          data-testid="bethlehem-tour-card"
          href={url}
          target="_blank"
          rel={relFor(true)}
          onClick={() => recordOutboundClick({ pageId: "jslm_bethlehem", productId: tour.id, offerId: tour.id })}
          className="group flex min-w-0 flex-col overflow-hidden rounded-xl border bg-card transition-all hover:-translate-y-0.5 hover:border-primary hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <img src={photo.src} alt={photo.alt} width={480} height={280} loading="lazy" decoding="async" className="h-40 w-full object-cover" />
          <span className="flex flex-1 flex-col p-3.5">
            <span className="text-[11px] font-semibold uppercase tracking-wide text-primary">{tour.provider}</span>
            <span className="mt-1 text-base font-semibold leading-snug text-foreground group-hover:text-primary">{tour.title}</span>
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
              <span><span className="text-xs text-muted-foreground">From</span> <strong>US${tour.fromUsd}</strong><span className="block text-[11px] text-muted-foreground">{groupRate ? "per group (up to 4)" : "per person"}</span></span>
              <span className="inline-flex items-center gap-1 font-semibold text-primary">View & book <ExternalLink size={13} aria-hidden="true" /></span>
            </span>
          </span>
          <span className="sr-only"> (opens in a new tab)</span>
        </a>;
      })}
    </div>
  </section>;
}
