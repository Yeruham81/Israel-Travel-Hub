import { useState } from "react";
import { Link, type LinkProps } from "@tanstack/react-router";
import { ArrowRight, ExternalLink, RotateCcw } from "lucide-react";
import { telAvivAreaGuides } from "@/data/content";
import { hotelRecommendations, linksForPage, type HotelRecommendation } from "@/data/registry";
import { activeHotelNotice } from "@/lib/hotel-notices";
import { recordOutboundClick, relFor } from "@/lib/outbound";

/**
 * Editorial catalogue, not a live hotel search. Reuses the checked property
 * recommendations and configured booking offers from the existing area pages.
 */
export const telAvivHotelCatalog = hotelRecommendations.filter((hotel) => hotel.cityId === "telaviv");

export function TelAvivHotelBrowser() {
  const [areaId, setAreaId] = useState<string>("all");
  const [sort, setSort] = useState<"area" | "name">("area");
  const selectedArea = telAvivAreaGuides.find((area) => area.id === areaId);
  const visible = telAvivHotelCatalog
    .filter((hotel) => areaId === "all" || hotel.areaId === areaId)
    .sort((a, b) => sort === "name"
      ? a.name.localeCompare(b.name)
      : telAvivAreaGuides.findIndex((area) => area.id === a.areaId) - telAvivAreaGuides.findIndex((area) => area.id === b.areaId) || a.name.localeCompare(b.name));

  return (
    <section id="book" aria-labelledby="hotel-catalog-h" className="mt-8 scroll-mt-32">
      <div className="rounded-3xl border bg-secondary/40 p-5 sm:p-7">
        <p className="eyebrow">A quicker way to choose</p>
        <h2 id="hotel-catalog-h" className="mt-2 text-3xl md:text-4xl">Already know your dates? Browse Tel Aviv stays</h2>
        <p className="mt-3 max-w-3xl leading-relaxed text-muted-foreground">
          Browse selected hotels without opening every neighborhood guide. Filter by area, then open the provider's booking page to enter your dates, guest count and room preferences.
        </p>

        <div className="mt-5 flex flex-wrap gap-2" role="group" aria-label="Filter Tel Aviv hotels by area">
          <button type="button" className="chip" aria-pressed={areaId === "all"} onClick={() => setAreaId("all")}>All areas <span aria-hidden="true">({telAvivHotelCatalog.length})</span></button>
          {telAvivAreaGuides.map((area) => (
            <button key={area.id} type="button" className="chip" aria-pressed={areaId === area.id} onClick={() => setAreaId(area.id)}>
              {area.shortName} <span aria-hidden="true">({telAvivHotelCatalog.filter((hotel) => hotel.areaId === area.id).length})</span>
            </button>
          ))}
        </div>
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm font-medium" role="status" aria-live="polite">
            {visible.length} {visible.length === 1 ? "hotel" : "hotels"}{selectedArea ? ` in ${selectedArea.shortName}` : " across Tel Aviv"}
          </p>
          <div className="flex items-center gap-2">
            <label htmlFor="telaviv-hotel-sort" className="text-sm font-medium">Sort</label>
            <select id="telaviv-hotel-sort" className="max-w-full rounded-lg border bg-card px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary" value={sort} onChange={(event) => setSort(event.target.value as "area" | "name")}>
              <option value="area">By area</option>
              <option value="name">Hotel name A–Z</option>
            </select>
          </div>
        </div>
        {selectedArea && (
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {selectedArea.summary}{" "}
            <Link to={selectedArea.path as LinkProps["to"]} className="font-semibold text-primary underline underline-offset-2">Explore the {selectedArea.shortName} area guide</Link>
          </p>
        )}
      </div>

      <p className="mt-4 rounded-xl border bg-card p-4 text-sm leading-relaxed text-muted-foreground">
        Hotel recommendations are editorial and do not reflect live room availability. Links marked “Sponsored link” may earn me a commission at no extra cost to you. Enter your actual dates, guests and room preferences on the booking site.
      </p>
      <ul className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" data-testid="tel-aviv-hotels">
        {visible.map((hotel) => <TelAvivHotelTile key={hotel.id} hotel={hotel} />)}
      </ul>
      <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
        Photos show the hotel neighborhood, <strong>not the individual property</strong>. A property-specific photo gallery, room types, prices and availability can be checked at the provider. These recommendations are based on location and published hotel information, not a live ranking or a claim that I have stayed at each property.
      </p>
      {areaId !== "all" && <button type="button" onClick={() => setAreaId("all")} className="mt-3 inline-flex items-center gap-2 font-semibold text-primary underline underline-offset-4"><RotateCcw className="h-4 w-4" aria-hidden /> View all Tel Aviv hotels</button>}
    </section>
  );
}

function TelAvivHotelTile({ hotel }: { hotel: HotelRecommendation }) {
  const area = telAvivAreaGuides.find((item) => item.id === hotel.areaId);
  if (!area) return null;
  const booking = linksForPage(`stay-area-${area.id}`).find((item) => item.id === `hotel-${hotel.id}-expedia`);
  const notice = activeHotelNotice(hotel);

  return (
    <li className="flex min-w-0 flex-col overflow-hidden rounded-2xl border bg-card transition-colors hover:border-primary/60" data-testid="tel-aviv-hotel-card">
      <div className="relative overflow-hidden bg-muted">
        <img src={area.photo.src} alt={area.photo.alt} width={755} height={503} loading="lazy" decoding="async" className="aspect-[16/10] w-full object-cover" />
        <span className="absolute bottom-2 left-3 rounded-lg bg-card/95 px-2.5 py-1 text-[11px] font-medium text-foreground">Neighborhood photograph</span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-primary">{area.shortName} · {hotel.style}</p>
        <h3 className="mt-2 text-xl leading-snug">{hotel.name}</h3>
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{hotel.summary}</p>
        <p className="mt-3 flex-1 text-sm leading-relaxed"><span className="font-semibold">Best for:</span> {hotel.bestFor}</p>
        {notice && <p className="mt-3 rounded-lg border border-primary/25 bg-secondary/70 p-3 text-xs leading-relaxed" data-testid="hotel-operating-notice">{notice.message}</p>}
        <Link to={area.path as LinkProps["to"]} className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-primary">
          Explore the area <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
      {booking && (
        <div className="border-t bg-secondary/40 p-4">
          <a href={booking.url} target="_blank" rel={relFor(booking.isAffiliate)}
             onClick={() => recordOutboundClick({ pageId: "stay-telaviv", productId: hotel.id, offerId: booking.id })}
             className="btn btn-primary flex w-full items-center justify-center gap-2 text-center"
             aria-label={`${booking.ctaLabel} for ${hotel.name}`}>
            {booking.ctaLabel} <ExternalLink className="h-4 w-4 shrink-0" aria-hidden />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
          <p className="mt-2 text-center text-xs leading-relaxed text-muted-foreground">{booking.isAffiliate ? "Sponsored link · " : ""}Confirm dates, guests and final price on {booking.providerName}.</p>
        </div>
      )}
    </li>
  );
}
