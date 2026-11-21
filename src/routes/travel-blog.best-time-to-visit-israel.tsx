import { createFileRoute } from "@tanstack/react-router";
import { travelGuideMeta } from "@/components/TravelGuide";
import { BestTimeIsraelGuide } from "@/components/BestTimeIsraelGuide";

export const Route = createFileRoute("/travel-blog/best-time-to-visit-israel")({
  head: () => travelGuideMeta("bestTime"),
  component: BestTimeIsraelGuide,
});
