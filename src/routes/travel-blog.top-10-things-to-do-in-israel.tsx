import { createFileRoute } from "@tanstack/react-router";
import { travelGuideMeta } from "@/components/TravelGuide";
import { TopTenIsraelGuide } from "@/components/TopTenIsraelGuide";

export const Route = createFileRoute("/travel-blog/top-10-things-to-do-in-israel")({
  head: () => travelGuideMeta("topTen"),
  component: TopTenIsraelGuide,
});
