import { createFileRoute } from "@tanstack/react-router";
import { travelGuideMeta } from "@/components/TravelGuide";
import { IsraelTravelTipsGuide } from "@/components/IsraelTravelTipsGuide";

export const Route = createFileRoute("/travel-blog/israel-travel-tips")({
  head: () => travelGuideMeta("travelTips"),
  component: IsraelTravelTipsGuide,
});
