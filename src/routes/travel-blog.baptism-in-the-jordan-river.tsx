import { createFileRoute } from "@tanstack/react-router";
import { JordanRiverBaptismGuidePage } from "@/components/JordanRiverBaptismGuide";

export const Route = createFileRoute("/travel-blog/baptism-in-the-jordan-river")({
  head: async (ctx) => { const { routeHead } = await import("../route-heads/travel-blog.baptism-in-the-jordan-river.head"); return Reflect.apply(routeHead, undefined, [ctx]); },
  component:JordanRiverBaptismGuidePage,
});
