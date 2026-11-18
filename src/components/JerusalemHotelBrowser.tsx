import { useState } from "react";
import { Link, type LinkProps } from "@tanstack/react-router";
import { ArrowRight, ExternalLink, MapPin, RotateCcw } from "lucide-react";
import { jerusalemAreaGuides } from "@/data/content";
import { linksForPage, type HotelRecommendation } from "@/data/registry";
import { cityHotelPhoto, hotelsInCityCatalog } from "@/data/cityHotelCatalog";
import { activeHotelNotice } from "@/lib/hotel-notices";
import type { HotelIllustration } from "@/data/telAvivHotelPhotos";
import { recordOutboundClick, relFor } from "@/lib/outbound";
import { hotelAffiliateUrl } from "@/lib/hotel-affiliate";

/**
 * Editorial catalogue, not a live hotel search. Reuses the checked property
 * recommendations and configured booking offers from every neighborhood page.
 */
export const jerusalemHotelCatalog = hotelsInCityCatalog("jerusalem");

/**
 * Short, property-specific card copy, derived from the existing editorial records.
 * The full descriptions, conditions and practical considerations stay in area guides.
 */
export const jerusalemHotelTileCopy: Record<string, { description: string; bestFor: string }> = {
  "herbert-samuel": { description: "Upscale hotel on Shamai Street near Zion Square, Jaffa Road and downtown cafés.", bestFor: "Upscale city-base stays" },
  "arthur": { description: "Intimate Atlas boutique hotel near Ben Yehuda's pedestrian lanes, with period-inspired interiors.", bestFor: "Boutique couples' breaks" },
  "mamilla": { description: "Contemporary luxury hotel beside Mamilla Avenue, a short walk from Jaffa Gate.", bestFor: "Old City luxury breaks" },
  "king-david": { description: "Landmark heritage hotel on King David Street, with classic style and Old City outlooks.", bestFor: "Classic landmark luxury" },
  "new-imperial": { description: "Historic hotel just inside Jaffa Gate, close to Jerusalem's Christian and Armenian quarters.", bestFor: "Old City sightseeing" },
  "sephardic-house": { description: "Heritage stay in the Jewish Quarter near the Hurva Synagogue and Western Wall routes.", bestFor: "Jewish Quarter heritage trips" },
  "bezalel": { description: "Design-focused Atlas boutique hotel in Nachlaot, near Mahane Yehuda and Downtown.", bestFor: "Design and market walks" },
  "market-courtyard": { description: "Apartment-style suites around a Jerusalem-stone courtyard beside Mahane Yehuda Market.", bestFor: "Independent extended stays" },
  "american-colony": { description: "Historic luxury retreat with atmospheric courtyards north of the Old City.", bestFor: "Heritage hotel escapes" },
  "jerusalem-hotel": { description: "Family-run Palestinian heritage hotel near Nablus Road and Damascus Gate.", bestFor: "Local character and history" },
  "orient": { description: "Luxury Isrotel stay combining modern and restored buildings by the German Colony.", bestFor: "Upscale neighborhood stays" },
  "rafael-residence": { description: "Residential suites in Baka with separate living space and kitchen facilities.", bestFor: "Families and longer stays" },
};


const previewHotelIds = new Set(jerusalemAreaGuides.flatMap((area) =>
  jerusalemHotelCatalog.filter((hotel) => hotel.areaId === area.id).slice(0, 2).map((hotel) => hotel.id),
));

export function JerusalemHotelBrowser() {
  const [areaId, setAreaId] = useState<string>("all");
  const [sort, setSort] = useState<"area" | "name">("area");
  const [showAll, setShowAll] = useState(false);
  const selectedArea = jerusalemAreaGuides.find((area) => area.id === areaId);
  const hotelList = jerusalemHotelCatalog
    .filter((hotel) => areaId === "all" || hotel.areaId === areaId)
    .sort((a, b) => sort === "name"
      ? a.name.localeCompare(b.name)
      : jerusalemAreaGuides.findIndex((area) => area.id === a.areaId) - jerusalemAreaGuides.findIndex((area) => area.id === b.areaId) || a.name.localeCompare(b.name));
  const visible = areaId === "all" && !showAll
    ? hotelList.filter((hotel) => previewHotelIds.has(hotel.id))
    : hotelList;
  const resetArea = () => { setAreaId("all"); setShowAll(true); };
  const chooseArea = (id: string) => { setAreaId(id); if (id === "all") setShowAll(true); };

  return (
    <section id="book" aria-labelledby="hotel-catalog-h" className="mt-7 scroll-mt-28" data-testid="jerusalem-hotel-browser">
      <div className="rounded-2xl border bg-secondary/25 p-4 sm:p-6">
        <p className="eyebrow">My selected stays</p>
        <div className="mt-1 flex flex-wrap items-end justify-between gap-3">
          <div className="max-w-2xl">
            <h2 id="hotel-catalog-h" className="text-2xl font-semibold sm:text-3xl">Choose a Jerusalem hotel</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Browse my hotel picks, choose a neighborhood and check rooms and booking terms on Expedia.
            </p>
          </div>
          <span className="rounded-full border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground">
            6 neighborhoods
          </span>
        </div>
        <div className="mt-4 flex items-center gap-2 md:hidden">
          <label htmlFor="jerusalem-hotel-area" className="shrink-0 text-sm font-medium">Area</label>
          <select
            id="jerusalem-hotel-area" aria-label="Choose hotel area"
            className="min-w-0 flex-1 rounded-lg border bg-card px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            value={areaId} onChange={(event) => chooseArea(event.target.value)}
          >
            <option value="all">All areas</option>
            {jerusalemAreaGuides.map((area) => <option key={area.id} value={area.id}>{area.shortName}</option>)}
          </select>
        </div>
        <div className="mt-4 hidden flex-wrap gap-2 md:flex" role="group" aria-label="Filter Jerusalem hotels by area">
          <button type="button" className="chip" aria-pressed={areaId === "all"} onClick={resetArea}>All areas</button>
          {jerusalemAreaGuides.map((area) => <button
            key={area.id} type="button" className="chip" aria-pressed={areaId === area.id}
            onClick={() => chooseArea(area.id)}
          >{area.shortName}</button>)}
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t pt-3">
          <p className="text-xs font-medium text-muted-foreground" data-testid="jerusalem-hotel-count">
            Showing {visible.length} of {areaId === "all" ? jerusalemHotelCatalog.length : hotelList.length} hotels
          </p>
          <label htmlFor="jerusalem-hotel-sort" className="flex items-center gap-2 text-xs font-medium">
            Sort by
            <select
              id="jerusalem-hotel-sort" aria-label="Sort"
              className="rounded-lg border bg-card px-2.5 py-2 text-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              value={sort} onChange={(event) => { setSort(event.target.value as "area" | "name"); setShowAll(true); }}
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

      <ul className="mt-4 grid min-w-0 gap-4 lg:grid-cols-2" data-testid="jerusalem-hotels">
        {visible.map((hotel) => <JerusalemHotelTile key={hotel.id} hotel={hotel} />)}
      </ul>

      {areaId === "all" && !showAll && (
        <div className="mt-5 text-center">
          <button
            type="button" onClick={() => setShowAll(true)}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-primary px-6 py-2.5 font-semibold text-primary transition-colors hover:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Show all {jerusalemHotelCatalog.length} Jerusalem hotels <ArrowRight className="h-4 w-4" aria-hidden />
          </button>
        </div>
      )}
      {areaId !== "all" && (
        <button type="button" onClick={resetArea} className="mt-4 inline-flex min-h-11 items-center gap-2 font-semibold text-primary underline underline-offset-4">
          <RotateCcw className="h-4 w-4" aria-hidden /> View all Jerusalem hotels
        </button>
      )}
    </section>
  );
}

function JerusalemHotelTile({ hotel }: { hotel: HotelRecommendation }) {
  const [photoFailed, setPhotoFailed] = useState(false);
  const area = jerusalemAreaGuides.find((item) => item.id === hotel.areaId);
  if (!area) return null;
  const photo = cityHotelPhoto(hotel);
  const image = photoFailed ? area.photo : photo;
  const booking = linksForPage("stay-area-" + area.id).find((item) => item.id === "hotel-" + hotel.id + "-expedia");
  const notice = activeHotelNotice(hotel);
  const copy = jerusalemHotelTileCopy[hotel.id] || { description: hotel.summary, bestFor: hotel.bestFor };

  return (
    <li className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border bg-card shadow-sm transition-all hover:border-primary/50 hover:shadow-md sm:grid sm:grid-cols-[160px_minmax(0,1fr)] sm:grid-rows-[1fr_auto]" data-testid="jerusalem-hotel-card">
      <div className="relative overflow-hidden bg-muted sm:row-span-2">
        <img
          src={image.src} alt={image.alt}
          onError={() => { if (!photoFailed) setPhotoFailed(true); }}
          width={755} height={503} loading="lazy" decoding="async"
          data-testid="hotel-illustration"
          className="aspect-[16/9] w-full object-cover sm:aspect-auto sm:h-full sm:min-h-[215px]"
        />
        <span className="absolute bottom-2 left-2 max-w-[calc(100%-1rem)] rounded-md bg-background/95 px-2 py-1 text-[11px] font-medium leading-tight text-foreground shadow-sm">
          {area.shortName} · area view
        </span>
      </div>
      <div className="flex min-w-0 flex-col px-4 pb-3 pt-4">
        <h3 className="text-lg font-semibold leading-snug">{hotel.name}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground" data-testid="hotel-short-description">{copy.description}</p>
        <p className="mt-2 text-sm leading-snug" data-testid="hotel-best-for"><span className="font-semibold">Best for:</span> {copy.bestFor}</p>
        {notice && <p className="mt-3 rounded-lg border border-primary/25 bg-secondary/70 p-3 text-xs leading-relaxed" data-testid="hotel-operating-notice">{notice.message}</p>}
        <Link
          to={area.path as LinkProps["to"]}
          className="mt-3 inline-flex w-fit items-center gap-1 text-xs font-semibold text-primary underline underline-offset-2 hover:text-primary/80 focus-visible:outline-2 focus-visible:outline-primary"
          aria-label={"Explore " + area.shortName + " area guide"}
        >
          <MapPin className="h-3.5 w-3.5" aria-hidden />
          Area guide <ArrowRight className="h-3.5 w-3.5" aria-hidden />
        </Link>
      </div>
      {booking && (
        <div className="border-t bg-secondary/20 px-3 py-3 sm:col-start-2 sm:px-4">
          <a
            href={hotelAffiliateUrl(booking, "stay-jerusalem", hotel.id)}
            target="_blank" rel={relFor(booking.isAffiliate)}
            onClick={() => recordOutboundClick({ pageId: "stay-jerusalem", productId: hotel.id, offerId: booking.id })}
            className="btn btn-primary flex min-h-11 w-full items-center justify-center gap-2 text-center text-sm"
            aria-label={booking.ctaLabel + " for " + hotel.name}
          >
            {booking.ctaLabel} <ExternalLink className="h-4 w-4 shrink-0" aria-hidden />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
      )}
    </li>
  );
}
