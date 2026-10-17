import { createFileRoute } from "@tanstack/react-router";
import { TravelGuidePage, travelGuideMeta } from "@/components/TravelGuide";

export const Route = createFileRoute("/travel-blog/day-trips-from-tel-aviv")({
  head: () => travelGuideMeta("telAvivDayTrips"),
  component: () => <TravelGuidePage id="telAvivDayTrips" />,
});
