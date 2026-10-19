import { createFileRoute } from "@tanstack/react-router";
import { TravelGuidePage, travelGuideMeta } from "@/components/TravelGuide";

export const Route = createFileRoute("/travel-blog/tel-megiddo")({
  head: () => travelGuideMeta("megiddo"),
  component: () => <TravelGuidePage id="megiddo" />,
});
