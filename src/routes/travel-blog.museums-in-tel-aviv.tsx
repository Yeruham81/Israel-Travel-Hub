import { createFileRoute } from "@tanstack/react-router";
import { TravelGuidePage, travelGuideMeta } from "@/components/TravelGuide";

export const Route = createFileRoute("/travel-blog/museums-in-tel-aviv")({
  head: () => travelGuideMeta("telAvivMuseums"),
  component: () => <TravelGuidePage id="telAvivMuseums" />,
});
