import { createFileRoute } from "@tanstack/react-router";
import { IsraelFoodGuide } from "@/components/IsraelFoodGuide";

export const Route = createFileRoute("/travel-blog/what-to-eat-in-israel")({
  head: async (ctx) => {
    const { routeHead } = await import("../route-heads/travel-blog.what-to-eat-in-israel.head");
    return Reflect.apply(routeHead, undefined, [ctx]);
  },
  component: IsraelFoodGuide,
});
