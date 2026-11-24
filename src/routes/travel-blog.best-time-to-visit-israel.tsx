import { createFileRoute } from "@tanstack/react-router";
import { travelGuideMeta } from "@/components/TravelGuide";
import { BestTimeIsraelGuide } from "@/components/BestTimeIsraelGuide";

export const Route = createFileRoute("/travel-blog/best-time-to-visit-israel")({
  head: async (ctx) => { const { routeHead } = await import("../route-heads/travel-blog.best-time-to-visit-israel.head"); return Reflect.apply(routeHead, undefined, [ctx]); },
  component: BestTimeIsraelGuide,
});
