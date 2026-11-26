import { createFileRoute } from "@tanstack/react-router";
import { CANONICAL_ORIGIN, SITE_NAME, jsonLd, pageMeta } from "@/lib/site";
import { authorLd } from "@/lib/author";
import { holidayGuideSources } from "@/data/israelHolidayVisitorGuide";
import { IsraelHolidayVisitorGuidePage } from "@/components/IsraelHolidayVisitorGuide";

export const Route = createFileRoute("/travel-blog/calendar-of-events")({
  head: async (ctx) => { const { routeHead } = await import("../route-heads/travel-blog.calendar-of-events.head"); return Reflect.apply(routeHead, undefined, [ctx]); },
  component:IsraelHolidayVisitorGuidePage,
});
