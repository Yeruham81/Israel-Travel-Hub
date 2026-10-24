import { sacredHillPlanning } from "@/data/sacredHillPlanning";
import type { SacredHillId } from "@/data/sacredHillGuides";
import { Section } from "@/components/Guide";

export const mapsSearchUrl = (place: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place)}`;

export const mapsWalkUrl = (from: string, to: string) =>
  `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(from)}&destination=${encodeURIComponent(to)}&travelmode=walking`;

/** Adds day-sensitive route variants without repeating the full editorial walking route twice. */
export function SacredHillDayPlanning({ id }: { id: SacredHillId }) {
  const options = sacredHillPlanning[id].days;
  return <div className="mt-6 rounded-xl border bg-secondary/30 p-4 sm:p-5" aria-labelledby="choose-day-h">
    <h3 id="choose-day-h" className="text-xl font-semibold">Choose the right day for your route</h3>
    <p className="mt-2 text-sm text-muted-foreground">Some churches have shorter visiting windows. Open the option that matches your visit to see how I'd arrange the stops.</p>
    <div className="mt-3 grid gap-3 sm:grid-cols-2">
      {options.map(option => <div key={option.title} className="self-start rounded-xl border bg-card p-4">
        <h4 className="font-semibold leading-snug">{option.title}</h4>
        <p className="mt-2 text-sm leading-relaxed">{option.summary}</p>
        <details className="mt-3">
          <summary className="cursor-pointer text-sm font-semibold text-primary">See a suggested sequence</summary>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-relaxed marker:font-semibold marker:text-primary">
            {option.steps.map(step => <li key={step}>{step}</li>)}
          </ol>
          {option.caution && <p className="mt-3 border-t pt-3 text-xs leading-relaxed text-muted-foreground">{option.caution}</p>}
        </details>
      </div>)}
    </div>
  </div>;
}

export function SacredHillSiteHours({ id }: { id: SacredHillId }) {
  return <Section id="visit-facts" title="Opening hours and admission at a glance">
    <p className="mt-3 max-w-3xl leading-relaxed text-muted-foreground">These are published reference hours and prices, not real-time availability. Individual sites may adjust entry for religious services, holidays or local conditions. Check the linked source before making a special trip.</p>
    <div className="mt-5 overflow-x-auto rounded-xl border bg-card">
      <table className="w-full min-w-[620px] border-collapse text-left text-sm">
        <thead className="bg-secondary/60">
          <tr className="border-b"><th scope="col" className="p-3 font-semibold">Site</th><th scope="col" className="p-3 font-semibold">Usual visitor hours</th><th scope="col" className="p-3 font-semibold">Admission</th><th scope="col" className="p-3 font-semibold">Details</th></tr>
        </thead>
        <tbody className="divide-y">
          {sacredHillPlanning[id].facts.map(row => <tr key={row.site} className="align-top">
            <th scope="row" className="w-1/4 p-3 font-semibold leading-snug">{row.site}</th>
            <td className="w-[34%] p-3 leading-relaxed">{row.hours}</td>
            <td className="w-[22%] p-3 leading-relaxed">{row.admission}</td>
            <td className="p-3 leading-relaxed">
              <div className="flex flex-col gap-2">
                <a href={row.sourceUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary underline underline-offset-4">{row.source} <span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span></a>
                <a href={mapsSearchUrl(row.mapQuery)} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-4">Find on map <span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span></a>
              </div>
            </td>
          </tr>)}
        </tbody>
      </table>
    </div>
    <p className="mt-3 text-xs text-muted-foreground">On smaller screens, the table scrolls horizontally. Prices, when published, are in Israeli shekels (ILS) per person.</p>
  </Section>;
}

export function SacredHillWalkingMaps({ id }: { id: SacredHillId }) {
  const planning = sacredHillPlanning[id];
  return <section aria-labelledby="walking-maps-h" className="mt-7 rounded-xl border bg-card p-4 sm:p-5">
    <h3 id="walking-maps-h" className="text-xl font-semibold">Walking directions between key stops</h3>
    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">These links open a walking route in Google Maps. Check the route shown and local access when you travel; church grounds and pedestrian passages may have separate entrances.</p>
    <ul className="mt-4 grid gap-3 sm:grid-cols-2">
      {planning.walks.map(leg => <li key={leg.label} className="rounded-lg bg-secondary/40 p-3">
        <a href={mapsWalkUrl(leg.from,leg.to)} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary underline underline-offset-4">{leg.label} <span aria-hidden="true">↗</span></a>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{leg.detail}</p>
      </li>)}
    </ul>
    <p className="mt-4 text-sm leading-relaxed">{planning.accessNote}</p>
  </section>;
}
