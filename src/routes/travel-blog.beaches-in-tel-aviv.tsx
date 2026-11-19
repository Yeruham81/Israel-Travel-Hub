import { createFileRoute } from "@tanstack/react-router";
import { travelGuideMeta } from "@/components/TravelGuide";
import { TelAvivBeachesGuide } from "@/components/TelAvivBeachesGuide";

export const Route = createFileRoute("/travel-blog/beaches-in-tel-aviv")({
  head: () => travelGuideMeta("telAvivBeaches"),
  component: TelAvivBeachesGuide,
});
