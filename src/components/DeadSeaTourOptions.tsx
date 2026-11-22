import { ExternalProviderTourCard } from "@/components/ExternalProviderTourCard";
import { affiliateConfig } from "@/data/registry";
import { deadSeaTourCards } from "@/data/deadSeaTourOffers";
import { recordAffiliateTourClick } from "@/lib/tour-analytics";
import beachMudPhoto from "@/assets/guides/dead-sea-excursions/dead-sea-mud-bathing.webp";
import masadaPalacePhoto from "@/assets/guides/dead-sea-excursions/masada-palace.webp";
import einGediPhoto from "@/assets/guides/dead-sea-excursions/ein-gedi-oasis.webp";
import saltShorePhoto from "@/assets/guides/dead-sea-excursions/dead-sea-salt-shore.webp";
import sunrisePhoto from "@/assets/guides/dead-sea-excursions/masada-snake-path.webp";
import jordanRiverPhoto from "@/assets/guides/dead-sea-excursions/jordan-river-qasr-al-yahud.webp";

const tourPhotos = {
  "beach-mud": { src: beachMudPhoto, alt: "Dead Sea mud bathing on the shore" },
  "masada-palace": { src: masadaPalacePhoto, alt: "The ruins of Herod's palace at Masada" },
  "ein-gedi": { src: einGediPhoto, alt: "Desert oasis and natural scenery at Ein Gedi" },
  "salt-shore": { src: saltShorePhoto, alt: "Salt deposits on the Dead Sea shoreline" },
  sunrise: { src: sunrisePhoto, alt: "The Snake Path climbing toward Masada" },
  "jordan-river": { src: jordanRiverPhoto, alt: "The Jordan River and palms at Qasr al-Yahud baptismal site" },
} as const;

/** Compact manually curated cards, with vendor data separated from affiliate URLs.
 * The imported images are original files from the site's photo library, not
 * borrowed supplier product imagery. Each is used once within these cards.
 */
export function DeadSeaTourOptions({ selectedIds, pageId = "jslm_dead_sea" }: { selectedIds?: readonly string[]; pageId?: string } = {}) {
  return <>
    <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" data-testid="deadsea-tour-options">
      {deadSeaTourCards.filter(tour => !selectedIds || selectedIds.includes(tour.id)).map(tour => {
        const trackingUrl = affiliateConfig[tour.id]?.trackingUrl;
        if (!trackingUrl) return null;
        const photo = tourPhotos[tour.photoId];
        return <ExternalProviderTourCard
          key={tour.id} testId="deadsea-bookable-tour"
          image={photo.src} alt={photo.alt} platform={tour.provider}
          title={tour.title} description={tour.subtitle} duration={tour.duration}
          rating={{ value: tour.rating, count: tour.reviewCount }}
          price={{ amount: tour.fromUsd, currency: "USD", basis: "per_person" }}
          href={trackingUrl}
          onClick={() => recordAffiliateTourClick({ pageId, productId: tour.id, offerId: tour.id, provider: tour.provider, linkUrl: trackingUrl })}
        />;
      })}
    </div>
    <p className="mt-2.5 text-xs leading-relaxed text-muted-foreground">Prices, ratings and availability may change. Check the latest details before booking.</p>
  </>;
}
