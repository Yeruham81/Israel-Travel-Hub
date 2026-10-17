import { createFileRoute } from "@tanstack/react-router";
import { TravelGuidePage, travelGuideMeta } from "@/components/TravelGuide";

export const Route = createFileRoute("/travel-blog/sherut-in-israel")({
  head: () => travelGuideMeta("sherut"),
  component: () => <TravelGuidePage id="sherut" />,
});
