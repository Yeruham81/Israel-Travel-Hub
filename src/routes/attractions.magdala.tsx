import { createFileRoute } from "@tanstack/react-router";
import { travelGuideMeta } from "@/components/TravelGuide";
import { MagdalaAttractionPage } from "@/components/MagdalaAttractionPage";

export const Route = createFileRoute("/attractions/magdala")({
  head: () => travelGuideMeta("magdala"),
  component: MagdalaAttractionPage,
});
