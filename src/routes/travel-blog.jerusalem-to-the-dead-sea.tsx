import { createFileRoute } from "@tanstack/react-router";
import { TravelGuidePage } from "@/components/TravelGuide";

export const Route = createFileRoute("/travel-blog/jerusalem-to-the-dead-sea")({
  head: async (ctx) => {
    const { routeHead } = await import("../route-heads/travel-blog.jerusalem-to-the-dead-sea.head");
    return Reflect.apply(routeHead, undefined, [ctx]);
  },
  component: () => <TravelGuidePage id="jerusalemDeadSea" />,
});
