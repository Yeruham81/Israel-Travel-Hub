import { createFileRoute } from "@tanstack/react-router";
import { TravelGuidePage, travelGuideMeta } from "@/components/TravelGuide";

export const Route = createFileRoute("/travel-blog/jerusalem-travel-guide")({
  head: () => travelGuideMeta("jerusalem"),
  component: () => <TravelGuidePage id="jerusalem" />,
});
