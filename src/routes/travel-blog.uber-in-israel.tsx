import { createFileRoute } from "@tanstack/react-router";
import { TravelGuidePage } from "@/components/TravelGuide";

export const Route = createFileRoute("/travel-blog/uber-in-israel")({
  head: async (ctx) => {
    const { routeHead } = await import("../route-heads/travel-blog.uber-in-israel.head");
    return Reflect.apply(routeHead, undefined, [ctx]);
  },
  component: () => <TravelGuidePage id="uber" />,
});
