import { ArrowUpRight, Hotel } from "lucide-react";
import { Link, type LinkProps } from "@tanstack/react-router";
import type { NeighborhoodStayGuide } from "@/data/content";
import { cityHotelPhoto } from "@/data/cityHotelCatalog";
import { jerusalemHotelTileCopy } from "@/components/JerusalemHotelBrowser";
import { hotelsForArea, linksForPage } from "@/data/registry";
import { hotelAffiliateUrl } from "@/lib/hotel-affiliate";
import { recordOutboundClick, relFor } from "@/lib/outbound";

/**
 * Two compact, verified editorial picks, not a second full hotel catalogue.
 * Booking links reuse the exact approved property offer and source-page SubID.
 * Images are surrounding-area illustrations, not photos of the properties.
 */
export function JerusalemEditorialHotels({ area }: { area: NeighborhoodStayGuide }) {
  const hotels = hotelsForArea(area.id, "jerusalem").slice(0, 2);
  const bookings = linksForPage(`stay-area-${area.id}`);
  const pageId = "guide-where-to-stay-jerusalem";

  if (!hotels.length) return null;

  return <section className="mt-7" aria-label={`Popular hotels in ${area.shortName}`} data-testid="jerusalem-editorial-hotel-picks">
    <div className="flex items-center gap-2.5">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
        <Hotel className="h-5 w-5" aria-hidden />
      </span>
      <h4 className="text-lg font-semibold sm:text-xl">Popular hotels in {area.shortName}</h4>
    </div>
    <ul className="mt-3 grid gap-3 sm:grid-cols-2">
      {hotels.map((hotel) => {
        const photo = cityHotelPhoto(hotel);
        const booking = bookings.find((offer) => offer.id === `hotel-${hotel.id}-expedia`);
        const copy = jerusalemHotelTileCopy[hotel.id];
        return <li key={hotel.id} className="min-w-0" data-testid="jerusalem-editorial-hotel-card">
          <div className="flex h-full min-w-0 overflow-hidden rounded-xl border bg-card shadow-sm transition-colors hover:border-primary/50">
            <img
              src={photo.src}
              alt={`Illustrative neighbourhood view: ${photo.alt}`}
              width={165} height={185} loading="lazy" decoding="async"
              className="w-24 shrink-0 object-cover sm:w-28"
            />
            <div className="flex min-w-0 flex-1 flex-col p-3">
              <h5 className="text-sm font-bold leading-snug text-foreground sm:text-base">{hotel.name}</h5>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{hotel.style}</p>
              <p className="mt-1.5 line-clamp-2 flex-1 text-xs leading-relaxed text-muted-foreground">
                {copy?.description ?? hotel.summary}
              </p>
              {booking ? <a
                href={hotelAffiliateUrl(booking, pageId, hotel.id)}
                target="_blank" rel={relFor(booking.isAffiliate)}
                onClick={() => recordOutboundClick({ pageId, productId: hotel.id, offerId: booking.id })}
                aria-label={`View ${hotel.name} on Expedia (opens in a new tab)`}
                className="mt-2 inline-flex min-h-9 items-center gap-1.5 self-start text-sm font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                data-testid="jerusalem-editorial-hotel-link"
              >View hotel <ArrowUpRight className="h-4 w-4" aria-hidden /></a>
              : <Link
                to={area.path as LinkProps["to"]}
                className="mt-2 inline-flex min-h-9 items-center gap-1.5 self-start text-sm font-semibold text-primary hover:underline"
              >Explore area hotels <ArrowUpRight className="h-4 w-4" aria-hidden /></Link>}
            </div>
          </div>
        </li>;
      })}
    </ul>
    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">Photos illustrate the surrounding neighbourhoods, not the hotels themselves.</p>
  </section>;
}
