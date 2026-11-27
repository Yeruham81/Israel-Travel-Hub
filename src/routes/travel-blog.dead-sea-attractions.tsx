import { createFileRoute } from "@tanstack/react-router";
import { DeadSeaAttractionsGuide } from "@/components/DeadSeaAttractionsGuide";

export const Route = createFileRoute("/travel-blog/dead-sea-attractions")({
  head: async (ctx) => { const { routeHead } = await import("../route-heads/travel-blog.dead-sea-attractions.head"); return Reflect.apply(routeHead, undefined, [ctx]); },
  component: DeadSeaAttractionsGuide,
});
