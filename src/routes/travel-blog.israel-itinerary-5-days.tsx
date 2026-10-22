import { createFileRoute } from "@tanstack/react-router";
import { IsraelItineraryPage, itineraryMeta } from "@/components/IsraelItineraryPage";

export const Route = createFileRoute("/travel-blog/israel-itinerary-5-days")({
  head: () => itineraryMeta("5"),
  component: () => <IsraelItineraryPage id="5" />,
});
