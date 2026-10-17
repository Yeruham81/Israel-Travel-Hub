import { createFileRoute } from "@tanstack/react-router";
import { TravelGuidePage, travelGuideMeta } from "@/components/TravelGuide";

export const Route = createFileRoute("/travel-blog/day-trips-from-jerusalem")({
  head: () => travelGuideMeta("jerusalemDayTrips"),
  component: () => <TravelGuidePage id="jerusalemDayTrips" />,
});
