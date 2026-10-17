import { createFileRoute } from "@tanstack/react-router";
import { TravelGuidePage, travelGuideMeta } from "@/components/TravelGuide";

export const Route = createFileRoute("/travel-blog/baptism-in-the-jordan-river")({
  head: () => travelGuideMeta("baptism"),
  component: () => <TravelGuidePage id="baptism" />,
});
