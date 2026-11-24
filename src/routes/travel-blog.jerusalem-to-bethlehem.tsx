import { createFileRoute } from "@tanstack/react-router";
import { TravelGuidePage, travelGuideMeta } from "@/components/TravelGuide";

export const Route = createFileRoute("/travel-blog/jerusalem-to-bethlehem")({
  head: async (ctx) => { const { routeHead } = await import("../route-heads/travel-blog.jerusalem-to-bethlehem.head"); return Reflect.apply(routeHead, undefined, [ctx]); },
  component: () => <TravelGuidePage id="bethlehem" />,
});
