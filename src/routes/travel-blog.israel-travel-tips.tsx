import { createFileRoute } from "@tanstack/react-router";
import { TravelGuidePage, travelGuideMeta } from "@/components/TravelGuide";

export const Route = createFileRoute("/travel-blog/israel-travel-tips")({
  head: () => travelGuideMeta("travelTips"),
  component: () => <TravelGuidePage id="travelTips" />,
});
