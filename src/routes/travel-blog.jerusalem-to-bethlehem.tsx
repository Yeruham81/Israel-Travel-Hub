import { createFileRoute } from "@tanstack/react-router";
import { TravelGuidePage, travelGuideMeta } from "@/components/TravelGuide";

export const Route = createFileRoute("/travel-blog/jerusalem-to-bethlehem")({
  head: () => travelGuideMeta("bethlehem"),
  component: () => <TravelGuidePage id="bethlehem" />,
});
