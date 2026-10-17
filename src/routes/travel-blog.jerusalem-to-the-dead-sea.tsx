import { createFileRoute } from "@tanstack/react-router";
import { TravelGuidePage, travelGuideMeta } from "@/components/TravelGuide";

export const Route = createFileRoute("/travel-blog/jerusalem-to-the-dead-sea")({
  head: () => travelGuideMeta("jerusalemDeadSea"),
  component: () => <TravelGuidePage id="jerusalemDeadSea" />,
});
