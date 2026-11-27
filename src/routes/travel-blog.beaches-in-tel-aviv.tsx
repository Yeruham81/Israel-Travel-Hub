import { createFileRoute } from "@tanstack/react-router";
import { TelAvivBeachesGuide } from "@/components/TelAvivBeachesGuide";

export const Route = createFileRoute("/travel-blog/beaches-in-tel-aviv")({
  head: async (ctx) => { const { routeHead } = await import("../route-heads/travel-blog.beaches-in-tel-aviv.head"); return Reflect.apply(routeHead, undefined, [ctx]); },
  component: TelAvivBeachesGuide,
});
