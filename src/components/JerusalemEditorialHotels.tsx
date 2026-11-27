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
    highlight: "Small Atlas boutique hotel with period-inspired décor in a pedestrian area.",
  },
  mamilla: {
    type: "Luxury hotel",
    location: "Beside Mamilla Avenue",
    highlight: "Contemporary luxury hotel near Jaffa Gate.",
  },
  "king-david": {
    type: "Historic luxury",
    location: "King David Street",
    highlight: "Historic luxury hotel with elegant interiors.",
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
    highlight: "Atlas boutique hotel with artistic décor near Mahane Yehuda Market and Downtown.",
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
    highlight: "Family-run hotel with traditional Arabesque interiors.",
  },
  orient: {
    type: "Luxury hotel",
    location: "Northern German Colony",
    highlight: "Modern comfort alongside restored heritage buildings.",
  },
  "rafael-residence": {
    type: "Apartment suites",
    location: "Bethlehem Road, Baka",
    highlight: "Spacious suites with living areas and kitchen facilities.",
  },
  // Tel Aviv: one concise distinction per locally sourced hotel choice.
  "tlv-dan": {
    type: "Classic beachfront luxury",
    location: "HaYarkon Street",
    highlight: "Established seafront hotel near Gordon and Frishman beaches.",
  },
  "tlv-royal-beach": {
    type: "Luxury beach hotel",
    location: "Central promenade",
    highlight: "Large Isrotel hotel near the southern end of Tel Aviv's central beachfront.",
  },
  "tlv-center-chic": {
    type: "Design boutique",
    location: "Dizengoff Square",
    highlight: "An Atlas hotel directly beside the square and its cafés.",
  },
  "tlv-dizengoff-garden": {
    type: "Small boutique hotel",
    location: "Dizengoff Street",
    highlight: "Small city hotel close to shops and restaurants.",
  },
  "tlv-shalom": {
    type: "Boutique hotel",
    location: "Independence Park",
    highlight: "Sea-adjacent Atlas hotel near northern beaches.",
  },
  "tlv-tal": {
    type: "Contemporary hotel",
    location: "Near Tel Aviv Port",
    highlight: "A convenient base for the port and Metzitzim Beach.",
  },
  "tlv-trieste": {
    type: "Heritage suites",
    location: "Near Neve Tzedek",
    highlight: "Independent suites in a restored low-rise building.",
  },
  "tlv-vera": {
    type: "Boutique hotel",
    location: "Lilienblum Street",
    highlight: "Stylish city base between Neve Tzedek and Rothschild.",
  },
  "tlv-setai": {
    type: "Luxury heritage hotel",
    location: "Jaffa's Clock Tower",
    highlight: "Luxury hotel in a restored historic building near Old Jaffa and the port.",
  },
  "tlv-margosa": {
    type: "Boutique hotel",
    location: "Near the flea market",
    highlight: "Small Jaffa hotel with cafés and historic streets nearby.",
  },
  "tlv-levinski-market": {
    type: "Urban hotel",
    location: "Levinsky Market",
    highlight: "A practical base for local food stalls and Florentin streets.",
  },
  "tlv-mulan": {
    type: "Small urban hotel",
    location: "Florentin area",
    highlight: "Small hotel in the lively Florentin neighbourhood.",
  },
  "tlv-carmel-beach-house": {
    type: "Guesthouse-style stay",
    location: "Carmel Market area",
    highlight: "Compact accommodation between the market and central beaches.",
  },
  "tlv-fabric": {
    type: "Design boutique",
    location: "Nahalat Binyamin",
    highlight: "Atlas boutique hotel on a lively pedestrian-shopping street.",
  },
  "tlv-rothschild22": {
    type: "Business boutique",
    location: "Rothschild Boulevard",
    highlight: "Urban hotel on the boulevard near restaurants and offices.",
  },
  "tlv-rothschild71": {
    type: "Historic boutique",
    location: "Rothschild Boulevard",
    highlight: "Restored city-centre building with a residential feel.",
  },
};

/** Short, single-line category labels for the 16 hotels actually shown in the Tel Aviv guide. */
const telAvivHotelTypeLabels: Record<string, string> = {
  "tlv-carlton": "Beachfront luxury",
  "tlv-embassy": "Retro boutique",
  "tlv-backstage": "Theatre boutique",
  "tlv-cinema": "Cinema boutique",
  "tlv-port-tower": "Contemporary hotel",
  "tlv-melody": "Boutique hotel",
  "tlv-elkonin": "Heritage luxury",
  "tlv-ruby": "Independent stay",
  "tlv-the-jaffa": "Heritage luxury",
  "tlv-market-house": "Boutique hotel",
  "tlv-albi-florentin": "Urban hotel",
  "tlv-florentin-house": "Urban boutique",
  "tlv-poli-house": "Design hotel",
  "tlv-assemblage": "Heritage boutique",
  "tlv-the-norman": "Luxury boutique",
  "tlv-65-rothschild": "Boutique hotel",
};

/** Two compact, entirely clickable cards with approved property-specific links. */
export function CityEditorialHotels({ area }: { area: NeighborhoodStayGuide }) {
  const cityId = area.cityId;
  const hotels = hotelsForArea(area.id, cityId).slice(0, 2);
  const bookings = linksForPage(`stay-area-${area.id}`);
  const pageId =
    cityId === "jerusalem" ? "guide-where-to-stay-jerusalem" : "guide-where-to-stay-tel-aviv";
  const prefix = cityId === "jerusalem" ? "jerusalem" : "telaviv";

  if (!hotels.length) return null;

  return (
    <section
      className="mt-5"
      aria-label={`Popular hotels in ${area.shortName}`}
      data-testid={`${prefix}-editorial-hotel-picks`}
    >
      <h4 className="text-lg font-semibold sm:text-xl">Popular hotels in {area.shortName}</h4>
      <ul className="mt-3 grid grid-cols-2 gap-3" data-testid={`${prefix}-editorial-hotel-grid`}>
        {hotels.map((hotel) => {
          const booking = bookings.find((offer) => offer.id === `hotel-${hotel.id}-expedia`);
          const details = hotelCardDetails[hotel.id] ?? {
            type: hotel.style,
            location: area.shortName,
            highlight: hotel.summary,
          };
          const categoryLabel =
            cityId === "telaviv"
              ? (telAvivHotelTypeLabels[hotel.id] ?? details.type)
              : details.type;
          const cardContent = (
            <>
              <span className="flex min-w-0 items-center gap-2">
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary"
                  aria-hidden="true"
                >
                  <Hotel className="h-4.5 w-4.5" />
                </span>
                <span
                  className="min-w-0 truncate whitespace-nowrap text-[10px] font-semibold uppercase leading-tight tracking-wide text-muted-foreground sm:text-xs"
                  data-testid="hotel-type"
                >
                  {categoryLabel}
                </span>
              </span>
              <h5 className="mt-2 text-sm font-bold leading-snug text-foreground sm:text-base">
                {hotel.name}
              </h5>
              <span
                className="mt-2 flex min-w-0 items-start gap-1 text-xs leading-snug text-muted-foreground"
                data-testid="hotel-location"
              >
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" aria-hidden />
                <span>{details.location}</span>
              </span>
              <span
                className="mt-2 line-clamp-2 flex-1 text-xs leading-relaxed text-muted-foreground"
                data-testid="hotel-highlight"
              >
                {details.highlight}
              </span>
              <span className="mt-3 inline-flex min-h-10 w-full items-center justify-center gap-1.5 rounded-lg border border-primary/30 bg-primary/5 px-2 py-2 text-center text-xs font-semibold text-primary transition-colors group-hover:border-primary/60 group-hover:bg-primary/10 sm:text-sm">
                {booking ? "Check rooms & rates" : "Explore area hotels"}
                <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden />
                {booking && <span className="sr-only"> (opens in a new tab)</span>}
              </span>
            </>
          );
          return (
            <li key={hotel.id} className="min-w-0" data-testid={`${prefix}-editorial-hotel-card`}>
              {booking ? (
                <a
                  href={hotelAffiliateUrl(booking, pageId, hotel.id)}
                  aria-label={`Check rooms and rates for ${hotel.name} on Expedia (opens in a new tab)`}
                  target="_blank"
                  rel={relFor(booking.isAffiliate)}
                  onClick={() =>
                    recordOutboundClick({ pageId, productId: hotel.id, offerId: booking.id })
                  }
                  className="group flex h-full min-w-0 flex-col rounded-xl border bg-card p-3 shadow-sm transition-all hover:border-primary/60 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:p-4"
                  data-testid={`${prefix}-editorial-hotel-link`}
                >
                  {cardContent}
                </a>
              ) : (
                <Link
                  to={area.path as LinkProps["to"]}
                  aria-label={`Explore hotels in ${area.shortName}, including ${hotel.name}`}
                  className="group flex h-full min-w-0 flex-col rounded-xl border bg-card p-3 shadow-sm transition-all hover:border-primary/60 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:p-4"
                  data-testid={`${prefix}-editorial-hotel-link`}
                >
                  {cardContent}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

/** Backwards-compatible export for existing Jerusalem consumers. */
export const JerusalemEditorialHotels = CityEditorialHotels;
