import { createFileRoute } from "@tanstack/react-router";
import { TravelGuidePage, travelGuideMeta } from "@/components/TravelGuide";

export const Route = createFileRoute("/travel-blog/taxis-in-israel")({
  head: () => travelGuideMeta("taxis"),
  component: () => <TravelGuidePage id="taxis" />,
});
