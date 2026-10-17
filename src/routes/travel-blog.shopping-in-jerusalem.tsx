import { createFileRoute } from "@tanstack/react-router";
import { TravelGuidePage, travelGuideMeta } from "@/components/TravelGuide";

export const Route = createFileRoute("/travel-blog/shopping-in-jerusalem")({
  head: () => travelGuideMeta("jerusalemShopping"),
  component: () => <TravelGuidePage id="jerusalemShopping" />,
});
