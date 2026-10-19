import { createFileRoute } from "@tanstack/react-router";
import { TravelGuidePage, travelGuideMeta } from "@/components/TravelGuide";

export const Route = createFileRoute("/travel-blog/what-to-eat-in-israel")({
  head: () => travelGuideMeta("food"),
  component: () => <TravelGuidePage id="food" />,
});
