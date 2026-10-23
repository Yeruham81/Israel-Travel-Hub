import { createFileRoute } from "@tanstack/react-router";
import { TravelGuidePage, travelGuideMeta } from "@/components/TravelGuide";

export const Route = createFileRoute("/travel-blog/calendar-of-events")({
  head: () => travelGuideMeta("calendar"),
  component: () => <TravelGuidePage id="calendar" />,
});
