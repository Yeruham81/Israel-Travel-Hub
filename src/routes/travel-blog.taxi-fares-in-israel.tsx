import { createFileRoute } from "@tanstack/react-router";
import { TravelGuidePage, travelGuideMeta } from "@/components/TravelGuide";

export const Route = createFileRoute("/travel-blog/taxi-fares-in-israel")({
  head: () => travelGuideMeta("taxiFares"),
  component: () => <TravelGuidePage id="taxiFares" />,
});
