import { useState } from "react";
import { BookingWidgetFrame } from "@/components/BookingWidgetFrame";
import { SiteLink as Link } from "@/components/SiteLink";
import {
  getYourGuideCityWidgetSrc,
  getYourGuideWidgetCities,
  type GetYourGuideWidgetCity,
  type GetYourGuideWidgetPage,
} from "@/lib/getyourguide-city-widget";

/** Optional booking content loads in an isolated frame after category consent and disclosure expansion. */
export function GetYourGuideCityWidget({
  city,
  page,
}: {
  city: GetYourGuideWidgetCity;
  page: GetYourGuideWidgetPage;
}) {
  const [active, setActive] = useState(false);
  const config = getYourGuideWidgetCities[city];

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
        className="mt-3 min-w-0 max-w-full overflow-hidden"
        role="group" aria-label={`GetYourGuide activities in ${config.name}`}
        data-testid="gyg-third-party-mount"
      >{active && <BookingWidgetFrame scriptUrl={getYourGuideCityWidgetSrc(city, page)} title={`GetYourGuide activities in ${config.name}`} />}</div>
      <p className="mt-3 text-sm">
        Or explore my <Link to={config.toursPath} className="font-semibold text-primary underline underline-offset-2">
          {config.name} tours page
        </Link>.
      </p>
    </div>
  </details>;
}
