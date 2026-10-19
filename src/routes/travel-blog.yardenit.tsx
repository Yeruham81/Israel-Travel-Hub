import { createFileRoute } from "@tanstack/react-router";
import { TravelGuidePage, travelGuideMeta } from "@/components/TravelGuide";

export const Route = createFileRoute("/travel-blog/yardenit")({
  head: () => travelGuideMeta("yardenit"),
  component: () => <TravelGuidePage id="yardenit" />,
});
