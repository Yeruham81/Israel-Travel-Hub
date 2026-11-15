import { createFileRoute } from "@tanstack/react-router";
import { TravelGuidePage, travelGuideMeta } from "@/components/TravelGuide";

export const Route = createFileRoute("/attractions/magdala")({
  head: () => travelGuideMeta("magdala"),
  component: () => <TravelGuidePage id="magdala" />,
});
