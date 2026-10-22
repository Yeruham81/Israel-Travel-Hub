import { useState } from "react";
import { Link, type LinkProps } from "@tanstack/react-router";
import { ArrowRight, ExternalLink, RotateCcw } from "lucide-react";
import { jerusalemAreaGuides } from "@/data/content";
import { linksForPage, type HotelRecommendation } from "@/data/registry";
import { cityHotelPhoto, hotelsInCityCatalog } from "@/data/cityHotelCatalog";
import { activeHotelNotice } from "@/lib/hotel-notices";
import type { HotelIllustration } from "@/data/telAvivHotelPhotos";
import { recordOutboundClick, relFor } from "@/lib/outbound";

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

export function JerusalemHotelBrowser() {
  const [areaId, setAreaId] = useState<string>("all");
  const [sort, setSort] = useState<"area" | "name">("area");
  const selectedArea = jerusalemAreaGuides.find((area) => area.id === areaId);
  const visible = jerusalemHotelCatalog
    .filter((hotel) => areaId === "all" || hotel.areaId === areaId)
    .sort((a, b) => sort === "name"
      ? a.name.localeCompare(b.name)
      : jerusalemAreaGuides.findIndex((area) => area.id === a.areaId) - jerusalemAreaGuides.findIndex((area) => area.id === b.areaId) || a.name.localeCompare(b.name));

  return (
    <section id="book" aria-labelledby="hotel-catalog-h" className="mt-8 scroll-mt-32">
      <div className="rounded-2xl border bg-secondary/30 px-4 py-4 sm:px-5">
        <h2 id="hotel-catalog-h" className="text-2xl sm:text-3xl">Choose a Jerusalem hotel</h2>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
          Browse my hotel picks and narrow your choice by neighborhood.
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-2 md:hidden">
          <label htmlFor="jerusalem-hotel-area" className="shrink-0 text-sm font-medium">Area</label>
          <select id="jerusalem-hotel-area" aria-label="Choose hotel area"
                  className="min-w-0 flex-1 rounded-lg border bg-card px-2.5 py-1.5 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  value={areaId} onChange={(event) => setAreaId(event.target.value)}>
            <option value="all">All areas</option>
            {jerusalemAreaGuides.map((area) => <option key={area.id} value={area.id}>{area.shortName}</option>)}
          </select>
        </div>
        <div className="mt-3 hidden flex-wrap items-center gap-1.5 md:flex" role="group" aria-label="Filter Jerusalem hotels by area">
          <button type="button" className="chip px-2.5! py-1! text-xs!" aria-pressed={areaId === "all"} onClick={() => setAreaId("all")}>All areas</button>
          {jerusalemAreaGuides.map((area) => (
            <button key={area.id} type="button" className="chip px-2.5! py-1! text-xs!" aria-pressed={areaId === area.id} onClick={() => setAreaId(area.id)}>
              {area.shortName}
            </button>
          ))}
        </div>
        <div className="mt-3 flex justify-end">
          <div className="flex items-center gap-2">
            <label htmlFor="jerusalem-hotel-sort" className="text-xs font-medium">Sort</label>
            <select id="jerusalem-hotel-sort" className="max-w-full rounded-lg border bg-card px-2.5 py-1.5 text-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary" value={sort} onChange={(event) => setSort(event.target.value as "area" | "name")}>
              <option value="area">By area</option>
              <option value="name">Hotel name A–Z</option>
            </select>
          </div>
        </div>
        {selectedArea && (
          <Link to={selectedArea.path as LinkProps["to"]} className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-primary underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-primary">
            Explore the {selectedArea.shortName} guide <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
        )}
      </div>

      <ul className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" data-testid="jerusalem-hotels">
        {visible.map((hotel) => <JerusalemHotelTile key={hotel.id} hotel={hotel} />)}
      </ul>
      <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
        Some booking links may earn me a commission at no extra cost to you.
      </p>
      {areaId !== "all" && <button type="button" onClick={() => setAreaId("all")} className="mt-3 inline-flex items-center gap-2 font-semibold text-primary underline underline-offset-4"><RotateCcw className="h-4 w-4" aria-hidden /> View all Jerusalem hotels</button>}
      <details className="mt-4 rounded-xl border bg-card p-3 text-xs text-muted-foreground" data-testid="jerusalem-hotel-photo-credits">
        <summary className="cursor-pointer font-semibold text-foreground">Illustrative photo credits & licenses</summary>
        
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {jerusalemHotelCatalog.map((hotel) => {
            const photo = cityHotelPhoto(hotel);
            if (!photo) return null;
            return (
              <li key={hotel.id}>
                <span className="font-medium text-foreground">{hotel.name}: </span>
                {photo.sourceUrl ? <a href={photo.sourceUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">{photo.credit}<span className="sr-only"> (opens in a new tab)</span></a> : photo.credit}
                {photo.licenseUrl && <> · <a href={photo.licenseUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">License<span className="sr-only"> (opens in a new tab)</span></a></>}
              </li>
            );
          })}
        </ul>
      </details>

    </section>
  );
}

function JerusalemHotelTile({ hotel }: { hotel: HotelRecommendation }) {
  const [photoFailed, setPhotoFailed] = useState(false);
  const area = jerusalemAreaGuides.find((item) => item.id === hotel.areaId);
  if (!area) return null;
  const photo = cityHotelPhoto(hotel);
  const image = photoFailed ? area.photo : photo;
  const booking = linksForPage(`stay-area-${area.id}`).find((item) => item.id === `hotel-${hotel.id}-expedia`);
  const notice = activeHotelNotice(hotel);


  const copy = jerusalemHotelTileCopy[hotel.id] || { description: hotel.summary, bestFor: hotel.bestFor };

  return (
    <li className="flex min-w-0 flex-col overflow-hidden rounded-2xl border bg-card transition-colors hover:border-primary/60" data-testid="jerusalem-hotel-card">
      <div className="overflow-hidden bg-muted">
        <img src={image.src} alt={image.alt} onError={() => { if (!photoFailed) setPhotoFailed(true); }}
             width={755} height={503} loading="lazy" decoding="async" data-testid="hotel-illustration"
             className="aspect-[16/10] w-full object-cover" />
      </div>
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h3 className="text-xl font-semibold leading-snug">{hotel.name}</h3>
        <Link to={area.path as LinkProps["to"]}
              className="mt-1.5 inline-flex w-fit items-center gap-1 text-sm font-medium text-primary underline underline-offset-2 hover:text-primary/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              aria-label={`Explore ${area.shortName} area guide`}>
          {area.shortName} <ArrowRight className="h-3.5 w-3.5" aria-hidden />
        </Link>
        <p className="mt-3 line-clamp-2 flex-1 text-sm leading-relaxed text-muted-foreground" data-testid="hotel-short-description">{copy.description}</p>
        <p className="mt-3 text-sm leading-snug" data-testid="hotel-best-for"><span className="font-semibold">Best for:</span> {copy.bestFor}</p>
        {notice && <p className="mt-3 rounded-lg border border-primary/25 bg-secondary/70 p-3 text-xs leading-relaxed" data-testid="hotel-operating-notice">{notice.message}</p>}
      </div>
      {booking && (
        <div className="border-t bg-secondary/40 p-3.5">
          <a href={booking.url} target="_blank" rel={relFor(booking.isAffiliate)}
             onClick={() => recordOutboundClick({ pageId: "stay-jerusalem", productId: hotel.id, offerId: booking.id })}
             className="btn btn-primary flex w-full items-center justify-center gap-2 text-center"
             aria-label={`${booking.ctaLabel} for ${hotel.name}`}>
            {booking.ctaLabel} <ExternalLink className="h-4 w-4 shrink-0" aria-hidden />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
      )}
    </li>
  );
}
