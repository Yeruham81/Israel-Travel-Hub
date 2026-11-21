import { createFileRoute } from "@tanstack/react-router";
import { travelGuideMeta } from "@/components/TravelGuide";
import { ChristianToursGuide } from "@/components/ChristianToursGuide";

export const Route = createFileRoute("/travel-blog/christian-tours-in-israel")({
  head: () => travelGuideMeta("christianTours"),
  component: ChristianToursGuide,
});
