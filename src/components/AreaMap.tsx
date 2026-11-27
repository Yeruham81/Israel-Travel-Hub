import { ConsentIframe } from "@/components/ConsentIframe";
import { MapPin, ExternalLink } from "lucide-react";
import type { NeighborhoodStayGuide } from "@/data/content";
import { isPublisherUrl } from "@/data/site-identity";

/** Google Maps is the default for all accommodation maps. Older local maps remain available only when explicitly requested. */
export function AreaMap({
  area,
  compact = false,
  provider = "google",
  googleZoom = 14,
  showExternalLink = true,
  stretch = false,
}: {
  area: Pick<NeighborhoodStayGuide, "name" | "map">;
  compact?: boolean;
  provider?: "local" | "google";
  googleZoom?: number;
  showExternalLink?: boolean;
  stretch?: boolean;
}) {
  const { lat, lon, bounds, reference } = area.map;
  const query = encodeURIComponent(`${lat},${lon}`);
  const params = new URLSearchParams({
    bbox: bounds.join(","),
    marker: `${lat},${lon}`,
    name: area.name,
    lang: "en",
  });
  const localUrl = `/maps/area.html?${params.toString()}`;
  const mapUrl =
    provider === "google"
      ? `https://maps.google.com/maps?q=${query}&z=${googleZoom}&output=embed`
      : localUrl;
  const externalUrl =
    provider === "google" ? `https://www.google.com/maps/search/?api=1&query=${query}` : localUrl;
  return (
    <figure
      className={`min-w-0 overflow-hidden rounded-xl border bg-muted ${stretch ? "flex h-full flex-col" : ""}`}
    >
      <ConsentIframe
        title={
          provider === "google"
            ? `Google Maps view of ${area.name} — ${reference}`
            : `English map of ${area.name} — ${reference}`
        }
        src={mapUrl}
        width="600"
        height={compact ? "180" : "340"}
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        className={`w-full border-0 ${compact ? (stretch ? "min-h-44 flex-1" : "h-44") : "h-72 sm:h-80"}`}
      />
      <figcaption
        className={`flex flex-wrap items-center justify-between gap-x-4 gap-y-1 bg-card px-3 py-2 text-xs text-muted-foreground ${stretch ? "shrink-0" : ""}`}
      >
        <span className="flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden /> {reference}
        </span>
        {showExternalLink && (
          <a
            href={externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-semibold text-primary underline underline-offset-2"
          >
            {provider === "google" ? "Open in Google Maps" : "Open a larger map"}{" "}
            <ExternalLink className="h-3 w-3" aria-hidden />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        )}
      </figcaption>
    </figure>
  );
}

export function areaPhotoCreditEntries(areas: NeighborhoodStayGuide[]) {
  return areas
    .filter((area) => !isPublisherUrl(area.photo.sourceUrl))
    .map((area) => ({
      label: area.name,
      credit: area.photo.credit,
      sourceUrl: area.photo.sourceUrl,
    }));
}
