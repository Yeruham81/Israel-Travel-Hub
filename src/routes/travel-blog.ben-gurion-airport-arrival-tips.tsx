import { createFileRoute } from "@tanstack/react-router";
import { TravelGuidePage } from "@/components/TravelGuide";

export const Route = createFileRoute("/travel-blog/ben-gurion-airport-arrival-tips")({
  head: async (ctx) => { const { routeHead } = await import("../route-heads/travel-blog.ben-gurion-airport-arrival-tips.head"); return Reflect.apply(routeHead, undefined, [ctx]); },
  component: () => <TravelGuidePage id="arrival" />,
});
