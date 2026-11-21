import { createFileRoute } from "@tanstack/react-router";
import { travelGuideMeta } from "@/components/TravelGuide";
import { HaifaMuseumsGuide } from "@/components/HaifaMuseumsGuide";

export const Route = createFileRoute("/travel-blog/museums-in-haifa")({
  head: () => travelGuideMeta("haifaMuseums"),
  component: HaifaMuseumsGuide,
});
