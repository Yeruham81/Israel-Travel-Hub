import { Clock3, ExternalLink, Star } from "lucide-react";
import { affiliateConfig } from "@/data/registry";
import { deadSeaTourCards } from "@/data/deadSeaTourOffers";
import { recordOutboundClick, relFor } from "@/lib/outbound";
import beachMudPhoto from "@/assets/guides/dead-sea-excursions/dead-sea-mud-bathing.webp";
import masadaPalacePhoto from "@/assets/guides/dead-sea-excursions/masada-palace.webp";
import einGediPhoto from "@/assets/guides/dead-sea-excursions/ein-gedi-oasis.webp";
import saltShorePhoto from "@/assets/guides/dead-sea-excursions/dead-sea-salt-shore.webp";
import sunrisePhoto from "@/assets/guides/dead-sea-excursions/masada-snake-path.webp";

const tourPhotos = {
  "beach-mud": { src: beachMudPhoto, alt: "Dead Sea mud bathing on the shore" },
  "masada-palace": { src: masadaPalacePhoto, alt: "The ruins of Herod's palace at Masada" },
  "ein-gedi": { src: einGediPhoto, alt: "Desert oasis and natural scenery at Ein Gedi" },
  "salt-shore": { src: saltShorePhoto, alt: "Salt deposits on the Dead Sea shoreline" },
  sunrise: { src: sunrisePhoto, alt: "The Snake Path climbing toward Masada" },
} as const;

/** Compact manually curated cards, with vendor data separated from affiliate URLs.
 * The imported images are original files from the site's photo library, not
 * borrowed supplier product imagery. Each is used once within these cards.
 */
export function DeadSeaTourOptions() {
  return <>
    <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3" data-testid="deadsea-tour-options">
      {deadSeaTourCards.map(tour => {
        const trackingUrl = affiliateConfig[tour.id]?.trackingUrl;
        if (!trackingUrl) return null;
        const photo = tourPhotos[tour.photoId];
        return <a
          key={tour.id}
          href={trackingUrl}
          target="_blank"
          rel={relFor(true)}
          onClick={() => recordOutboundClick({ pageId: "jslm_dead_sea", productId: tour.id, offerId: tour.id })}
          className="group flex min-w-0 flex-col overflow-hidden rounded-xl border bg-card transition-all hover:-translate-y-0.5 hover:border-primary hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          data-testid="deadsea-bookable-tour"
        >
          <img src={photo.src} alt={photo.alt} width={480} height={280} loading="lazy" decoding="async" className="h-32 w-full object-cover" />
          <span className="flex flex-1 flex-col p-3.5">
            <span className="text-[11px] font-semibold uppercase tracking-wide text-primary">{tour.provider} · Jerusalem departure</span>
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
              <span><span className="text-xs text-muted-foreground">From</span> <strong>US${tour.fromUsd}</strong><span className="block text-[11px] text-muted-foreground">per person</span></span>
              <span className="inline-flex items-center gap-1 font-semibold text-primary">View & book <ExternalLink size={13} aria-hidden="true" /></span>
            </span>
          </span>
          <span className="sr-only"> (opens in a new tab)</span>
        </a>;
      })}
    </div>
    <p className="mt-2.5 text-xs leading-relaxed text-muted-foreground">Starting prices and ratings are indicative; select your date on the booking page for current offers.</p>
  </>;
}
