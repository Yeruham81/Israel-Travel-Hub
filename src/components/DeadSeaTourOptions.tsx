import { Link } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import { affiliateConfig } from "@/data/registry";
import { recordOutboundClick, relFor } from "@/lib/outbound";
import deadSeaBeach from "@/assets/dead-sea/beach.webp";
import masadaDeadSea from "@/assets/home/masada-dead-sea.webp";
import einGedi from "@/assets/dead-sea/ein-gedi.webp";
import deadSeaLandscape from "@/assets/dead-sea/landscape.webp";

/** Real Jerusalem-departure product pages, checked on Viator in November 2026.
 * The provider's own listing controls dates and the actual beach visited.
 * Local editorial imagery represents the destination, not the tour vehicles.
 * Affiliate URLs come only from the Travelpayouts API-generated registry.
 */
const tours = [
  {
    id: "jslm-deadsea-beach-viator",
    title: "Dead Sea beach half-day trip",
    type: "Beach-only excursion",
    provider: "Viator",
    description: "Return transport from central Jerusalem and several hours at a Dead Sea bathing beach, without a separate sightseeing stop.",
    photo: deadSeaBeach,
    alt: "Dead Sea water and shoreline",
  },
  {
    id: "jslm-deadsea-masada-viator",
    title: "Masada and the Dead Sea",
    type: "History and beach",
    provider: "Viator",
    description: "A full-day coach tour combining the Masada fortress and time at a Dead Sea beach.",
    photo: masadaDeadSea,
    alt: "Masada plateau and Dead Sea landscape",
  },
  {
    id: "jslm-deadsea-masada-eingedi-viator",
    title: "Masada, Ein Gedi and the Dead Sea",
    type: "Three stops in one day",
    provider: "Viator",
    description: "A full-day trip from Jerusalem covering the archaeological site, desert oasis and a bathing stop.",
    photo: einGedi,
    alt: "Green oasis landscape at Ein Gedi",
  },
] as const;

export function DeadSeaTourOptions() {
  return <div className="mt-6 grid gap-4 sm:grid-cols-2" data-testid="deadsea-tour-options">
    <article className="flex min-w-0 flex-col overflow-hidden rounded-2xl border bg-card" data-testid="deadsea-moshe-tour">
      <img src={deadSeaLandscape} alt="Desert hills above the Dead Sea" width={600} height={400} loading="lazy" decoding="async" className="aspect-[3/2] w-full object-cover" />
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-semibold text-primary">Private day tour · Moshe Barak</p>
        <h3 className="mt-2 text-xl font-semibold">Private Masada & Dead Sea day trip</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">A private car and driver from Jerusalem, with flexible pickup and stops. Published weekday price starts at ₪2,100 for up to four travellers; admission, guiding and meals are extra.</p>
        <Link to="/tours/masada-dead-sea/" className="btn btn-primary mt-4 inline-flex w-fit items-center gap-2">View private tour and price <ExternalLink className="h-4 w-4" aria-hidden="true" /></Link>
      </div>
    </article>
    {tours.map(tour => {
      const trackingUrl = affiliateConfig[tour.id]?.trackingUrl;
      if (!trackingUrl) return null;
      return <article key={tour.id} className="flex min-w-0 flex-col overflow-hidden rounded-2xl border bg-card" data-testid="deadsea-bookable-tour">
        <img src={tour.photo} alt={tour.alt} width={600} height={400} loading="lazy" decoding="async" className="aspect-[3/2] w-full object-cover" />
        <div className="flex flex-1 flex-col p-5">
          <p className="text-xs font-semibold text-primary">{tour.type} · {tour.provider}</p>
          <h3 className="mt-2 text-xl font-semibold">{tour.title}</h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{tour.description}</p>
          <a href={trackingUrl} target="_blank" rel={relFor(true)}
            onClick={() => recordOutboundClick({ pageId: "jslm_dead_sea", productId: tour.id, offerId: tour.id })}
            className="btn btn-primary mt-4 inline-flex w-fit items-center gap-2">
            View dates and book <ExternalLink className="h-4 w-4" aria-hidden="true" />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
      </article>;
    })}
  </div>;
}
