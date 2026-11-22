import { useState } from "react";
import { ExternalLink, MapPin } from "lucide-react";

const locations = [
  ["Zion Gate", "Zion Gate Jerusalem Israel", "Gateway to the Armenian and Jewish Quarters", "gate"],
  ["Dormition Abbey", "Dormition Abbey Mount Zion Jerusalem Israel", "Basilica, mosaics and crypt", "central"],
  ["Room of the Last Supper", "Cenacle Mount Zion Jerusalem Israel", "Upper floor of the historic complex", "central"],
  ["David's Tomb", "King David Tomb Mount Zion Jerusalem Israel", "Jewish prayer site beneath the Upper Room", "central"],
  ["Chamber of the Holocaust", "Chamber of the Holocaust Mount Zion Jerusalem Israel", "Memorial beside David's Tomb", "central"],
  ["St Peter in Gallicantu", "Saint Peter in Gallicantu Jerusalem Israel", "Lower hillside; approach from Hebron Road", "lower"],
  ["Oskar Schindler's grave", "Oskar Schindler Grave Catholic Cemetery Mount Zion Jerusalem Israel", "Catholic cemetery on the southern slope", "lower"],
] as const;
const pinColors = { gate: "bg-amber-600", central: "bg-blue-700", lower: "bg-emerald-700" } as const;
const googleSearch = (place: string) => "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(place);
const googleEmbed = (place: string) => "https://maps.google.com/maps?q=" + encodeURIComponent(place) + "&hl=en&z=17&t=m&output=embed";

export function MountZionMap() {
  const [selected, setSelected] = useState<number | null>(null);
  const location = selected === null ? "Mount Zion Jerusalem Israel" : locations[selected][1];
  return <section aria-label="Mount Zion sites on Google Maps" data-testid="mount-zion-map" className="overflow-hidden rounded-2xl border bg-card">
    <div className="border-b bg-secondary/20 px-4 py-4 sm:px-5">
      <h3 className="flex items-center gap-2 text-lg font-semibold"><MapPin className="size-5 text-primary" aria-hidden="true" /> Mount Zion sites on the map</h3>
      <p className="mt-1.5 text-sm text-muted-foreground">Select a place to find its entrance or visiting area on Google Maps.</p>
      <p className="mt-2 text-xs text-muted-foreground"><span className="font-semibold text-amber-700">Zion Gate</span> · <span className="font-semibold text-blue-700">Central sites</span> · <span className="font-semibold text-emerald-700">Lower hillside</span></p>
    </div>
    <div className="grid lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
      <iframe key={selected ?? "all"} title={selected === null ? "Mount Zion overview on Google Maps" : "Google Maps: " + locations[selected][0]} src={googleEmbed(location)} loading="lazy" referrerPolicy="strict-origin-when-cross-origin" className="h-[345px] w-full border-0 sm:h-[410px] lg:h-full lg:min-h-[470px]" />
      <div className="border-t p-3 lg:border-l lg:border-t-0">
        <div className="mb-2 flex items-center justify-between gap-2 px-1">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Choose a place</p>
          <button type="button" onClick={() => setSelected(null)} className="text-xs font-semibold text-primary hover:underline">Show area</button>
        </div>
        <ol className="grid gap-1.5 sm:grid-cols-2 lg:grid-cols-1">
          {locations.map(([name, , note, area], index) => <li key={name}>
            <button type="button" aria-pressed={selected === index} onClick={() => setSelected(index)} className={"flex w-full items-start gap-2.5 rounded-lg border p-2.5 text-left hover:border-primary/50 hover:bg-secondary/40 focus-visible:outline-2 focus-visible:outline-primary " + (selected === index ? "border-primary/70 bg-secondary/50" : "border-border/70")}>
              <span aria-hidden="true" className={"grid size-6 shrink-0 place-items-center rounded-full text-xs font-bold text-white " + pinColors[area]}>{index + 1}</span>
              <span className="min-w-0"><span className="block text-sm font-semibold">{name}</span><span className="mt-0.5 block text-xs leading-snug text-muted-foreground">{note}</span></span>
            </button>
          </li>)}
        </ol>
      </div>
    </div>
    <div className="flex flex-wrap items-center justify-between gap-3 border-t px-4 py-3 text-sm sm:px-5">
      <span className="font-medium">{selected === null ? "Mount Zion, Jerusalem" : locations[selected][0]}</span>
      <a href={googleSearch(location)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-semibold text-primary hover:underline">Open in Google Maps <ExternalLink className="size-4" aria-hidden="true" /></a>
    </div>
  </section>;
}
