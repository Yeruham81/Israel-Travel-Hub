import { ArrowUpRight, Hotel, MapPin } from "lucide-react";
import { Link, type LinkProps } from "@tanstack/react-router";
import type { NeighborhoodStayGuide } from "@/data/content";
import { hotelsForArea, linksForPage } from "@/data/registry";
import { hotelAffiliateUrl } from "@/lib/hotel-affiliate";
import { recordOutboundClick, relFor } from "@/lib/outbound";

/**
 * Concise, sourced editorial distinctions for the 12 hotel picks featured in
 * the Jerusalem guide. These describe hotel type, location and character, not
 * live prices, availability, ratings or guaranteed room amenities.
 */
const hotelCardDetails: Record<string, { type: string; location: string; highlight: string }> = {
  "herbert-samuel": {
    type: "Upscale hotel",
    location: "Near Zion Square",
    highlight: "Central comfort with Jaffa Road and downtown cafés nearby.",
  },
  arthur: {
    type: "Boutique hotel",
    location: "Ben Yehuda area",
    highlight: "Intimate, period-inspired Atlas stay on pedestrian streets.",
  },
  mamilla: {
    type: "Luxury hotel",
    location: "Beside Mamilla Avenue",
    highlight: "Contemporary luxury on the approach to Jaffa Gate.",
  },
  "king-david": {
    type: "Historic luxury",
    location: "King David Street",
    highlight: "Landmark hotel with classic grand-hotel character.",
  },
  "new-imperial": {
    type: "Historic hotel",
    location: "Inside Jaffa Gate",
    highlight: "An Old City stay close to the Christian and Armenian quarters.",
  },
  "sephardic-house": {
    type: "Heritage hotel",
    location: "Jewish Quarter",
    highlight: "Heritage accommodation near the Hurva Synagogue.",
  },
  bezalel: {
    type: "Boutique hotel",
    location: "Nachlaot",
    highlight: "Art-focused Atlas stay close to the market and Downtown.",
  },
  "market-courtyard": {
    type: "Apartment suites",
    location: "By Mahane Yehuda",
    highlight: "Independent suites around a Jerusalem-stone courtyard.",
  },
  "american-colony": {
    type: "Historic luxury",
    location: "North of the Old City",
    highlight: "Distinctive heritage buildings and atmospheric courtyards.",
  },
  "jerusalem-hotel": {
    type: "Heritage hotel",
    location: "Near Nablus Road",
    highlight: "Family-run stay with Arabesque interiors and local character.",
  },
  orient: {
    type: "Luxury hotel",
    location: "Northern German Colony",
    highlight: "Modern comfort alongside restored heritage buildings.",
  },
  "rafael-residence": {
    type: "Apartment suites",
    location: "Bethlehem Road, Baka",
    highlight: "Residential suites with living space and kitchen facilities.",
  },
};

/** Two compact, entirely clickable cards with approved property-specific links. */
export function JerusalemEditorialHotels({ area }: { area: NeighborhoodStayGuide }) {
  const hotels = hotelsForArea(area.id, "jerusalem").slice(0, 2);
  const bookings = linksForPage(`stay-area-${area.id}`);
  const pageId = "guide-where-to-stay-jerusalem";

  if (!hotels.length) return null;

  return <section className="mt-5" aria-label={`Popular hotels in ${area.shortName}`} data-testid="jerusalem-editorial-hotel-picks">
    <h4 className="text-lg font-semibold sm:text-xl">Popular hotels in {area.shortName}</h4>
    <ul className="mt-3 grid grid-cols-2 gap-3" data-testid="jerusalem-editorial-hotel-grid">
      {hotels.map((hotel) => {
        const booking = bookings.find((offer) => offer.id === `hotel-${hotel.id}-expedia`);
        const details = hotelCardDetails[hotel.id] ?? {
          type: hotel.style,
          location: area.shortName,
          highlight: hotel.summary,
        };
        const cardContent = <>
          <span className="flex min-w-0 items-center gap-2">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary" aria-hidden="true">
              <Hotel className="h-4.5 w-4.5" />
            </span>
            <span className="min-w-0 text-[10px] font-semibold uppercase leading-tight tracking-wide text-muted-foreground sm:text-xs" data-testid="hotel-type">
              {details.type}
            </span>
          </span>
          <h5 className="mt-2 text-sm font-bold leading-snug text-foreground sm:text-base">{hotel.name}</h5>
          <span className="mt-2 flex min-w-0 items-start gap-1 text-xs leading-snug text-muted-foreground" data-testid="hotel-location">
            <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" aria-hidden />
            <span>{details.location}</span>
          </span>
          <span className="mt-2 line-clamp-2 flex-1 text-xs leading-relaxed text-muted-foreground" data-testid="hotel-highlight">
            {details.highlight}
          </span>
          <span className="mt-3 inline-flex min-h-10 w-full items-center justify-center gap-1.5 rounded-lg border border-primary/30 bg-primary/5 px-2 py-2 text-center text-xs font-semibold text-primary transition-colors group-hover:border-primary/60 group-hover:bg-primary/10 sm:text-sm">
            {booking ? "Check rooms & rates" : "Explore area hotels"}
            <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden />
            {booking && <span className="sr-only"> (opens in a new tab)</span>}
          </span>
        </>;
        return <li key={hotel.id} className="min-w-0" data-testid="jerusalem-editorial-hotel-card">
          {booking ? <a
            href={hotelAffiliateUrl(booking, pageId, hotel.id)}
            target="_blank"
            rel={relFor(booking.isAffiliate)}
            onClick={() => recordOutboundClick({ pageId, productId: hotel.id, offerId: booking.id })}
            className="group flex h-full min-w-0 flex-col rounded-xl border bg-card p-3 shadow-sm transition-all hover:border-primary/60 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:p-4"
            data-testid="jerusalem-editorial-hotel-link"
          >{cardContent}</a> : <Link
            to={area.path as LinkProps["to"]}
            className="group flex h-full min-w-0 flex-col rounded-xl border bg-card p-3 shadow-sm transition-all hover:border-primary/60 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:p-4"
            data-testid="jerusalem-editorial-hotel-link"
          >{cardContent}</Link>}
        </li>;
      })}
    </ul>
  </section>;
}
