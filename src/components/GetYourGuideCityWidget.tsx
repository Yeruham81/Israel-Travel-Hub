import { BookingWidgetFrame } from "@/components/BookingWidgetFrame";
import { SiteLink as Link } from "@/components/SiteLink";
import {
  getYourGuideCityWidgetSrc,
  getYourGuideWidgetCities,
  type GetYourGuideWidgetCity,
  type GetYourGuideWidgetPage,
} from "@/lib/getyourguide-city-widget";

/** Optional booking content loads in an isolated frame inline after booking-widget consent. */
export function GetYourGuideCityWidget({
  city,
  page,
}: {
  city: GetYourGuideWidgetCity;
  page: GetYourGuideWidgetPage;
}) {
  const config = getYourGuideWidgetCities[city];

  return (
    <section
      className="min-w-0 rounded-lg border bg-background p-4"
      aria-label={`More things to do in ${config.name}`}
      data-testid={`gyg-city-widget-${city}`}
    >
      <h4 className="font-semibold text-primary">More things to do in {config.name}</h4>
      <div
        className="mt-3 min-w-0 max-w-full overflow-hidden"
        role="group"
        aria-label={`GetYourGuide activities in ${config.name}`}
        data-testid="gyg-third-party-mount"
      >
        <BookingWidgetFrame
          scriptUrl={getYourGuideCityWidgetSrc(city, page)}
          title={`GetYourGuide activities in ${config.name}`}
        />
      </div>
      <p className="mt-3 text-sm">
        Or explore my{" "}
        <Link
          to={config.toursPath}
          className="font-semibold text-primary underline underline-offset-2"
        >
          {config.name} tours page
        </Link>
        .
      </p>
    </section>
  );
}
