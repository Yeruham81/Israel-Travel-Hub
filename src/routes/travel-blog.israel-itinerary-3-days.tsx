import { createFileRoute } from "@tanstack/react-router";
import { IsraelItineraryPage, itineraryMeta } from "@/components/IsraelItineraryPage";

export const Route = createFileRoute("/travel-blog/israel-itinerary-3-days")({
  head: () => itineraryMeta("3"),
  component: () => <IsraelItineraryPage id="3" />,
});
