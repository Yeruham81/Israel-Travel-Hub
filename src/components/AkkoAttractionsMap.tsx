import { ConsentIframe } from "@/components/ConsentIframe";
import { useEffect, useRef, useState } from "react";
import { MapPin } from "lucide-react";

/** Source positions are OpenStreetMap landmarks and representative old-town street coordinates. */
const stops = [
  {
    id: "knights-halls",
    name: "Knights’ Halls",
    lat: 32.92323,
    lon: 35.06977,
    query: "Knights Halls Hospitaller Fortress Weizmann 1 Akko Israel",
    detail: "Crusader fortress · combined ticket",
  },
  {
    id: "templars-tunnel",
    name: "Templars’ Tunnel",
    lat: 32.92085,
    lon: 35.0683,
    query: "Templars Tunnel Asher Street 37 Acre Israel",
    detail: "Underground passage · approximate midpoint",
  },
  {
    id: "turkish-bath",
    name: "Al-Basha Turkish Bath",
    lat: 32.92272,
    lon: 35.06982,
    query: "Turkish Bath House Al Basha Acre Israel",
    detail: "Ottoman hammam · combined ticket",
  },
  {
    id: "al-jazzar",
    name: "Al-Jazzar Mosque",
    lat: 32.92273,
    lon: 35.07035,
    query: "Al Jazzar Mosque Acre Israel",
    detail: "Ottoman landmark · separate admission",
  },
  {
    id: "old-market",
    name: "Old Market & Turkish Bazaar",
    lat: 32.92184,
    lon: 35.07065,
    query: "Old Akko Market Israel",
    detail: "Market lanes · free to browse",
  },
  {
    id: "fishing-harbour",
    name: "Fishing Harbour & Walls",
    lat: 32.9203,
    lon: 35.07115,
    query: "Akko Fishing Port Marina Israel",
    detail: "Waterfront · free to explore",
  },
  {
    id: "treasures-museum",
    name: "Treasures in the Wall Museum",
    lat: 32.92448,
    lon: 35.07311,
    query: "Treasures in the Wall Museum Acre Israel",
    detail: "Ethnographic museum · combined ticket",
  },
  {
    id: "ramchal",
    name: "Ramchal Synagogue",
    lat: 32.92133,
    lon: 35.06908,
    query: "Ramchal Synagogue Old Acre Israel",
    detail: "Jewish heritage · closed Saturdays",
  },
] as const;

const overviewUrl =
  "/maps/akko-attractions.html?points=" + encodeURIComponent(JSON.stringify(stops));

export function AkkoAttractionsMap() {
  const frame = useRef<HTMLIFrameElement>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const focus = (id: string) => {
    setSelectedId(id === "all" ? null : id);
    frame.current?.contentWindow?.postMessage(
      { type: "akko-map-focus", id },
      window.location.origin,
    );
  };

  useEffect(() => {
    const handleSelect = (event: MessageEvent) => {
      if (event.origin !== window.location.origin || event.source !== frame.current?.contentWindow)
        return;
      if (event.data?.type !== "akko-map-selected") return;
      if (stops.some((stop) => stop.id === event.data.id)) setSelectedId(event.data.id);
    };
    window.addEventListener("message", handleSelect);
    return () => window.removeEventListener("message", handleSelect);
  }, []);

  return (
    <section
      data-testid="akko-interactive-map"
      className="overflow-hidden rounded-xl border bg-card"
      aria-label="Map of Akko attraction locations"
    >
      <div className="border-b bg-secondary/20 p-4 sm:p-5">
        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
          <h3 className="font-serif text-xl font-semibold">Old Akko attractions map</h3>
        </div>
        <p className="mt-2 text-sm leading-relaxed">
          All eight numbered attractions are shown together. Select a place to highlight its
          location.
        </p>
      </div>
      <div className="grid lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
        <ConsentIframe
          ref={frame}
          title="OpenStreetMap overview with eight numbered Akko attractions on one map"
          src={overviewUrl}
          width={900}
          height={600}
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          className="h-[345px] w-full border-0 sm:h-[460px] lg:h-full lg:min-h-[690px]"
        />
        <div className="border-t p-3 lg:border-l lg:border-t-0">
          <div className="mb-2 flex items-center justify-between gap-2 px-1">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Find a place
            </p>
            <button
              type="button"
              onClick={() => focus("all")}
              className="text-xs font-semibold text-primary hover:underline"
            >
              Show all
            </button>
          </div>
          <ol
            className="grid max-h-[30rem] gap-1.5 overflow-y-auto sm:grid-cols-2 lg:max-h-none lg:grid-cols-1"
            aria-label="Akko attractions"
          >
            {stops.map((stop, n) => (
              <li key={stop.id}>
                <button
                  type="button"
                  data-testid="akko-map-stop"
                  aria-pressed={selectedId === stop.id}
                  onClick={() => focus(stop.id)}
                  className={
                    "flex w-full items-start gap-2 rounded-lg border p-2 text-left transition-colors hover:border-primary/50 hover:bg-secondary/40 focus-visible:outline-2 focus-visible:outline-primary " +
                    (selectedId === stop.id ? "border-primary bg-secondary/50" : "border-border/70")
                  }
                >
                  <span
                    aria-hidden="true"
                    className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-blue-700 text-xs font-bold text-white"
                  >
                    {n + 1}
                  </span>
                  <span className="min-w-0">
                    <strong className="block text-sm leading-snug">{stop.name}</strong>
                    <span className="block text-xs text-muted-foreground">{stop.detail}</span>
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>
      <div className="border-t px-4 py-2.5 text-xs text-muted-foreground">
        Map data © OpenStreetMap contributors · Site markers approximate
      </div>
    </section>
  );
}
