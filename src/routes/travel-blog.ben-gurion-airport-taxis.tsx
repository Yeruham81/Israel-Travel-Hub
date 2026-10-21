import { createFileRoute } from "@tanstack/react-router";
import { TravelGuidePage, travelGuideMeta } from "@/components/TravelGuide";

export const Route = createFileRoute("/travel-blog/ben-gurion-airport-taxis")({
  head: () => travelGuideMeta("airportTaxis"),
  component: () => <TravelGuidePage id="airportTaxis" />,
});
