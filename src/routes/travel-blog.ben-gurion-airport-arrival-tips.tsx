import { createFileRoute } from "@tanstack/react-router";
import { TravelGuidePage, travelGuideMeta } from "@/components/TravelGuide";

export const Route = createFileRoute("/travel-blog/ben-gurion-airport-arrival-tips")({
  head: () => travelGuideMeta("arrival"),
  component: () => <TravelGuidePage id="arrival" />,
});
