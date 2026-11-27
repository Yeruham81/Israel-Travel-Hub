import { SiteLink as Link } from "@/components/SiteLink";
import { airportJourneyGuides } from "@/data/airportJourneyGuides";
import { airportTaxiFareRoutes } from "@/data/airportTaxiFareEstimates";

/** Destination cards always use the hero photograph of the linked route guide. */
export function AirportTaxiDestinationCards() {
  return (
    <nav
      aria-label="Airport taxi destination guides"
      className="mt-5"
      data-testid="airport-taxi-destination-cards"
    >
      <ul className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
        {airportTaxiFareRoutes.map((route) => {
          const photo = airportJourneyGuides[route.id].photo;
          return (
            <li key={route.id} className="min-w-0">
              <Link
                to={route.to}
                className="editorial-card-link group flex h-full min-w-0 flex-col overflow-hidden rounded-xl border bg-card transition-colors hover:border-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  width={600}
                  height={400}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[3/2] w-full object-cover"
                />
                <span className="flex flex-1 flex-col p-3 sm:p-4">
                  <span className="text-sm font-semibold leading-snug text-foreground group-hover:text-primary sm:text-base">
                    {route.label}
                  </span>
                  <span className="mt-1 text-xs font-medium text-primary">
                    {route.travelTime} by taxi
                  </span>
                  <span className="mt-2 line-clamp-2 text-xs leading-snug text-muted-foreground">
                    {route.destination}
                  </span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
