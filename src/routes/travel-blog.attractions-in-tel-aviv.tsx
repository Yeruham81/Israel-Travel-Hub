import { createFileRoute } from "@tanstack/react-router";
import { TelAvivAttractionsGuide } from "@/components/TelAvivAttractionsGuide";

export const Route = createFileRoute("/travel-blog/attractions-in-tel-aviv")({
  head: async (ctx) => { const { routeHead } = await import("../route-heads/travel-blog.attractions-in-tel-aviv.head"); return Reflect.apply(routeHead, undefined, [ctx]); },
  component: TelAvivAttractionsGuide,
});
