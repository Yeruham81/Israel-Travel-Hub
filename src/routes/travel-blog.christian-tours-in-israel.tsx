import { createFileRoute } from "@tanstack/react-router";
import { ChristianToursGuide } from "@/components/ChristianToursGuide";

export const Route = createFileRoute("/travel-blog/christian-tours-in-israel")({
  head: async (ctx) => { const { routeHead } = await import("../route-heads/travel-blog.christian-tours-in-israel.head"); return Reflect.apply(routeHead, undefined, [ctx]); },
  component: ChristianToursGuide,
});
