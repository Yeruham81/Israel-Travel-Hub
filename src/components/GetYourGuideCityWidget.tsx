import { useEffect, useRef, useState } from "react";
import { SiteLink as Link } from "@/components/SiteLink";
import {
  getYourGuideCityWidgetSrc,
  getYourGuideWidgetCities,
  type GetYourGuideWidgetCity,
  type GetYourGuideWidgetPage,
} from "@/lib/getyourguide-city-widget";

/**
 * Optional commercial discovery inside an editorial itinerary.
 *
 * Never load the third-party script during SSR or on page load. The reader
 * expands the disclosure first; only then do we insert the owner-provided
 * Travelpayouts script into a dedicated DOM mount, outside React's children.
 * Keeps the page short and allows the guide to work if widgets are blocked.
 */
export function GetYourGuideCityWidget({
  city,
  page,
}: {
  city: GetYourGuideWidgetCity;
  page: GetYourGuideWidgetPage;
}) {
  const [active, setActive] = useState(false);
  const [failed, setFailed] = useState(false);
  const mountRef = useRef<HTMLDivElement>(null);
  const config = getYourGuideWidgetCities[city];

  useEffect(() => {
    const mount = mountRef.current;
    if (!active || !mount) return;

    setFailed(false);
    const script = document.createElement("script");
    script.src = getYourGuideCityWidgetSrc(city, page);
    script.async = true;
    script.charset = "utf-8";
    script.onerror = () => setFailed(true);
    mount.appendChild(script);

    return () => {
      script.onerror = null;
      script.remove();
    };
  }, [active, city, page]);

  return <details
    className="group min-w-0 rounded-lg border bg-background"
    data-testid={`gyg-city-widget-${city}`}
    onToggle={(event) => { if (event.currentTarget.open) setActive(true); }}
  >
    <summary className="flex cursor-pointer list-none items-center justify-between gap-3 rounded-lg px-4 py-3 font-semibold text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary [&::-webkit-details-marker]:hidden">
      <span>More things to do in {config.name}</span>
      <span aria-hidden="true" className="shrink-0 text-sm text-muted-foreground transition-transform group-open:rotate-180">⌄</span>
    </summary>
    <div className="min-w-0 border-t px-4 pb-4 pt-3">
      <div
        ref={mountRef}
        className="mt-3 min-w-0 max-w-full overflow-hidden"
        aria-label={`GetYourGuide activities in ${config.name}`}
        data-testid="gyg-third-party-mount"
      />
      {failed && <p role="status" className="mt-3 text-sm text-muted-foreground">
        The activity widget could not load. You can still explore the tours page linked below.
      </p>}
      <p className="mt-3 text-sm">
        Or explore my <Link to={config.toursPath} className="font-semibold text-primary underline underline-offset-2">
          {config.name} tours page
        </Link>.
      </p>
    </div>
  </details>;
}
