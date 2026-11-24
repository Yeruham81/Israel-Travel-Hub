import { createFileRoute } from "@tanstack/react-router";
import { travelGuideMeta } from "@/components/TravelGuide";
import { JerusalemChurchesGuide } from "@/components/JerusalemChurchesGuide";

export const Route = createFileRoute("/travel-blog/churches-in-jerusalem")({
  head: async (ctx) => { const { routeHead } = await import("../route-heads/travel-blog.churches-in-jerusalem.head"); return Reflect.apply(routeHead, undefined, [ctx]); },
  component: JerusalemChurchesGuide,
});
