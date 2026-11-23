import { useState } from "react";
import { ArrowUpRight, MapPin } from "lucide-react";

const stops = [
  { name: "Clock Tower Square", query: "Jaffa Clock Tower Tel Aviv Yafo Israel", detail: "A central starting point" },
  { name: "Mahmoudiya Mosque", query: "Mahmoudiya Mosque Jaffa Israel", detail: "Ottoman landmark" },
  { name: "Flea Market", query: "Jaffa Flea Market Tel Aviv Yafo Israel", detail: "Stalls, shops and cafés" },
  { name: "Summit Garden", query: "Gan HaPisga Old Jaffa Israel", detail: "Coastal panorama" },
  { name: "Wishing Bridge", query: "Wishing Bridge Old Jaffa Israel", detail: "Zodiac plaques" },
  { name: "Kedumim Square", query: "Kedumim Square Old Jaffa Israel", detail: "Historic hilltop" },
  { name: "St. Peter's Church", query: "St Peter's Church Jaffa Israel", detail: "Franciscan church" },
  { name: "Zodiac Alleys", query: "Mazal Dagim Old Jaffa Israel", detail: "Artists' quarter" },
  { name: "Ilana Goor Museum", query: "Ilana Goor Museum 4 Mazal Dagim Old Jaffa Israel", detail: "Art collection" },
  { name: "Uri Geller Museum", query: "Uri Geller Museum 7 Mazal Arieh Old Jaffa Israel", detail: "Pre-booked visits" },
  { name: "Jaffa Port", query: "Jaffa Port Tel Aviv Yafo Israel", detail: "Waterfront and harbour" },
  { name: "Na Laga'at Center", query: "Na Laga'at Center Jaffa Port Israel", detail: "Performances and dining" },
] as const;

/** Google Maps search embeds locate the selected pin without requiring an API key. */
export function JaffaAttractionsMap() {
  const [index, setIndex] = useState(0);
  const selected = stops[index]!;
  const mapUrl = "https://maps.google.com/maps?q=" + encodeURIComponent(selected.query) + "&hl=en&z=17&t=m&output=embed";
  const placeUrl = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(selected.query);
  return <section data-testid="jaffa-interactive-map" className="rounded-xl border bg-card p-4 sm:p-5" aria-label="Jaffa attraction locations">
    <div className="flex items-center gap-2"><MapPin className="h-5 w-5 shrink-0 text-primary" aria-hidden="true"/><h3 className="font-serif text-xl font-semibold">Locate Jaffa's attractions</h3></div>
    <p className="mt-2 text-sm leading-relaxed">Select a numbered stop to locate its Google Maps pin. Open a location to see its streets and directions.</p>
    <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
      <div className="min-w-0">
        <iframe key={selected.query} title={"Map of " + selected.name + " in Jaffa"} src={mapUrl} loading="lazy" referrerPolicy="strict-origin-when-cross-origin" className="h-72 w-full rounded-lg border-0 sm:h-96"/>
        <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-sm">
          <span className="font-semibold">{index + 1}. {selected.name}</span>
          <a href={placeUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-semibold text-primary underline underline-offset-4">Open in Google Maps <ArrowUpRight className="h-4 w-4" aria-hidden="true"/></a>
        </div>
      </div>
      <ol className="grid max-h-[24rem] grid-cols-1 gap-2 overflow-y-auto pr-1 sm:grid-cols-2 lg:grid-cols-1" aria-label="Choose a Jaffa attraction">
        {stops.map((stop, n) => <li key={stop.query}>
          <button type="button" data-testid="jaffa-map-stop" aria-pressed={n === index} onClick={() => setIndex(n)} className={"flex w-full items-start gap-3 rounded-lg border p-2.5 text-left transition-colors focus-visible:outline-2 focus-visible:outline-primary " + (n === index ? "border-primary bg-primary/10" : "bg-secondary/20 hover:border-primary/60 hover:bg-secondary/50")}>
            <span className={"flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold " + (n === index ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground")}>{n + 1}</span>
            <span className="min-w-0"><strong className="block text-sm leading-snug">{stop.name}</strong><span className="block text-xs text-muted-foreground">{stop.detail}</span></span>
          </button>
        </li>)}
      </ol>
    </div>
  </section>;
}
