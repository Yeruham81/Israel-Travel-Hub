import { sacredHillPlanning } from "@/data/sacredHillPlanning";
import type { SacredHillId } from "@/data/sacredHillGuides";
import { Section } from "@/components/Guide";

export const mapsSearchUrl = (place: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place)}`;

export const mapsWalkUrl = (from: string, to: string) =>
  `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(from)}&destination=${encodeURIComponent(to)}&travelmode=walking`;

/** Short, contextual day-of-week advice beneath the opening-hours reference.
 * Full visit routes live in the preceding Suggested Walking Routes section.
 */
export function SacredHillDayPlanning({ id }: { id: SacredHillId }) {
  return <aside aria-labelledby="day-planning-h" className="mt-5 rounded-xl border bg-secondary/30 p-4 sm:p-5">
    <h3 id="day-planning-h" className="text-lg font-semibold">Choosing your visit day</h3>
    <div className="mt-3 grid gap-3 sm:grid-cols-2">
      {sacredHillPlanning[id].days.map(option => <div key={option.title} className="rounded-lg bg-card p-4">
        <h4 className="font-semibold leading-snug">{option.title}</h4>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{option.summary}</p>
      </div>)}
    </div>
  </aside>;
}

function OfficialAndMap({ source, sourceUrl, mapQuery }: { source: string; sourceUrl: string; mapQuery: string }) {
  return <div className="flex flex-wrap gap-x-3 gap-y-1 md:flex-col">
    <a href={sourceUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary underline underline-offset-4">{source} <span className="sr-only"> (opens in a new tab)</span></a>
    <a href={mapsSearchUrl(mapQuery)} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-4">Find on map <span className="sr-only"> (opens in a new tab)</span></a>
  </div>;
}

export function SacredHillSiteHours({ id }: { id: SacredHillId }) {
  const facts = sacredHillPlanning[id].facts;
  return <Section id="visit-facts" title="Opening Hours & Entrance Fees">
    <p className="mt-3 max-w-3xl leading-relaxed text-muted-foreground">These are reference opening hours and fees. Churches may change their schedules for worship, holidays or local circumstances, so check the linked source before travelling specifically to a site.</p>
    
    <div className="mt-3 max-w-full overflow-x-auto rounded-xl border bg-card focus-visible:outline-2 focus-visible:outline-primary" role="region" aria-label="Opening hours and entrance fees comparison" tabIndex={0} data-testid="sacred-hours-table">
      <table className="w-full min-w-[740px] border-collapse text-left text-sm">
        <thead className="bg-secondary/60">
          <tr className="border-b">
            <th scope="col" className="w-[27%] p-3 font-semibold">Site</th>
            <th scope="col" className="w-[30%] p-3 font-semibold">Usual visiting hours</th>
            <th scope="col" className="w-[21%] p-3 font-semibold">Admission</th>
            <th scope="col" className="w-[22%] p-3 font-semibold">Details</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {facts.map(fact => <tr key={fact.site} className="align-top">
            <th scope="row" className="p-3 font-semibold leading-snug">{fact.site}</th>
            <td className="p-3 leading-relaxed">{fact.hours}</td>
            <td className="p-3 leading-relaxed">{fact.admission}</td>
            <td className="p-3 text-sm leading-relaxed"><OfficialAndMap source={fact.source} sourceUrl={fact.sourceUrl} mapQuery={fact.mapQuery} /></td>
          </tr>)}
        </tbody>
      </table>
    </div>
    <p className="mt-3 text-xs text-muted-foreground">Where a fee is listed, it is in Israeli shekels (ILS) per visitor unless stated otherwise. Current admission and availability are confirmed at the site.</p>
  </Section>;
}

/** These are navigation links, not unverified walking-time or route-length claims. */
export function SacredHillWalkingMaps({ id }: { id: SacredHillId }) {
  const planning = sacredHillPlanning[id];
  return <div aria-labelledby="walking-maps-h" className="mt-6 rounded-xl border bg-card p-4 sm:p-5">
    <h3 id="walking-maps-h" className="text-xl font-semibold">Walking connections</h3>
    <ul className="mt-3 grid gap-3 sm:grid-cols-2">
      {planning.walks.map(leg => <li key={leg.label} className="rounded-lg bg-secondary/40 p-3">
        <a href={mapsWalkUrl(leg.from,leg.to)} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary underline underline-offset-4">{leg.label} </a>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{leg.detail}</p>
      </li>)}
    </ul>
    <p className="mt-4 text-sm leading-relaxed">{planning.accessNote}</p>
  </div>;
}
