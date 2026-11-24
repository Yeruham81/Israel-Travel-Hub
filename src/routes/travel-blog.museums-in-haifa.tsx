import { createFileRoute } from "@tanstack/react-router";
import { travelGuideMeta } from "@/components/TravelGuide";
import { HaifaMuseumsGuide } from "@/components/HaifaMuseumsGuide";

export const Route = createFileRoute("/travel-blog/museums-in-haifa")({
  head: async (ctx) => { const { routeHead } = await import("../route-heads/travel-blog.museums-in-haifa.head"); return Reflect.apply(routeHead, undefined, [ctx]); },
  component: HaifaMuseumsGuide,
});
