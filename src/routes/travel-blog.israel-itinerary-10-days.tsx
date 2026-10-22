import { createFileRoute } from "@tanstack/react-router";
import { IsraelItineraryPage, itineraryMeta } from "@/components/IsraelItineraryPage";

export const Route = createFileRoute("/travel-blog/israel-itinerary-10-days")({
  head: () => itineraryMeta("10"),
  component: () => <IsraelItineraryPage id="10" />,
});
