import { createFileRoute } from "@tanstack/react-router";
import { TravelGuidePage, travelGuideMeta } from "@/components/TravelGuide";

export const Route = createFileRoute("/travel-blog/best-time-to-visit-israel")({
  head: () => travelGuideMeta("bestTime"),
  component: () => <TravelGuidePage id="bestTime" />,
});
