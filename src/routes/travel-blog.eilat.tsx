import { createFileRoute } from "@tanstack/react-router";
import { TravelGuidePage, travelGuideMeta } from "@/components/TravelGuide";

export const Route = createFileRoute("/travel-blog/eilat")({
  head: () => travelGuideMeta("eilat"),
  component: () => <TravelGuidePage id="eilat" />,
});
