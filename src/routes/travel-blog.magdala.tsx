import { createFileRoute } from "@tanstack/react-router";
import { TravelGuidePage, travelGuideMeta } from "@/components/TravelGuide";

export const Route = createFileRoute("/travel-blog/magdala")({
  head: () => travelGuideMeta("magdala"),
  component: () => <TravelGuidePage id="magdala" />,
});
