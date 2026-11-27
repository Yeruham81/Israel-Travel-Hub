import { createFileRoute } from "@tanstack/react-router";
import { IsraelHolidayVisitorGuidePage } from "@/components/IsraelHolidayVisitorGuide";

export const Route = createFileRoute("/travel-blog/calendar-of-events")({
  head: async (ctx) => {
    const { routeHead } = await import("../route-heads/travel-blog.calendar-of-events.head");
    return Reflect.apply(routeHead, undefined, [ctx]);
  },
  component: IsraelHolidayVisitorGuidePage,
});
