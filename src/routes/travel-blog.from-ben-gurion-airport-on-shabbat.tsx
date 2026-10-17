import { createFileRoute } from "@tanstack/react-router";
import { TravelGuidePage, travelGuideMeta } from "@/components/TravelGuide";

export const Route = createFileRoute("/travel-blog/from-ben-gurion-airport-on-shabbat")({
  head: () => travelGuideMeta("shabbat"),
  component: () => <TravelGuidePage id="shabbat" />,
});
