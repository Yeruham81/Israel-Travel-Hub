import { createFileRoute } from "@tanstack/react-router";
import { TravelGuidePage, travelGuideMeta } from "@/components/TravelGuide";

export const Route = createFileRoute("/travel-blog/the-dead-sea")({
  head: () => travelGuideMeta("deadSea"),
  component: () => <TravelGuidePage id="deadSea" />,
});
