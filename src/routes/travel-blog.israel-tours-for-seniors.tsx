import { createFileRoute } from "@tanstack/react-router";
import { travelGuideMeta } from "@/components/TravelGuide";
import { SeniorToursGuide } from "@/components/SeniorToursGuide";

export const Route = createFileRoute("/travel-blog/israel-tours-for-seniors")({
  head: async (ctx) => { const { routeHead } = await import("../route-heads/travel-blog.israel-tours-for-seniors.head"); return Reflect.apply(routeHead, undefined, [ctx]); },
  component: SeniorToursGuide,
});
