import { useEffect, useRef, useState } from "react";
import { ExternalLink, MapPin } from "lucide-react";

/** Map markers correspond to visitor sites; the tomb and Upper Room share a historic building. */
const points = [
  { id: "zion-gate", name: "Zion Gate", note: "Gateway to the Armenian and Jewish Quarters", area: "gate", query: "Zion Gate Jerusalem Israel", lat: 31.772861, lon: 35.229361 },
  { id: "dormition", name: "Dormition Abbey", note: "Basilica, mosaics and crypt", area: "central", query: "Dormition Abbey Mount Zion Jerusalem Israel", lat: 31.772097, lon: 35.228986 },
  { id: "cenacle", name: "Room of the Last Supper", note: "Upper floor of the historic complex", area: "central", query: "Cenacle Mount Zion Jerusalem Israel", lat: 31.771719, lon: 35.229238 },
  { id: "david-tomb", name: "David's Tomb", note: "Jewish prayer site beneath the Upper Room", area: "central", query: "King David Tomb Mount Zion Jerusalem Israel", lat: 31.771719, lon: 35.229238 },
  { id: "holocaust", name: "Chamber of the Holocaust", note: "Memorial close to David's Tomb", area: "central", query: "Chamber of the Holocaust Mount Zion Jerusalem Israel", lat: 31.771547, lon: 35.229633 },
  { id: "gallicantu", name: "St Peter in Gallicantu", note: "Lower hillside; approach from Hebron Road", area: "lower", query: "Saint Peter in Gallicantu Jerusalem Israel", lat: 31.77139, lon: 35.23194 },
  { id: "schindler", name: "Oskar Schindler's grave", note: "Catholic cemetery entrance on the southern slope", area: "lower", query: "Oskar Schindler Grave Catholic Cemetery Mount Zion Jerusalem Israel", lat: 31.771415, lon: 35.230547 },
] as const;

const pinColors = { gate: "bg-amber-600", central: "bg-blue-700", lower: "bg-emerald-700" } as const;
const googleSearch = (query: string) => "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(query);
const mapUrl = "/maps/mount-zion.html?points=" + encodeURIComponent(JSON.stringify(points));

export function MountZionMap() {
  const frame = useRef<HTMLIFrameElement>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const active = points.find(point => point.id === selected);
  const send = (id: string) => {
    setSelected(id === "all" ? null : id);
    frame.current?.contentWindow?.postMessage({ type: "mount-zion-map-focus", id }, window.location.origin);
  };
  useEffect(() => {
    const receive = (event: MessageEvent) => {
      if (event.origin !== window.location.origin || event.source !== frame.current?.contentWindow) return;
      if (event.data?.type !== "mount-zion-map-selected") return;
      if (points.some(point => point.id === event.data.id)) setSelected(event.data.id);
    };
    window.addEventListener("message", receive);
    return () => window.removeEventListener("message", receive);
  }, []);

  return <section aria-label="Mount Zion sites on an interactive map" data-testid="mount-zion-map" className="overflow-hidden rounded-2xl border bg-card">
    <div className="border-b bg-secondary/20 px-4 py-4 sm:px-5">
      <h3 className="flex items-center gap-2 text-lg font-semibold"><MapPin className="size-5 text-primary" aria-hidden="true" /> Mount Zion sites on the map</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">Gold marks Zion Gate, blue marks the central landmarks, and green marks the lower hillside sites.</p>
    </div>
    <div className="grid lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)]">
      <iframe
        ref={frame}
        title="Interactive map of all seven Mount Zion visitor sites"
        src={mapUrl}
        width={900}
        height={445}
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        className="h-[345px] w-full border-0 sm:h-[405px] lg:h-full lg:min-h-[455px]"
      />
      <div className="border-t p-3 lg:border-l lg:border-t-0">
        <div className="mb-2 flex items-center justify-between gap-2 px-1">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Select a place</p>
          <button type="button" onClick={() => send("all")} className="text-xs font-semibold text-primary hover:underline">Show all</button>
        </div>
        <ol className="grid gap-1.5 sm:grid-cols-2 lg:grid-cols-1">
          {points.map((point, index) => <li key={point.id}>
            <button type="button" aria-pressed={selected === point.id} onClick={() => send(point.id)} className={"flex w-full items-start gap-2.5 rounded-lg border p-2.5 text-left transition-colors hover:border-primary/50 hover:bg-secondary/40 focus-visible:outline-2 focus-visible:outline-primary " + (selected === point.id ? "border-primary/70 bg-secondary/50" : "border-border/70")}>
              <span aria-hidden="true" className={"grid size-6 shrink-0 place-items-center rounded-full text-xs font-bold text-white " + pinColors[point.area]}>{index + 1}</span>
              <span className="min-w-0"><span className="block text-sm font-semibold leading-tight">{point.name}</span><span className="mt-0.5 block text-xs leading-snug text-muted-foreground">{point.note}</span></span>
            </button>
          </li>)}
        </ol>
      </div>
    </div>
    <div className="flex flex-wrap items-center justify-between gap-3 border-t px-4 py-3 text-xs text-muted-foreground sm:px-5">
      <span>Map data © OpenStreetMap contributors · locations approximate</span>
      <a href={googleSearch(active?.query ?? "Mount Zion Jerusalem Israel")} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-semibold text-primary hover:underline">Open in Google Maps <ExternalLink className="size-4" aria-hidden="true" /></a>
    </div>
  </section>;
}
