import { useState } from "react";
import { Link, type LinkProps } from "@tanstack/react-router";
import { ArrowRight, ExternalLink, RotateCcw } from "lucide-react";
import { telAvivAreaGuides } from "@/data/content";
import { linksForPage, type HotelRecommendation } from "@/data/registry";
import { cityHotelPhoto, hotelsInCityCatalog } from "@/data/cityHotelCatalog";
import { activeHotelNotice } from "@/lib/hotel-notices";
import { recordOutboundClick, relFor } from "@/lib/outbound";
import { hotelAffiliateUrl, hotelBrowseAffiliateUrl } from "@/lib/hotel-affiliate";

/**
 * Editorial catalogue, not a live hotel search. Reuses the checked property
 * recommendations and configured booking offers from every neighborhood page.
 */
export const telAvivHotelCatalog = hotelsInCityCatalog("telaviv");

/**
 * Short, property-specific card copy, derived from the existing editorial records.
 * The full descriptions, conditions and practical considerations stay in area guides.
 */
export const hotelTileCopy: Record<string, { description: string; bestFor: string }> = {
  "tlv-carlton": { description: "Seafront hotel near Gordon Beach and the marina, with easy access to the promenade.", bestFor: "Coastal luxury stays" },
  "tlv-embassy": { description: "Retro-inspired boutique stay near the central beach and HaYarkon Street.", bestFor: "Beach-loving independent travelers" },
  "tlv-backstage": { description: "Theater-inspired boutique hotel in the former Ohel Theater, steps from Dizengoff Square.", bestFor: "Design and city breaks" },
  "tlv-cinema": { description: "Characterful hotel in a former cinema overlooking lively Dizengoff Square.", bestFor: "Architecture and central sightseeing" },
  "tlv-port-tower": { description: "Contemporary tower hotel close to Tel Aviv Port and the northern waterfront.", bestFor: "Port and waterfront access" },
  "tlv-melody": { description: "Small boutique hotel near Independence Park and the northern beaches.", bestFor: "Couples and beach walks" },
  "tlv-elkonin": { description: "Restored heritage hotel near Neve Tzedek and the southern end of Rothschild.", bestFor: "Upscale heritage stays" },
  "tlv-ruby": { description: "Independent, house-like accommodation between Neve Tzedek and lower Rothschild.", bestFor: "Independent neighborhood explorers" },
  "tlv-the-jaffa": { description: "Landmark luxury hotel combining historic architecture and contemporary design in Old Jaffa.", bestFor: "Luxury and historic Jaffa" },
  "tlv-market-house": { description: "Boutique hotel near Jaffa's Clock Tower, flea market and evening cafés.", bestFor: "Jaffa cafés and markets" },
  "tlv-albi-florentin": { description: "Small urban hotel offering a digital self-check-in format in Florentin.", bestFor: "Self-sufficient city travelers" },
  "tlv-florentin-house": { description: "Small-property stay on Florentin Street near neighborhood cafés and nightlife.", bestFor: "Florentin nightlife and cafés" },
  "tlv-poli-house": { description: "Design-led hotel beside Carmel Market and Nachalat Binyamin.", bestFor: "Market food and design" },
  "tlv-assemblage": { description: "Boutique rooms in a preserved Allenby Street building, between the market and beach.", bestFor: "Historic boutique stays" },
  "tlv-the-norman": { description: "Luxury hotel in restored buildings just off Rothschild Boulevard.", bestFor: "Luxury city getaways" },
  "tlv-65-rothschild": { description: "Boutique hotel directly on Rothschild Boulevard's tree-lined promenade.", bestFor: "Rothschild walks and cafés" },
};


export function TelAvivHotelBrowser() {
  const cityBrowseOffer = linksForPage("stay-telaviv").find((offer) => offer.id === "hotels-telaviv-expedia");
  const [areaId, setAreaId] = useState<string>("all");
  const [expanded, setExpanded] = useState(false);
  const [sort, setSort] = useState<"area" | "name">("area");
  const selectedArea = telAvivAreaGuides.find((area) => area.id === areaId);
  const hotelList = telAvivHotelCatalog
    .filter((hotel) => areaId === "all" || hotel.areaId === areaId)
    .sort((a, b) => sort === "name"
      ? a.name.localeCompare(b.name)
      : telAvivAreaGuides.findIndex((area) => area.id === a.areaId) - telAvivAreaGuides.findIndex((area) => area.id === b.areaId) || a.name.localeCompare(b.name));
  // The first two editorial picks in each neighborhood form a balanced opening selection.
  const featuredIds = new Set(telAvivAreaGuides.flatMap((area) =>
    telAvivHotelCatalog.filter((hotel) => hotel.areaId === area.id).slice(0, 2).map((hotel) => hotel.id),
  ));
  const visible = areaId === "all" && !expanded
    ? hotelList.filter((hotel) => featuredIds.has(hotel.id))
    : hotelList;
  const resetArea = () => { setAreaId("all"); setExpanded(false); };
  const chooseArea = (id: string) => { setAreaId(id); setExpanded(false); };

  return (
    <section id="book" aria-labelledby="hotel-catalog-h" className="mt-7 scroll-mt-28" data-testid="telaviv-hotel-browser">
      <div className="rounded-2xl border bg-secondary/25 p-4 sm:p-6">
        <p className="eyebrow">My selected stays</p>
        <div className="mt-1 flex flex-wrap items-end justify-between gap-3">
          <div className="max-w-2xl">
            <h2 id="hotel-catalog-h" className="text-2xl font-semibold sm:text-3xl">Choose a Tel Aviv hotel</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Browse my hotel picks, choose a neighborhood and check rooms and booking terms on Expedia.
            </p>
          </div>
          <span className="rounded-full border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground">
            8 neighborhoods
          </span>
        </div>
        <div className="mt-4 flex items-center gap-2 md:hidden">
          <label htmlFor="telaviv-hotel-area" className="shrink-0 text-sm font-medium">Area</label>
          <select
            id="telaviv-hotel-area" aria-label="Choose hotel area"
            className="min-w-0 flex-1 rounded-lg border bg-card px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            value={areaId} onChange={(event) => chooseArea(event.target.value)}
          >
            <option value="all">All areas</option>
            {telAvivAreaGuides.map((area) => <option key={area.id} value={area.id}>{area.shortName}</option>)}
          </select>
        </div>
        <div className="mt-4 hidden flex-wrap gap-2 md:flex" role="group" aria-label="Filter Tel Aviv hotels by area">
          <button type="button" className="chip" aria-pressed={areaId === "all"} onClick={resetArea}>All areas</button>
          {telAvivAreaGuides.map((area) => <button
            key={area.id} type="button" className="chip" aria-pressed={areaId === area.id}
            onClick={() => chooseArea(area.id)}
          >{area.shortName}</button>)}
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t pt-3">
          <p className="text-xs font-medium text-muted-foreground" role="status" data-testid="telaviv-hotel-count">
            {selectedArea
              ? `${hotelList.length} hotels in ${selectedArea.shortName}`
              : expanded
                ? `${telAvivHotelCatalog.length} hotels across ${telAvivAreaGuides.length} neighborhoods`
                : `Showing ${visible.length} of ${telAvivHotelCatalog.length} hotels across ${telAvivAreaGuides.length} neighborhoods`}
          </p>
          <label htmlFor="telaviv-hotel-sort" className="flex items-center gap-2 text-xs font-medium">
            Sort by
            <select
              id="telaviv-hotel-sort" aria-label="Sort"
              className="rounded-lg border bg-card px-2.5 py-2 text-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              value={sort} onChange={(event) => setSort(event.target.value as "area" | "name")}
            >
              <option value="area">Neighborhood</option>
              <option value="name">Hotel name A–Z</option>
            </select>
          </label>
        </div>
        {selectedArea && (
          <Link to={selectedArea.path as LinkProps["to"]} className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-primary">
            Explore the {selectedArea.shortName} neighborhood guide <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        )}
      </div>

      <ul id="tel-aviv-hotels" className="mt-4 grid min-w-0 gap-4 sm:grid-cols-2 lg:grid-cols-3" data-testid="tel-aviv-hotels">
        {visible.map((hotel) => <TelAvivHotelTile key={hotel.id} hotel={hotel} />)}
      </ul>

      {areaId === "all" && visible.length < hotelList.length && (
        <div className="mt-5 flex justify-center">
          <button
            type="button"
            onClick={() => setExpanded(true)}
            aria-expanded={false}
            aria-controls="tel-aviv-hotels"
            data-testid="telaviv-hotel-expand"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-primary/40 bg-card px-5 py-2.5 text-sm font-semibold text-primary transition-colors hover:border-primary hover:bg-secondary/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Show more hotels
          </button>
        </div>
      )}

      <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
        Hotel stays are provided by independent properties and booked through external booking websites.
        Prices, availability, room details and booking conditions may change. Before booking, check the
        hotel address, exact room offer, total price and cancellation terms directly with the booking provider.
      </p>

      {areaId !== "all" && (
        <button type="button" onClick={resetArea} className="mt-4 inline-flex min-h-11 items-center gap-2 font-semibold text-primary underline underline-offset-4">
          <RotateCcw className="h-4 w-4" aria-hidden /> View all Tel Aviv hotels
        </button>
      )}
      {cityBrowseOffer && (
        <div className="mt-6 flex justify-center">
          <a
            href={hotelBrowseAffiliateUrl(cityBrowseOffer, "stay-telaviv")}
            target="_blank"
            rel={relFor(cityBrowseOffer.isAffiliate)}
            onClick={() => recordOutboundClick({ pageId: "stay-telaviv", productId: cityBrowseOffer.id, offerId: cityBrowseOffer.id })}
            data-testid="telaviv-all-hotels-expedia"
            className="btn btn-primary inline-flex min-h-11 items-center justify-center gap-2 px-6 py-2.5 text-center"
          >
            Browse all Tel Aviv hotels <ArrowRight className="h-4 w-4" aria-hidden />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
      )}
    </section>
  );
}

export function TelAvivHotelTile({ hotel, pageId = "stay-telaviv", showArea = true, showNearbyArea = false, stacked = false }: { hotel: HotelRecommendation; pageId?: string; showArea?: boolean; showNearbyArea?: boolean; stacked?: boolean }) {
  const [photoFailed, setPhotoFailed] = useState(false);
  const area = telAvivAreaGuides.find((item) => item.id === hotel.areaId);
  if (!area) return null;
  const photo = cityHotelPhoto(hotel);
  const image = photoFailed ? area.photo : photo;
  const booking = linksForPage(`stay-area-${area.id}`).find((item) => item.id === `hotel-${hotel.id}-expedia`);
  const notice = activeHotelNotice(hotel);


  const copy = hotelTileCopy[hotel.id] || { description: hotel.summary, bestFor: hotel.bestFor };
  const verticalLayout = stacked || showArea;

  return (
    <li className={verticalLayout
      ? "group flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border bg-card shadow-sm transition-all hover:border-primary/50 hover:shadow-md"
      : "group flex min-w-0 flex-col overflow-hidden rounded-2xl border bg-card shadow-sm transition-all hover:border-primary/50 hover:shadow-md sm:grid sm:grid-cols-[160px_minmax(0,1fr)] sm:grid-rows-[1fr_auto]"
    } data-testid={showArea ? "tel-aviv-hotel-card" : "hotel-recommendation"}>
      <div className={verticalLayout ? "relative w-full overflow-hidden bg-muted" : "relative overflow-hidden bg-muted sm:row-span-2"}>
        <img src={image.src} alt={image.alt} onError={() => { if (!photoFailed) setPhotoFailed(true); }}
             width={755} height={503} loading="lazy" decoding="async" data-testid="hotel-illustration"
             className={verticalLayout ? "aspect-[16/9] w-full object-cover" : "aspect-[16/9] w-full object-cover sm:aspect-auto sm:h-full sm:min-h-[215px]"} />
        {(showArea || showNearbyArea) && <Link to={area.path as LinkProps["to"]}
              className="absolute bottom-2 left-2 max-w-[calc(100%-1rem)] rounded-md bg-background/95 px-2 py-1 text-[11px] font-medium leading-tight text-foreground shadow-sm hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              aria-label={`Explore ${area.shortName} area guide`}>
          {showNearbyArea ? `Nearby · ${area.shortName}` : area.shortName}
        </Link>}
      </div>
      <div className={verticalLayout ? "flex min-w-0 flex-1 flex-col px-4 pb-3 pt-4" : "flex min-w-0 flex-col px-4 pb-3 pt-4"}>
        <h3 className="text-lg font-semibold leading-snug">{hotel.name}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground" data-testid="hotel-short-description">{copy.description}</p>
        <p className="mt-2 text-sm leading-snug" data-testid="hotel-best-for"><span className="font-semibold">Best for:</span> {copy.bestFor}</p>
        {notice && <p className="mt-3 rounded-lg border border-primary/25 bg-secondary/70 p-3 text-xs leading-relaxed" data-testid="hotel-operating-notice">{notice.message}</p>}
      </div>
      {booking && (
        <div className={verticalLayout ? "mt-auto border-t bg-secondary/20 px-3 py-3 sm:px-4" : "border-t bg-secondary/20 px-3 py-3 sm:col-start-2 sm:px-4"}>
          <a href={hotelAffiliateUrl(booking, pageId, hotel.id)} target="_blank" rel={relFor(booking.isAffiliate)}
             onClick={() => recordOutboundClick({ pageId, productId: hotel.id, offerId: booking.id })}
             className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg border border-primary/30 bg-primary/5 px-4 py-2.5 text-center text-sm font-semibold text-primary transition-colors hover:border-primary/60 hover:bg-primary/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
             aria-label={`${booking.ctaLabel} for ${hotel.name}`}>
            Check rooms & rates <ExternalLink className="h-4 w-4 shrink-0" aria-hidden />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
      )}
    </li>
  );
}
