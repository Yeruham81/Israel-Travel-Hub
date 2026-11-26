import { createFileRoute } from "@tanstack/react-router";
import { attractionMeta } from "@/lib/attraction-meta";
import { JerusalemMuseumsGuide } from "@/components/JerusalemMuseumsGuide";

export const Route = createFileRoute("/travel-blog/museums-in-jerusalem")({
  head: async (ctx) => { const { routeHead } = await import("../route-heads/travel-blog.museums-in-jerusalem.head"); return Reflect.apply(routeHead, undefined, [ctx]); },
  component: JerusalemMuseumsGuide,
});
