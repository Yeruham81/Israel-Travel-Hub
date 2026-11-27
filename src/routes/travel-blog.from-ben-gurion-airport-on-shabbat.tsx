import { createFileRoute } from "@tanstack/react-router";
import { TravelGuidePage } from "@/components/TravelGuide";

export const Route = createFileRoute("/travel-blog/from-ben-gurion-airport-on-shabbat")({
  head: async (ctx) => {
    const { routeHead } =
      await import("../route-heads/travel-blog.from-ben-gurion-airport-on-shabbat.head");
    return Reflect.apply(routeHead, undefined, [ctx]);
  },
  component: () => <TravelGuidePage id="shabbat" />,
});
