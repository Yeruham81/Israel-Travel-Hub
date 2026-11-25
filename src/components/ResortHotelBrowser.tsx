import { useState } from "react";
import { Link, type LinkProps } from "@tanstack/react-router";
import { ArrowRight, RotateCcw } from "lucide-react";
import type { HotelStayDestination } from "@/data/content";
import { StayHotelCard } from "@/components/StayHotelCard";
import { resortHotel, hotelBooking } from "@/components/StayGuideParts";
import { resortHotelPhoto } from "@/data/resortHotelPhotos";

type AreaChoice = { id: string; label: string; hotelIds: readonly string[] };

/** Editorial location groups; hotel facts, booking links and eligibility remain in the registry. */
export const regionalHotelAreas: Record<string, readonly AreaChoice[]> = {
  haifa: [
    { id: "lower-city", label: "German Colony & lower city", hotelIds: ["haifa-botanica", "haifa-schumacher", "haifa-colony", "haifa-golden-crown", "haifa-port-inn", "haifa-loui-talpiot"] },
    { id: "carmel", label: "Mount Carmel", hotelIds: ["haifa-dan-carmel", "haifa-crowne-plaza", "haifa-nof"] },
    { id: "beachfront", label: "Southern beachfront", hotelIds: ["haifa-leonardo-plaza"] },
  ],
  tiberias: [
    { id: "central", label: "Promenade & town", hotelIds: ["tib-scots", "tib-leonardo-club", "tib-caesar", "tib-emily", "tib-tiberia", "tib-hostel"] },
    { id: "upper", label: "Streets above the lake", hotelIds: ["tib-sofia"] },
    { id: "lakeside", label: "Lakeside hotel edges", hotelIds: ["tib-u-boutique", "tib-galei-kinneret", "tib-gai-beach"] },
  ],
  deadsea: [
    { id: "ein-bokek", label: "Ein Bokek", hotelIds: ["ds-milos", "ds-nevo", "ds-oasis", "ds-vert", "ds-noga"] },
    { id: "south", label: "Neve Zohar & southern resorts", hotelIds: ["ds-kayma", "ds-herods", "ds-leonardo-club", "ds-leonardo-plaza"] },
    { id: "ein-gedi", label: "Ein Gedi", hotelIds: ["ds-ein-gedi", "ds-hi-ein-gedi"] },
  ],
};

const styleLabels: Record<string, string> = {
  luxury: "Luxury",
  boutique: "Boutique",
  family: "Family",
  "mid-range": "Mid-range",
  budget: "Budget & independent",
  spa: "Spa",
  value: "Value",
  "ein-gedi": "Nature & Ein Gedi",
  central: "Central",
};

export function ResortHotelBrowser({ guide: g }: { guide: HotelStayDestination }) {
  const [style, setStyle] = useState("all");
  const [area, setArea] = useState("all");
  const [sort, setSort] = useState<"style" | "name">("style");
  const [expanded, setExpanded] = useState(false);
  const hotelIds = g.groups.flatMap((group) => group.hotelIds);
  const areaChoices = regionalHotelAreas[g.id] || [];
  const selectedGroup = g.groups.find((group) => group.id === style);
  const selectedArea = areaChoices.find((choice) => choice.id === area);
  const filtered = hotelIds.filter((id) =>
    (style === "all" || selectedGroup?.hotelIds.includes(id)) &&
    (area === "all" || selectedArea?.hotelIds.includes(id))
  );
  const ordered = [...filtered].sort((a, b) => sort === "name"
    ? resortHotel(a).name.localeCompare(resortHotel(b).name)
    : g.groups.findIndex((group) => group.hotelIds.includes(a)) -
        g.groups.findIndex((group) => group.hotelIds.includes(b)) ||
      resortHotel(a).name.localeCompare(resortHotel(b).name));

  // A balanced opening selection represents every style before repeating a style.
  const featured: string[] = [];
  for (let offset = 0; featured.length < 6 && offset < Math.max(...g.groups.map((group) => group.hotelIds.length)); offset++) {
    for (const group of g.groups) {
      const id = group.hotelIds[offset];
      if (id && featured.length < 6) featured.push(id);
    }
  }
  const showPreview = style === "all" && area === "all" && !expanded;
  const visible = showPreview ? ordered.filter((id) => featured.includes(id)) : ordered;
  const resetFilters = () => { setStyle("all"); setArea("all"); setExpanded(false); };

  return (
    <section id="book" aria-labelledby="regional-hotels-h" className="mt-10 scroll-mt-28" data-testid="regional-hotel-browser">
      <div className="rounded-2xl border bg-secondary/25 p-4 sm:p-6">
        <p className="eyebrow">My selected hotels</p>
        <h2 id="regional-hotels-h" className="mt-1 text-2xl font-semibold sm:text-3xl">Choose a {g.name} hotel</h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          Filter my hotel shortlist by travel style and location. Open each hotel's booking link to compare rooms and terms for your dates.
        </p>
        <div className="mt-5">
          <p className="text-sm font-semibold">Hotel style</p>
          <div className="mt-2 flex flex-wrap gap-2" role="group" aria-label={`Filter ${g.name} hotels by style`}>
            <button type="button" className="chip" aria-pressed={style === "all"} onClick={() => { setStyle("all"); setExpanded(false); }}>All styles</button>
            {g.groups.map((group) => <button key={group.id} type="button" className="chip" aria-pressed={style === group.id}
              onClick={() => { setStyle(group.id); setExpanded(false); }}>{styleLabels[group.id] || group.title}</button>)}
          </div>
        </div>
        <div className="mt-5">
          <p className="text-sm font-semibold">Location</p>
          <div className="mt-2 flex flex-wrap gap-2" role="group" aria-label={`Filter ${g.name} hotels by location`}>
            <button type="button" className="chip" aria-pressed={area === "all"} onClick={() => { setArea("all"); setExpanded(false); }}>All locations</button>
            {areaChoices.map((choice) => <button key={choice.id} type="button" className="chip" aria-pressed={area === choice.id}
              onClick={() => { setArea(choice.id); setExpanded(false); }}>{choice.label}</button>)}
          </div>
        </div>
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t pt-4">
          <p role="status" data-testid="regional-hotel-count" className="text-xs font-medium text-muted-foreground">
            {showPreview ? `Showing ${visible.length} of ${hotelIds.length} hotels` : `${visible.length} of ${hotelIds.length} hotels match`}
          </p>
          <label className="flex items-center gap-2 text-xs font-medium">
            Sort by
            <select aria-label="Sort hotels" className="rounded-lg border bg-card px-3 py-2 text-xs"
              value={sort} onChange={(event) => setSort(event.target.value as "style" | "name")}>
              <option value="style">Hotel style</option>
              <option value="name">Hotel name A–Z</option>
            </select>
          </label>
        </div>
        {selectedGroup?.guidePath && <p className="mt-3 text-sm">
          <Link to={selectedGroup.guidePath as LinkProps["to"]} className="inline-flex items-center gap-1.5 font-semibold text-primary underline underline-offset-2">
            Compare {styleLabels[selectedGroup.id]?.toLowerCase() || selectedGroup.title.toLowerCase()} hotels in detail <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </p>}
      </div>
      {visible.length ? (
        <ul className="mt-5 grid min-w-0 gap-4 sm:grid-cols-2 lg:grid-cols-3" data-testid="regional-hotel-grid">
          {visible.map((id) => <StayHotelCard key={id} hotel={resortHotel(id)} booking={hotelBooking(id)}
            pageId={`stay-${g.id}`} tile photo={resortHotelPhoto(id)} />)}
        </ul>
      ) : <div className="mt-5 rounded-xl border bg-card p-5 text-sm">
        <p>There are no hotels in my shortlist for this combination.</p>
        <button type="button" onClick={resetFilters} className="mt-3 inline-flex items-center gap-2 font-semibold text-primary underline underline-offset-2">
          <RotateCcw className="h-4 w-4" aria-hidden /> View all hotels
        </button>
      </div>}
      {showPreview && visible.length < hotelIds.length && <div className="mt-5 flex justify-center">
        <button type="button" aria-expanded={expanded} aria-controls="regional-hotel-grid"
          data-testid="regional-hotel-expand" onClick={() => setExpanded(true)}
          className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-primary/40 bg-card px-5 py-3 text-sm font-semibold text-primary hover:border-primary hover:bg-secondary/30">
          Show all {hotelIds.length} hotels <ArrowRight className="h-4 w-4" aria-hidden />
        </button>
      </div>}
      {(style !== "all" || area !== "all") && <div className="mt-4 flex justify-center">
        <button type="button" onClick={resetFilters} className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-primary underline underline-offset-2">
          <RotateCcw className="h-4 w-4" aria-hidden /> View all {g.name} hotels
        </button>
      </div>}
    </section>
  );
}
