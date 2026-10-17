import { createFileRoute } from "@tanstack/react-router";
import { TravelGuidePage, travelGuideMeta } from "@/components/TravelGuide";

export const Route = createFileRoute("/travel-blog/getting-around-tel-aviv")({
  head: () => travelGuideMeta("telAviv"),
  component: () => <TravelGuidePage id="telAviv" />,
});
