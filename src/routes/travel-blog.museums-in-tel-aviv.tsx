import { createFileRoute } from "@tanstack/react-router";
import { travelGuideMeta } from "@/components/TravelGuide";
import { TelAvivMuseumsGuide } from "@/components/TelAvivMuseumsGuide";

export const Route = createFileRoute("/travel-blog/museums-in-tel-aviv")({
  head: () => travelGuideMeta("telAvivMuseums"),
  component: TelAvivMuseumsGuide,
});
