import { createFileRoute } from "@tanstack/react-router";
import { TravelGuidePage, travelGuideMeta } from "@/components/TravelGuide";

export const Route = createFileRoute("/travel-blog/uber-in-israel")({
  head: () => travelGuideMeta("uber"),
  component: () => <TravelGuidePage id="uber" />,
});
