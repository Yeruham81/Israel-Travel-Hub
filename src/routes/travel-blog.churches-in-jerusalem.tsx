import { createFileRoute } from "@tanstack/react-router";
import { TravelGuidePage, travelGuideMeta } from "@/components/TravelGuide";

export const Route = createFileRoute("/travel-blog/churches-in-jerusalem")({
  head: () => travelGuideMeta("jerusalemChurches"),
  component: () => <TravelGuidePage id="jerusalemChurches" />,
});
