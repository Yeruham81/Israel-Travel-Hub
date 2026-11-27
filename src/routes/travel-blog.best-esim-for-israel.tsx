import { createFileRoute } from "@tanstack/react-router";
import { TravelGuidePage } from "@/components/TravelGuide";

export const Route = createFileRoute("/travel-blog/best-esim-for-israel")({
  head: async (ctx) => {
    const { routeHead } = await import("../route-heads/travel-blog.best-esim-for-israel.head");
    return Reflect.apply(routeHead, undefined, [ctx]);
  },
  component: () => <TravelGuidePage id="esim" />,
});
