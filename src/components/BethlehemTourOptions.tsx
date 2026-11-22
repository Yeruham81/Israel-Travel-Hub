import { ExternalProviderTourCard } from "@/components/ExternalProviderTourCard";
import { affiliateConfig } from "@/data/registry";
import { bethlehemTourCards } from "@/data/bethlehemTourOffers";
import { recordOutboundClick } from "@/lib/outbound";
import nativityInterior from "@/assets/guides/dead-sea-excursions/bethlehem-nativity.webp";
import catholicGrottos from "@/assets/guides/bethlehem/catholic-grottos.jpg";
import jordanRiver from "@/assets/guides/dead-sea-excursions/jordan-river-qasr-al-yahud.webp";
import eastJerusalem from "@/assets/jerusalem/east-jerusalem.webp";
import shepherdsFieldChapel from "@/assets/guides/bethlehem/shepherds-field-chapel.webp";
import bethlehemView from "@/assets/home/bethlehem-nativity.webp";


const tourPhotos = {
  "nativity-interior": { src: nativityInterior, alt: "Interior of the Church of the Nativity in Bethlehem" },
  "catholic-grottos": { src: catholicGrottos, alt: "The Catholic grottos below Bethlehem's Church of the Nativity" },
  "jordan-river": { src: jordanRiver, alt: "Pilgrimage site beside the Jordan River" },
  "jerusalem-damascus-gate": { src: eastJerusalem, alt: "Damascus Gate in East Jerusalem, a departure area for Bethlehem tours" },
  bethlehem: { src: bethlehemView, alt: "Church of the Nativity and surrounding Bethlehem buildings" },
  "shepherds-field": { src: shepherdsFieldChapel, alt: "Shepherds’ Field Chapel mural in Beit Sahour near Bethlehem" },
} as const;

/** Same compact price, duration and review cards as the Dead Sea guide.
 * Only publisher-approved product deeplinks can appear as booking cards.
 */
export function BethlehemTourOptions() {
  return <section aria-labelledby="bethlehem-tour-options-h" className="mt-6 scroll-mt-24" data-testid="bethlehem-tour-options">
    <h3 id="bethlehem-tour-options-h" className="text-2xl font-semibold">Compare tours starting in Jerusalem</h3>
    <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">Prices and availability can change. Before booking, confirm your departure point, itinerary, what's included and cancellation terms.</p>
    <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {bethlehemTourCards.map(tour => {
        const url = affiliateConfig[tour.id]?.trackingUrl;
        if (!url) return null;
        const photo = tourPhotos[tour.photoId];
        const groupRate = tour.priceUnit === "group-up-to-four";
        return <ExternalProviderTourCard
          key={tour.id} testId="bethlehem-tour-card"
          image={photo.src} alt={photo.alt} platform={tour.provider}
          title={tour.title} description={tour.subtitle} duration={tour.duration}
          rating={{ value: tour.rating, count: tour.reviewCount }}
          price={{ amount: tour.fromUsd, currency: "USD", basis: groupRate ? "per_group" : "per_person", maxPartySize: groupRate ? 4 : undefined }}
          href={url}
          onClick={() => recordOutboundClick({ pageId: "jslm_bethlehem", productId: tour.id, offerId: tour.id })}
        />;
      })}
    </div>
    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
      Shepherds’ Field Chapel photo: <a href="https://commons.wikimedia.org/wiki/File:Shepherds_Field_Chapel,_Roman_Catholic_(Beit_Sahour)-interior_(2).jpg" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">Armineaghayan / Wikimedia Commons</a> · <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">CC BY-SA 4.0</a> (resized).
    </p>
  </section>;
}
