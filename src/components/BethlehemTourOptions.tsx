import { ExternalLink } from "lucide-react";
import { affiliateConfig } from "@/data/registry";
import { bethlehemTourCards } from "@/data/bethlehemTourOffers";
import { recordOutboundClick, relFor } from "@/lib/outbound";
import nativityInterior from "@/assets/guides/dead-sea-excursions/bethlehem-nativity.webp";
import bethlehemView from "@/assets/home/bethlehem-nativity.webp";
import jordanRiver from "@/assets/guides/dead-sea-excursions/jordan-river-qasr-al-yahud.webp";

const photos = {
  "nativity-interior": { src: nativityInterior, alt: "Interior of the Church of the Nativity in Bethlehem" },
  bethlehem: { src: bethlehemView, alt: "Church of the Nativity and Bethlehem buildings" },
  "jordan-river": { src: jordanRiver, alt: "Pilgrimage site on the Jordan River at Qasr al-Yahud" },
};

/** Product-specific, editorially checked listings; no invented inventory or rates. */
export function BethlehemTourOptions() {
  return <section aria-labelledby="bethlehem-tour-options-h" className="mt-8 scroll-mt-24" data-testid="bethlehem-tour-options">
    <h3 id="bethlehem-tour-options-h" className="text-2xl font-semibold">Compare Bethlehem tours departing from Jerusalem</h3>
    <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">Choose a half-day group visit, a private itinerary or a longer Bethlehem–Jericho tour. Product descriptions are not live schedules. Check your date, entry eligibility, actual pickup and included visits before booking.</p>
    <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {bethlehemTourCards.map(tour => {
        const tracking = affiliateConfig[tour.id]?.trackingUrl;
        const photo = photos[tour.photoId];
        return <a
          key={tour.id}
          data-testid="bethlehem-tour-card"
          href={tracking || tour.publicUrl}
          target="_blank"
          rel={relFor(Boolean(tracking))}
          onClick={() => recordOutboundClick({ pageId: "jerusalem-to-bethlehem", productId: tour.id, offerId: tour.provider })}
          className="group flex h-full min-w-0 flex-col overflow-hidden rounded-xl border bg-card transition-colors hover:border-primary hover:shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <img src={photo.src} alt={photo.alt} width={600} height={380} loading="lazy" decoding="async" className="aspect-[3/2] w-full object-cover" />
          <div className="flex flex-1 flex-col p-4">
            <p className="text-xs font-semibold text-primary">{tour.provider} · {tour.format}</p>
            <h4 className="mt-2 text-lg font-bold leading-snug group-hover:text-primary">{tour.title}</h4>
            <p className="mt-2 text-xs font-semibold text-muted-foreground">{tour.duration}</p>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{tour.description}</p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">View tour details <ExternalLink className="h-4 w-4" aria-hidden /></span>
            <span className="sr-only">(opens in a new tab)</span>
          </div>
        </a>;
      })}
    </div>
    <p className="mt-3 text-xs leading-relaxed text-muted-foreground">These links lead to named supplier listings, not confirmed departures or live price quotes. A link is used for affiliate tracking only when an approved product-specific URL is configured.</p>
  </section>;
}
