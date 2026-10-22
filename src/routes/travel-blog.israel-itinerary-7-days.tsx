import { createFileRoute } from "@tanstack/react-router";
import { IsraelItineraryPage, itineraryMeta } from "@/components/IsraelItineraryPage";

export const Route = createFileRoute("/travel-blog/israel-itinerary-7-days")({
  head: () => itineraryMeta("7"),
  component: () => <IsraelItineraryPage id="7" />,
});
