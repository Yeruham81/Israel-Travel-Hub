import { createFileRoute } from "@tanstack/react-router";
import { IsraelItineraryPage } from "@/components/IsraelItineraryPage";

export const Route = createFileRoute("/travel-blog/israel-itinerary-3-days")({
  head: async (ctx) => {
    const { routeHead } = await import("../route-heads/travel-blog.israel-itinerary-3-days.head");
    return Reflect.apply(routeHead, undefined, [ctx]);
  },
  component: () => <IsraelItineraryPage id="3" />,
});
