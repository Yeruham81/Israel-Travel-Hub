import { createFileRoute } from "@tanstack/react-router";
import { TravelGuidePage, travelGuideMeta } from "@/components/TravelGuide";

export const Route = createFileRoute("/travel-blog/ben-gurion-airport-taxis")({
  head: async (ctx) => { const { routeHead } = await import("../route-heads/travel-blog.ben-gurion-airport-taxis.head"); return Reflect.apply(routeHead, undefined, [ctx]); },
  component: () => <TravelGuidePage id="airportTaxis" />,
});
