import { createFileRoute } from "@tanstack/react-router";
import { TravelGuidePage, travelGuideMeta } from "@/components/TravelGuide";

export const Route = createFileRoute("/travel-blog/mount-precipice")({
  head: () => travelGuideMeta("precipice"),
  component: () => <TravelGuidePage id="precipice" />,
});
