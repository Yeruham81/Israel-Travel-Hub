import { createFileRoute } from "@tanstack/react-router";
import { TravelGuidePage, travelGuideMeta } from "@/components/TravelGuide";

export const Route = createFileRoute("/travel-blog/best-esim-for-israel")({
  head: () => travelGuideMeta("esim"),
  component: () => <TravelGuidePage id="esim" />,
});
