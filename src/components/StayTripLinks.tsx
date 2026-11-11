import type { LinkProps } from "@tanstack/react-router";
import { RelatedLinks } from "@/components/Guide";

type Region = "jerusalem" | "telaviv" | "haifa" | "tiberias" | "deadsea";
type TripLink = { label: string; to: LinkProps["to"]; note?: string };

/**
 * Hand-picked next steps for each hotel destination. All primary four routes
 * have licensed photos in guideDirectory and reuse the standard illustrated
 * practical-guide card design used by the taxi/Shabbat reading sections.
 */
const recommended: Record<Region, TripLink[]> = {
  jerusalem: [
    { label: "Getting from Ben Gurion Airport to Jerusalem", to: "/travel-blog/how-to-get-from-ben-gurion-airport-to-jerusalem/", note: "Compare ways to reach your hotel, including weekend arrival options." },
    { label: "Airport arrivals on Shabbat", to: "/travel-blog/from-ben-gurion-airport-on-shabbat/", note: "Plan Friday or Saturday arrivals when public transport is limited." },
    { label: "Jerusalem travel guide", to: "/travel-blog/jerusalem-travel-guide/", note: "Plan Old City sights, neighbourhoods and time around the city." },
    { label: "Visiting Masada", to: "/travel-blog/masada/", note: "Compare a desert excursion with the rest of your Jerusalem itinerary." },
  ],
  telaviv: [
    { label: "Ben Gurion Airport to Tel Aviv", to: "/travel-blog/how-to-get-from-ben-gurion-airport-to-tel-aviv/", note: "Get to your hotel by rail, taxi or arranged transfer." },
    { label: "Getting around Tel Aviv", to: "/travel-blog/getting-around-tel-aviv/", note: "Choose walking, transit, taxis and weekend transport." },
    { label: "Beaches in Tel Aviv", to: "/travel-blog/beaches-in-tel-aviv/", note: "Choose the coastline that fits your hotel and travel style." },
    { label: "Day trips from Tel Aviv", to: "/travel-blog/day-trips-from-tel-aviv/", note: "Explore beyond the city without changing your hotel base." },
  ],
  haifa: [
    { label: "Ben Gurion Airport to Haifa", to: "/travel-blog/how-to-get-from-ben-gurion-airport-to-haifa/", note: "Compare train connections, taxis and hotel arrivals." },
    { label: "Museums in Haifa", to: "/travel-blog/museums-in-haifa/", note: "Find cultural stops around the city and Mount Carmel." },
    { label: "Visiting Caesarea", to: "/attractions/caesarea/", note: "Explore the ancient coastal harbour on a day trip." },
    { label: "Israel itinerary: five days", to: "/travel-blog/israel-itinerary-5-days/", note: "See how Haifa can fit into a wider coastal journey." },
  ],
  tiberias: [
    { label: "Visiting Magdala", to: "/travel-blog/magdala/", note: "Plan a historic stop along the Sea of Galilee." },
    { label: "Visiting Yardenit", to: "/travel-blog/yardenit/", note: "Understand practical arrangements for this Jordan River site." },
    { label: "Israel itinerary: seven days", to: "/travel-blog/israel-itinerary-7-days/", note: "Make room for the Sea of Galilee in a week-long trip." },
    { label: "Israel itinerary: ten days", to: "/travel-blog/israel-itinerary-10-days/", note: "Plan a less rushed journey through the north." },
  ],
  deadsea: [
    { label: "Ben Gurion Airport to Ein Bokek", to: "/travel-blog/how-to-get-from-ben-gurion-airport-to-ein-bokek/", note: "Plan an arrival at your exact Dead Sea hotel." },
    { label: "Visiting Masada", to: "/travel-blog/masada/", note: "Add the desert fortress to your Dead Sea stay." },
    { label: "The Dead Sea visitor guide", to: "/travel-blog/the-dead-sea/", note: "Understand the region, swimming conditions and sightseeing." },
    { label: "Israel itinerary: three days", to: "/travel-blog/israel-itinerary-3-days/", note: "See how a Dead Sea visit fits into a short trip." },
  ],
};

const itineraryExtras: Partial<Record<Region, TripLink[]>> = {
  deadsea: [
    { label: "Israel itinerary: five days", to: "/travel-blog/israel-itinerary-5-days/", note: "Allow more time for the Dead Sea and surrounding sights." },
  ],
  haifa: [
    { label: "Israel itinerary: ten days", to: "/travel-blog/israel-itinerary-10-days/", note: "Build a slower coastal and northern route." },
  ],
};

export function StayTripLinks({
  region, extras = [], currentPath,
}: {
  region: string;
  extras?: TripLink[];
  currentPath?: string;
}) {
  return <RelatedLinks
    title="Plan the rest of your trip"
    illustrated
    {...(currentPath ? { currentPath } : {})}
    items={[...(recommended[region as Region] ?? []), ...extras, ...(itineraryExtras[region as Region] ?? [])]}
  />;
}
