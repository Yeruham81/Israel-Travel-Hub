import { createFileRoute } from "@tanstack/react-router";
import { travelGuideMeta } from "@/components/TravelGuide";
import { IsraelFoodGuide } from "@/components/IsraelFoodGuide";

export const Route = createFileRoute("/travel-blog/what-to-eat-in-israel")({
  head: () => travelGuideMeta("food"),
  component: IsraelFoodGuide,
});
