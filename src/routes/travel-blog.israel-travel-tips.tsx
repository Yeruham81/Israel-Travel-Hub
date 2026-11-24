import { createFileRoute } from "@tanstack/react-router";
import { travelGuideMeta } from "@/components/TravelGuide";
import { IsraelTravelTipsGuide } from "@/components/IsraelTravelTipsGuide";

export const Route = createFileRoute("/travel-blog/israel-travel-tips")({
  head: async (ctx) => { const { routeHead } = await import("../route-heads/travel-blog.israel-travel-tips.head"); return Reflect.apply(routeHead, undefined, [ctx]); },
  component: IsraelTravelTipsGuide,
});
