import { MapPin, ExternalLink } from "lucide-react";
import type { NeighborhoodStayGuide } from "@/data/content";

/** A real, key-free map. The external link also works if an embed is blocked. */
export function AreaMap({ area, compact = false }: { area: Pick<NeighborhoodStayGuide, "name" | "map">; compact?: boolean }) {
  const { lat, lon, bounds, reference } = area.map;
  const embed = `https://www.openstreetmap.org/export/embed.html?bbox=${bounds.join("%2C")}&layer=mapnik&marker=${lat}%2C${lon}`;
  const fullMap = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}#map=15/${lat}/${lon}`;
  return (
    <figure className="min-w-0 overflow-hidden rounded-xl border bg-muted">
      <iframe
        title={`Map of ${area.name} — ${reference}`}
        src={embed}
        width="600"
        height={compact ? "180" : "340"}
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        className={`w-full border-0 ${compact ? "h-44" : "h-72 sm:h-80"}`}
      />
      <figcaption className="bg-card px-3 py-2 text-xs leading-relaxed text-muted-foreground">
        <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden /> {reference}</span>
        <a href={fullMap} target="_blank" rel="noopener noreferrer" className="mt-1 inline-flex items-center gap-1 font-semibold text-primary underline underline-offset-2">
          Open a larger map <ExternalLink className="h-3 w-3" aria-hidden /><span className="sr-only"> (opens in a new tab)</span>
        </a>
        {!compact && <p className="mt-1">The pin is an area reference point, not a hotel location or a neighborhood boundary. Map data © OpenStreetMap contributors.</p>}
      </figcaption>
    </figure>
  );
}

export function AreaPhotoCredit({ areas }: { areas: NeighborhoodStayGuide[] }) {
  return (
    <details className="mt-10 rounded-xl border bg-card p-4 text-xs text-muted-foreground">
      <summary className="cursor-pointer font-semibold">Area image sources</summary>
      <p className="mt-3">Neighborhood photographs and their original sources. Images have been resized and optimized for this site.</p>
      <ul className="mt-2 space-y-2">
        {areas.map((area) => <li key={area.id}><a href={area.photo.sourceUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">{area.name}: {area.photo.credit || "Image from the publisher's original city guide"} ↗<span className="sr-only"> (opens in a new tab)</span></a></li>)}
      </ul>
    </details>
  );
}
