import { ArrowUpRight, Hotel } from "lucide-react";
import { Link, type LinkProps } from "@tanstack/react-router";
import type { NeighborhoodStayGuide } from "@/data/content";
import { jerusalemHotelTileCopy } from "@/components/JerusalemHotelBrowser";
import { hotelsForArea, linksForPage } from "@/data/registry";
import { hotelAffiliateUrl } from "@/lib/hotel-affiliate";
import { recordOutboundClick, relFor } from "@/lib/outbound";

/** Compact, editorial hotel picks with existing approved referral destinations. */
export function JerusalemEditorialHotels({ area }: { area: NeighborhoodStayGuide }) {
  const hotels = hotelsForArea(area.id, "jerusalem").slice(0, 2);
  const bookings = linksForPage(`stay-area-${area.id}`);
  const pageId = "guide-where-to-stay-jerusalem";

  if (!hotels.length) return null;

  return <section className="mt-5" aria-label={`Popular hotels in ${area.shortName}`} data-testid="jerusalem-editorial-hotel-picks">
    <div className="flex items-center gap-2.5">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
        <Hotel className="h-5 w-5" aria-hidden />
      </span>
      <h4 className="text-lg font-semibold sm:text-xl">Popular hotels in {area.shortName}</h4>
    </div>
    <ul className="mt-3 grid grid-cols-2 gap-3" data-testid="jerusalem-editorial-hotel-grid">
      {hotels.map((hotel) => {
        const booking = bookings.find((offer) => offer.id === `hotel-${hotel.id}-expedia`);
        const copy = jerusalemHotelTileCopy[hotel.id];
        return <li key={hotel.id} className="min-w-0" data-testid="jerusalem-editorial-hotel-card">
          <div className="flex h-full min-w-0 flex-col rounded-xl border bg-card p-3 shadow-sm transition-colors hover:border-primary/50 sm:p-4">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary" aria-hidden="true">
              <Hotel className="h-5 w-5" />
            </span>
            <h5 className="mt-2 text-sm font-bold leading-snug text-foreground sm:text-base">{hotel.name}</h5>
            <p className="mt-1 line-clamp-2 flex-1 text-xs leading-relaxed text-muted-foreground">
              {copy?.description ?? hotel.summary}
            </p>
            {booking ? <a
              href={hotelAffiliateUrl(booking, pageId, hotel.id)}
              target="_blank" rel={relFor(booking.isAffiliate)}
              onClick={() => recordOutboundClick({ pageId, productId: hotel.id, offerId: booking.id })}
              aria-label={`View ${hotel.name} on Expedia (opens in a new tab)`}
              className="mt-2 inline-flex min-h-9 items-center gap-1 self-start text-xs font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:text-sm"
              data-testid="jerusalem-editorial-hotel-link"
            >View hotel <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden /></a>
            : <Link
              to={area.path as LinkProps["to"]}
              className="mt-2 inline-flex min-h-9 items-center gap-1 self-start text-xs font-semibold text-primary hover:underline sm:text-sm"
            >Explore area hotels <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden /></Link>}
          </div>
        </li>;
      })}
    </ul>
  </section>;
}
