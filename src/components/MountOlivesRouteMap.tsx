import { useEffect, useRef, useState } from "react";
import { ExternalLink, MapPin } from "lucide-react";
import { jerusalemChurches } from "@/data/jerusalemChurches";

/** Existing church-guide locations are the source for the precise sanctuary pins. */
const sanctuary = (id: string) => {
  const place = jerusalemChurches.find(church => church.id === id);
  if (!place) throw new Error("Missing Jerusalem church location: " + id);
  return { lat: place.lat, lon: place.lon };
};

const points = [
  { id: "pater-noster", name: "Pater Noster Church", note: "Upper ridge · restricted visiting hours", ...sanctuary("pater-noster") },
  { id: "ascension", name: "Chapel of the Ascension", note: "Upper ridge · near Pater Noster", ...sanctuary("ascension") },
  { id: "viewpoint", name: "Seven Arches viewpoint", note: "Panorama near the hotel; accessible separately by car", lat: 31.77555, lon: 35.24333 },
  { id: "dominus-flevit", name: "Dominus Flevit Church", note: "Steep downhill approach", ...sanctuary("dominus-flevit") },
  { id: "mary-magdalene", name: "St Mary Magdalene Church", note: "Different entrance; short visiting windows", ...sanctuary("mary-magdalene") },
  { id: "gethsemane", name: "Church of All Nations & Gethsemane", note: "Lower hill · convenient separate pickup", ...sanctuary("all-nations") },
  { id: "mary-tomb", name: "Tomb of the Virgin Mary", note: "Near Gethsemane · long staircase", ...sanctuary("mary-tomb") },
  { id: "lions-gate", name: "Lion's Gate", note: "Onward walk into the Old City", lat: 31.78083, lon: 35.23694 },
] as const;

const mapUrl = "/maps/mount-of-olives.html?points=" + encodeURIComponent(JSON.stringify(points));

export function MountOlivesRouteMap() {
  const frame = useRef<HTMLIFrameElement>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const send = (id: string) => {
    setSelected(id === "all" ? null : id);
    frame.current?.contentWindow?.postMessage({ type: "mount-olives-map-focus", id }, window.location.origin);
  };
  useEffect(() => {
    const receive = (event: MessageEvent) => {
      if (event.origin !== window.location.origin || event.source !== frame.current?.contentWindow) return;
      if (event.data?.type !== "mount-olives-map-selected") return;
      if (points.some(point => point.id === event.data.id)) setSelected(event.data.id);
    };
    window.addEventListener("message", receive);
    return () => window.removeEventListener("message", receive);
  }, []);
  return <section aria-label="Mount of Olives sites on an interactive map" data-testid="mount-olives-map" className="overflow-hidden rounded-2xl border bg-card">
    <div className="border-b bg-secondary/20 px-4 py-4 sm:px-5">
      <h3 className="flex items-center gap-2 text-lg font-semibold"><MapPin className="size-5 text-primary" aria-hidden="true"/> The Mount of Olives on the map</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">Map key: Blue pins mark sites along the upper ridge, green pins indicate the hillside and lower sites, and the gold pin marks Lion’s Gate.</p>
    </div>
    <div className="grid lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)]">
      <iframe ref={frame} title="Interactive map with eight Mount of Olives and Old City stops" src={mapUrl} width={900} height={445} loading="lazy" referrerPolicy="strict-origin-when-cross-origin" className="h-[345px] w-full border-0 sm:h-[405px] lg:h-full lg:min-h-[455px]"/>
      <div className="border-t p-3 lg:border-l lg:border-t-0">
        <div className="mb-2 flex items-center justify-between gap-3 px-1">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Select a place</p>
          <button type="button" className="text-xs font-semibold text-primary hover:underline" onClick={() => send("all")}>Show all</button>
        </div>
        <ol className="grid grid-cols-1 gap-1.5 sm:grid-cols-2 lg:grid-cols-1">
          {points.map((point, index) => <li key={point.id}>
            <button type="button" aria-pressed={selected === point.id} onClick={() => send(point.id)} className={"flex w-full items-start gap-2.5 rounded-lg border p-2 text-left transition-colors hover:border-primary/50 hover:bg-secondary/40 focus-visible:outline-2 focus-visible:outline-primary " + (selected === point.id ? "border-primary/60 bg-secondary/50" : "border-border/70")}>
              <span aria-hidden="true" className="grid size-6 shrink-0 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground">{index + 1}</span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold leading-tight">{point.name}</span>
                <span className="mt-0.5 block text-[11px] leading-snug text-muted-foreground">{point.note}</span>
              </span>
            </button>
          </li>)}
        </ol>
      </div>
    </div>
    <div className="flex flex-wrap items-center justify-between gap-2 border-t px-4 py-3 text-xs text-muted-foreground sm:px-5">
      <span>Map data © OpenStreetMap contributors · marker locations approximate · check actual entrances and walking conditions</span>
      <a href="https://www.google.com/maps/search/?api=1&query=Mount%20of%20Olives%20Jerusalem" target="_blank" rel="noopener noreferrer" className="font-semibold text-primary hover:underline">Open Google Maps <ExternalLink className="inline h-3.5 w-3.5" aria-hidden="true"/></a>
    </div>
  </section>;
}
