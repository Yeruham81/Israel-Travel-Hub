import { createFileRoute } from "@tanstack/react-router";
import { TravelGuidePage, travelGuideMeta } from "@/components/TravelGuide";

export const Route = createFileRoute("/travel-blog/beaches-in-tel-aviv")({
  head: () => travelGuideMeta("telAvivBeaches"),
  component: () => <TravelGuidePage id="telAvivBeaches" />,
});
