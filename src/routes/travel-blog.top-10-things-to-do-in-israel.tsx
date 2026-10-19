import { createFileRoute } from "@tanstack/react-router";
import { TravelGuidePage, travelGuideMeta } from "@/components/TravelGuide";

export const Route = createFileRoute("/travel-blog/top-10-things-to-do-in-israel")({
  head: () => travelGuideMeta("topTen"),
  component: () => <TravelGuidePage id="topTen" />,
});
