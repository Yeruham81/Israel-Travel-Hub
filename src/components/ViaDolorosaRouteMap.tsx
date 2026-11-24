import { ConsentIframe } from "@/components/ConsentIframe";
import { useEffect, useRef, useState } from "react";
import { ExternalLink, MapPin } from "lucide-react";

/** Street markers are approximate orientation points, with one common marker for stations X–XIV inside the basilica. */
const points = [
  { id: "1", name: "I · Condemnation", note: "Al-Umariyya School vicinity", lat: 31.78030, lon: 35.23500, query: "Umariya School Via Dolorosa Jerusalem", area: "street" },
  { id: "2", name: "II · Taking up the cross", note: "Flagellation and Condemnation chapels", lat: 31.78025, lon: 35.23462, query: "Church of the Flagellation Via Dolorosa Jerusalem", area: "street" },
  { id: "3", name: "III · First fall", note: "Via Dolorosa at Al-Wad", lat: 31.77975, lon: 35.23265, query: "Station III Via Dolorosa Jerusalem", area: "street" },
  { id: "4", name: "IV · Meeting Mary", note: "Armenian Catholic chapel", lat: 31.77948, lon: 35.23260, query: "Station IV Via Dolorosa Jerusalem", area: "street" },
  { id: "5", name: "V · Simon of Cyrene", note: "Westward turn from Al-Wad", lat: 31.77939, lon: 35.23255, query: "Station V Via Dolorosa Jerusalem", area: "street" },
  { id: "6", name: "VI · Veronica", note: "Along the westward street", lat: 31.77955, lon: 35.23175, query: "Station VI Via Dolorosa Jerusalem", area: "street" },
  { id: "7", name: "VII · Second fall", note: "Khan al-Zeit market junction", lat: 31.77948, lon: 35.23083, query: "Station VII Via Dolorosa Jerusalem", area: "street" },
  { id: "8", name: "VIII · Women of Jerusalem", note: "Al-Khanqa lane wall marker", lat: 31.77992, lon: 35.23045, query: "Station VIII Via Dolorosa Jerusalem", area: "street" },
  { id: "9", name: "IX · Third fall", note: "Coptic monastery approach", lat: 31.77934, lon: 35.22998, query: "Station IX Via Dolorosa Jerusalem", area: "street" },
  { id: "10-14", name: "X–XIV · Holy Sepulchre", note: "Five stations inside the basilica", lat: 31.77830, lon: 35.22973, query: "Church of the Holy Sepulchre Jerusalem", area: "church" },
] as const;

const mapUrl = "/maps/via-dolorosa.html?points=" + encodeURIComponent(JSON.stringify(points));
const googleSearch = (query: string) => "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(query);
export function ViaDolorosaRouteMap() {
  const frame = useRef<HTMLIFrameElement>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const active = points.find(p => p.id === selected);
  const focus = (id: string) => {
    setSelected(id === "all" ? null : id);
    frame.current?.contentWindow?.postMessage({ type: "via-dolorosa-map-focus", id }, window.location.origin);
  };
  useEffect(() => {
    const receive = (event: MessageEvent) => {
      if (event.origin !== window.location.origin || event.source !== frame.current?.contentWindow) return;
      if (event.data?.type !== "via-dolorosa-map-selected") return;
      if (points.some(p => p.id === event.data.id)) setSelected(event.data.id);
    };
    window.addEventListener("message", receive);
    return () => window.removeEventListener("message", receive);
  }, []);
  return <section data-testid="via-dolorosa-map" aria-label="Via Dolorosa stations map" className="overflow-hidden rounded-2xl border bg-card">
    <div className="border-b bg-secondary/20 px-4 py-4 sm:px-5">
      <h3 className="flex items-center gap-2 text-lg font-semibold"><MapPin className="size-5 text-primary" aria-hidden="true"/> Stations of the Cross on the map</h3>
      <p className="mt-1.5 text-sm text-muted-foreground">Blue pins mark the nine outdoor stations. The gold pin marks the Church of the Holy Sepulchre, home to Stations X–XIV.</p>
    </div>
    <div className="grid lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)]">
      <ConsentIframe ref={frame} title="Interactive map with nine street Stations of the Cross and the Holy Sepulchre" src={mapUrl} width={900} height={520} loading="lazy" referrerPolicy="strict-origin-when-cross-origin" className="h-[360px] w-full border-0 sm:h-[410px] lg:h-full lg:min-h-[610px]"/>
      <div className="border-t p-3 lg:border-l lg:border-t-0">
        <div className="mb-2 flex items-center justify-between gap-2 px-1">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Select a station</p>
          <button type="button" onClick={() => focus("all")} className="text-xs font-semibold text-primary hover:underline">Show all</button>
        </div>
        <ol className="grid gap-1.5 sm:grid-cols-2 lg:grid-cols-1">
          {points.map((p,i)=><li key={p.id}>
            <button type="button" aria-pressed={selected === p.id} onClick={() => focus(p.id)} className={"flex w-full items-start gap-2.5 rounded-lg border p-2.5 text-left transition-colors hover:border-primary/50 hover:bg-secondary/40 focus-visible:outline-2 focus-visible:outline-primary "+(selected === p.id?"border-primary/70 bg-secondary/50":"border-border/70")}>
              <span aria-hidden="true" className={"grid size-7 shrink-0 place-items-center rounded-full text-xs font-bold text-white "+(p.area==="church"?"bg-amber-600":"bg-blue-700")}>{i===9?"X–XIV":i+1}</span>
              <span className="min-w-0"><span className="block text-sm font-semibold leading-tight">{p.name}</span><span className="mt-0.5 block text-xs leading-snug text-muted-foreground">{p.note}</span></span>
            </button>
          </li>)}
        </ol>
      </div>
    </div>
    <div className="flex flex-wrap items-center justify-between gap-3 border-t px-4 py-3 text-xs text-muted-foreground sm:px-5">
      <span>Map data © OpenStreetMap contributors · street markers approximate</span>
      <a href={googleSearch(active?.query ?? "Via Dolorosa Jerusalem Israel")} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-semibold text-primary hover:underline">Open in Google Maps <ExternalLink className="size-4" aria-hidden="true"/></a>
    </div>
  </section>;
}
