import { createFileRoute } from "@tanstack/react-router";
import { TravelGuidePage, travelGuideMeta } from "@/components/TravelGuide";

export const Route = createFileRoute("/travel-blog/museums-in-haifa")({
  head: () => travelGuideMeta("haifaMuseums"),
  component: () => <TravelGuidePage id="haifaMuseums" />,
});
