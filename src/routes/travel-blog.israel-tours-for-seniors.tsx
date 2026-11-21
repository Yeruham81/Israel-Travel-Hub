import { createFileRoute } from "@tanstack/react-router";
import { travelGuideMeta } from "@/components/TravelGuide";
import { SeniorToursGuide } from "@/components/SeniorToursGuide";

export const Route = createFileRoute("/travel-blog/israel-tours-for-seniors")({
  head: () => travelGuideMeta("seniorTours"),
  component: SeniorToursGuide,
});
