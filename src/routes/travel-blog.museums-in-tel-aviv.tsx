import { createFileRoute } from "@tanstack/react-router";
import { travelGuideMeta } from "@/components/TravelGuide";
import { TelAvivMuseumsGuide } from "@/components/TelAvivMuseumsGuide";

export const Route = createFileRoute("/travel-blog/museums-in-tel-aviv")({
  head: async (ctx) => { const { routeHead } = await import("../route-heads/travel-blog.museums-in-tel-aviv.head"); return Reflect.apply(routeHead, undefined, [ctx]); },
  component: TelAvivMuseumsGuide,
});
