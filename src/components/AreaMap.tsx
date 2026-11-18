import { MapPin, ExternalLink } from "lucide-react";
import type { NeighborhoodStayGuide } from "@/data/content";
import { isPublisherUrl } from "@/data/registry";

/** Google Maps neighborhood overview; no hotel entrance pin is implied. */
export function AreaMap({ area, compact = false }: { area: Pick<NeighborhoodStayGuide, "name" | "map">; compact?: boolean }) {
  const { lat, lon, reference } = area.map;
  const query = encodeURIComponent(`${lat},${lon}`);
  const mapUrl = `https://maps.google.com/maps?q=${query}&z=14&output=embed`;
  const externalUrl = `https://www.google.com/maps/search/?api=1&query=${query}`;
  return (
    <figure className="min-w-0 overflow-hidden rounded-xl border bg-muted">
      <iframe
        title={`Google Maps view of ${area.name} — ${reference}`}
        src={mapUrl}
        width="600"
        height={compact ? "180" : "340"}
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        className={`w-full border-0 ${compact ? "h-44" : "h-72 sm:h-80"}`}
      />
      <figcaption className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 bg-card px-3 py-2 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden /> {reference}</span>
        <a href={externalUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-semibold text-primary underline underline-offset-2">
          Open in Google Maps <ExternalLink className="h-3 w-3" aria-hidden /><span className="sr-only"> (opens in a new tab)</span>
        </a>

      </figcaption>
    </figure>
  );
}

export function AreaPhotoCredit({ areas }: { areas: NeighborhoodStayGuide[] }) {
  const creditedAreas = areas.filter((area) => !isPublisherUrl(area.photo.sourceUrl));
  if (!creditedAreas.length) return null;
  return (
    <details className="mt-10 rounded-xl border bg-card p-4 text-xs text-muted-foreground">
      <summary className="cursor-pointer font-semibold">Area image sources</summary>
      <p className="mt-3">Neighborhood photographs and their original sources. Images have been resized and optimized for this site.</p>
      <ul className="mt-2 space-y-2">
        {creditedAreas.map((area) => <li key={area.id}><a href={area.photo.sourceUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">{area.name}{area.photo.credit ? `: ${area.photo.credit}` : ""}<span className="sr-only"> (opens in a new tab)</span></a></li>)}
      </ul>
    </details>
  );
}
