import { useEffect, useRef, useState } from "react";
import { MapPin } from "lucide-react";

/** Source positions are OpenStreetMap landmarks and representative old-town street coordinates. */
const stops = [
  { id: "clock-tower", name: "Clock Tower Square", lat: 32.05507, lon: 34.75627, query: "Jaffa Clock Tower Tel Aviv Yafo Israel", detail: "A central starting point" },
  { id: "mahmoudiya", name: "Mahmoudiya Mosque", lat: 32.05496, lon: 34.75582, query: "Mahmoudiya Mosque Jaffa Israel", detail: "Ottoman landmark" },
  { id: "flea-market", name: "Flea Market", lat: 32.05346, lon: 34.75635, query: "Jaffa Flea Market Tel Aviv Yafo Israel", detail: "Stalls, shops and cafés" },
  { id: "summit-garden", name: "Summit Garden", lat: 32.05457, lon: 34.75299, query: "Gan HaPisga Old Jaffa Israel", detail: "Coastal panorama" },
  { id: "wishing-bridge", name: "Wishing Bridge", lat: 32.05423, lon: 34.75275, query: "Wishing Bridge Old Jaffa Israel", detail: "Zodiac plaques" },
  { id: "kedumim", name: "Kedumim Square", lat: 32.05462, lon: 34.75213, query: "Kedumim Square Old Jaffa Israel", detail: "Historic hilltop" },
  { id: "st-peter", name: "St. Peter's Church", lat: 32.05475, lon: 34.75206, query: "St Peter's Church Jaffa Israel", detail: "Franciscan church" },
  { id: "zodiac-alleys", name: "Zodiac Alleys", lat: 32.05390, lon: 34.75204, query: "Mazal Dagim Old Jaffa Israel", detail: "Artists' quarter" },
  { id: "ilana-goor", name: "Ilana Goor Museum", lat: 32.05330, lon: 34.75136, query: "Ilana Goor Museum 4 Mazal Dagim Old Jaffa Israel", detail: "Art collection" },
  { id: "uri-geller", name: "Uri Geller Museum", lat: 32.05320, lon: 34.75170, query: "Uri Geller Museum 7 Mazal Arieh Old Jaffa Israel", detail: "Pre-booked visits" },
  { id: "jaffa-port", name: "Jaffa Port", lat: 32.05399, lon: 34.75027, query: "Jaffa Port Tel Aviv Yafo Israel", detail: "Waterfront and harbour" },
  { id: "na-lagaat", name: "Na Laga'at Center", lat: 32.05287, lon: 34.75015, query: "Na Laga'at Center Jaffa Port Israel", detail: "Performances and dining" },
] as const;

const overviewUrl = "/maps/jaffa-attractions.html?points=" + encodeURIComponent(JSON.stringify(stops));

export function JaffaAttractionsMap() {
  const frame = useRef<HTMLIFrameElement>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const focus = (id: string) => {
    setSelectedId(id === "all" ? null : id);
    frame.current?.contentWindow?.postMessage({ type: "jaffa-map-focus", id }, window.location.origin);
  };

  useEffect(() => {
    const handleSelect = (event: MessageEvent) => {
      if (event.origin !== window.location.origin || event.source !== frame.current?.contentWindow) return;
      if (event.data?.type !== "jaffa-map-selected") return;
      if (stops.some(stop => stop.id === event.data.id)) setSelectedId(event.data.id);
    };
    window.addEventListener("message", handleSelect);
    return () => window.removeEventListener("message", handleSelect);
  }, []);

  return <section data-testid="jaffa-interactive-map" className="overflow-hidden rounded-xl border bg-card" aria-label="Map of Jaffa attraction locations">
    <div className="border-b bg-secondary/20 p-4 sm:p-5">
      <div className="flex items-center gap-2">
        <MapPin className="h-5 w-5 shrink-0 text-primary" aria-hidden="true"/>
        <h3 className="font-serif text-xl font-semibold">Old Jaffa attractions map</h3>
      </div>
      <p className="mt-2 text-sm leading-relaxed">All twelve numbered places are shown together. Select a place to highlight its location.</p>
    </div>
    <div className="grid lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
      <iframe ref={frame} title="OpenStreetMap overview with twelve numbered Jaffa attractions on one map" src={overviewUrl} width={900} height={600} loading="lazy" referrerPolicy="strict-origin-when-cross-origin" className="h-[345px] w-full border-0 sm:h-[460px] lg:h-full lg:min-h-[690px]"/>
      <div className="border-t p-3 lg:border-l lg:border-t-0">
        <div className="mb-2 flex items-center justify-between gap-2 px-1">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Find a place</p>
          <button type="button" onClick={() => focus("all")} className="text-xs font-semibold text-primary hover:underline">Show all</button>
        </div>
        <ol className="grid max-h-[30rem] gap-1.5 overflow-y-auto sm:grid-cols-2 lg:max-h-none lg:grid-cols-1" aria-label="Jaffa attractions">
          {stops.map((stop, n) => <li key={stop.id}>
            <button type="button" data-testid="jaffa-map-stop" aria-pressed={selectedId === stop.id} onClick={() => focus(stop.id)} className={"flex w-full items-start gap-2 rounded-lg border p-2 text-left transition-colors hover:border-primary/50 hover:bg-secondary/40 focus-visible:outline-2 focus-visible:outline-primary " + (selectedId === stop.id ? "border-primary bg-secondary/50" : "border-border/70")}>
              <span aria-hidden="true" className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-blue-700 text-xs font-bold text-white">{n + 1}</span>
              <span className="min-w-0"><strong className="block text-sm leading-snug">{stop.name}</strong><span className="block text-xs text-muted-foreground">{stop.detail}</span></span>
            </button>
          </li>)}
        </ol>
      </div>
    </div>
    <div className="border-t px-4 py-2.5 text-xs text-muted-foreground">Map data © OpenStreetMap contributors · Site markers approximate</div>
  </section>;
}
