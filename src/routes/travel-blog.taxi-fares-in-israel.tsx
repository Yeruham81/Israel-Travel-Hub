import { createFileRoute } from "@tanstack/react-router";
import { TravelGuidePage, travelGuideMeta } from "@/components/TravelGuide";

export const Route = createFileRoute("/travel-blog/taxi-fares-in-israel")({
  head: async (ctx) => { const { routeHead } = await import("../route-heads/travel-blog.taxi-fares-in-israel.head"); return Reflect.apply(routeHead, undefined, [ctx]); },
  component: () => <TravelGuidePage id="taxiFares" />,
});
