import { createFileRoute } from "@tanstack/react-router";
import { TravelGuidePage, travelGuideMeta } from "@/components/TravelGuide";

export const Route = createFileRoute("/travel-blog/basilica-of-the-annunciation")({
  head: () => travelGuideMeta("annunciation"),
  component: () => <TravelGuidePage id="annunciation" />,
});
