import { createFileRoute } from "@tanstack/react-router";
import { TravelGuidePage } from "@/components/TravelGuide";

export const Route = createFileRoute("/travel-blog/sherut-in-israel")({
  head: async (ctx) => { const { routeHead } = await import("../route-heads/travel-blog.sherut-in-israel.head"); return Reflect.apply(routeHead, undefined, [ctx]); },
  component: () => <TravelGuidePage id="sherut" />,
});
