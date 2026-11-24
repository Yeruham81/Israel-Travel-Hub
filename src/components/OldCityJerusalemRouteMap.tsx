import { ConsentIframe } from "@/components/ConsentIframe";
import { useEffect, useRef, useState } from "react";
import { ExternalLink, MapPin } from "lucide-react";

const stops = [
  { id: "western-wall", name: "Western Wall", note: "Prayer plaza · near Dung Gate", lat: 31.7767, lon: 35.2345, query: "Western Wall Plaza Jerusalem Israel", type: "site" },
  { id: "holy-sepulchre", name: "Church of the Holy Sepulchre", note: "Christian Quarter · Jaffa or New Gate", lat: 31.7783, lon: 35.2297, query: "Church of Holy Sepulchre Jerusalem Israel", type: "site" },
  { id: "via-dolorosa", name: "Via Dolorosa", note: "Early stations in the Muslim Quarter", lat: 31.7797, lon: 35.2336, query: "Via Dolorosa Jerusalem Israel", type: "site" },
  { id: "temple-mount", name: "Temple Mount", note: "Representative location near Dome of the Rock", lat: 31.7780, lon: 35.2358, query: "Temple Mount Jerusalem Israel", type: "site" },
  { id: "cardo", name: "Jewish Quarter & Cardo", note: "Roman-era street near Hurva Synagogue", lat: 31.7756, lon: 35.2311, query: "Cardo Jewish Quarter Jerusalem Israel", type: "site" },
  { id: "tower", name: "Tower of David Museum", note: "Museum entrance opposite Jaffa Gate Plaza", lat: 31.7765, lon: 35.2282, query: "Tower of David Jerusalem Museum entrance Jerusalem Israel", type: "site" },
  { id: "tunnels", name: "Western Wall Tunnels", note: "Guided tours · check booked meeting point", lat: 31.77715, lon: 35.23425, query: "Western Wall Tunnels entrance Jerusalem Israel", type: "site" },
  { id: "markets", name: "Muslim Quarter markets", note: "Souks inside Damascus Gate", lat: 31.7805, lon: 35.2316, query: "Muslim Quarter Markets Jerusalem Israel", type: "site" },
  { id: "jaffa-gate", name: "Jaffa Gate", note: "Tower of David, Christian and Armenian Quarters", lat: 31.77661, lon: 35.22755, query: "Jaffa Gate Jerusalem Israel", type: "gate" },
  { id: "dung-gate", name: "Dung Gate", note: "Western Wall and Jewish Quarter", lat: 31.77472, lon: 35.23389, query: "Dung Gate Jerusalem Israel", type: "gate" },
  { id: "damascus-gate", name: "Damascus Gate", note: "Markets and northern Via Dolorosa", lat: 31.781639, lon: 35.2305, query: "Damascus Gate Jerusalem Israel", type: "gate" },
  { id: "zion-gate", name: "Zion Gate", note: "Armenian and Jewish Quarters, Mount Zion", lat: 31.772861, lon: 35.229361, query: "Zion Gate Jerusalem Israel", type: "gate" },
  { id: "lions-gate", name: "Lion's Gate", note: "Eastern approach and Mount of Olives connection", lat: 31.78083, lon: 35.23694, query: "Lions Gate Jerusalem Israel", type: "gate" },
  { id: "new-gate", name: "New Gate", note: "Direct approach to the Christian Quarter", lat: 31.7797, lon: 35.2278, query: "New Gate Jerusalem Israel", type: "gate" },
] as const;

const overviewUrl = "/maps/jerusalem-old-city.html?points=" + encodeURIComponent(JSON.stringify(stops));
const googleLink = (query: string) => "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(query);

export function OldCityJerusalemRouteMap() {
  const frame = useRef<HTMLIFrameElement>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const active = stops.find(stop => stop.id === selected);
  const focus = (id: string) => {
    setSelected(id === "all" ? null : id);
    frame.current?.contentWindow?.postMessage({ type: "jerusalem-old-city-map-focus", id }, window.location.origin);
  };
  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin || event.source !== frame.current?.contentWindow) return;
      if (event.data?.type !== "jerusalem-old-city-map-selected") return;
      if (stops.some(stop => stop.id === event.data.id)) setSelected(event.data.id);
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);
  const siteCount = stops.filter(stop => stop.type === "site").length;
  return <section data-testid="jerusalem-old-city-map" className="overflow-hidden rounded-2xl border bg-card" aria-label="Interactive map of the Old City of Jerusalem">
    <div className="border-b bg-secondary/20 p-4 sm:px-5">
      <h3 className="flex items-center gap-2 text-lg font-semibold"><MapPin className="size-5 text-primary" aria-hidden="true"/> Old City sights and entrance gates</h3>
      <p className="mt-1.5 text-sm text-muted-foreground">Select a landmark or an entrance gate to locate it on the map. Blue numbers mark landmarks; gold letters mark gates.</p>
    </div>
    <div className="grid lg:grid-cols-[minmax(0,1.48fr)_minmax(0,1fr)]">
      <ConsentIframe ref={frame} title="Map showing eight Old City landmarks and six entrance gates together" src={overviewUrl} width={900} height={530} loading="lazy" referrerPolicy="strict-origin-when-cross-origin" className="h-[365px] w-full border-0 sm:h-[460px] lg:h-full lg:min-h-[720px]" />
      <div className="border-t p-3 lg:border-l lg:border-t-0">
        <div className="mb-2 flex items-center justify-between gap-3 px-1">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Find a place</p>
          <button type="button" onClick={() => focus("all")} className="text-xs font-semibold text-primary hover:underline">Show all</button>
        </div>
        <p className="mb-2 px-1 text-xs font-semibold text-blue-700">Landmarks</p>
        <ol className="grid gap-1.5 sm:grid-cols-2 lg:grid-cols-1">
          {stops.slice(0, siteCount).map((stop, index) => <li key={stop.id}>
            <button type="button" aria-pressed={selected === stop.id} onClick={() => focus(stop.id)} className={"flex w-full items-start gap-2 rounded-lg border p-2 text-left transition-colors hover:border-primary/50 hover:bg-secondary/40 focus-visible:outline-2 focus-visible:outline-primary " + (selected === stop.id ? "border-primary bg-secondary/50" : "border-border/70")}>
              <span aria-hidden="true" className="grid size-6 shrink-0 place-items-center rounded-full bg-blue-700 text-xs font-bold text-white">{index + 1}</span>
              <span className="min-w-0"><span className="block text-sm font-semibold leading-snug">{stop.name}</span><span className="block text-xs leading-snug text-muted-foreground">{stop.note}</span></span>
            </button>
          </li>)}
        </ol>
        <p className="mb-2 mt-4 px-1 text-xs font-semibold text-amber-700">Entrance gates</p>
        <ol className="grid gap-1.5 sm:grid-cols-2 lg:grid-cols-1">
          {stops.slice(siteCount).map((stop, index) => <li key={stop.id}>
            <button type="button" aria-pressed={selected === stop.id} onClick={() => focus(stop.id)} className={"flex w-full items-start gap-2 rounded-lg border p-2 text-left transition-colors hover:border-primary/50 hover:bg-secondary/40 focus-visible:outline-2 focus-visible:outline-primary " + (selected === stop.id ? "border-primary bg-secondary/50" : "border-border/70")}>
              <span aria-hidden="true" className="grid size-6 shrink-0 place-items-center rounded-full bg-amber-600 text-xs font-bold text-white">{String.fromCharCode(65 + index)}</span>
              <span className="min-w-0"><span className="block text-sm font-semibold leading-snug">{stop.name}</span><span className="block text-xs leading-snug text-muted-foreground">{stop.note}</span></span>
            </button>
          </li>)}
        </ol>
      </div>
    </div>
    <div className="flex flex-wrap items-center justify-between gap-3 border-t px-4 py-3 text-xs text-muted-foreground sm:px-5">
      <span>Map data © OpenStreetMap contributors · marker positions approximate</span>
      <a href={googleLink(active?.query ?? "Old City Jerusalem Israel")} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-semibold text-primary hover:underline">Open in Google Maps <ExternalLink className="size-4" aria-hidden="true"/></a>
    </div>
  </section>;
}
