import { createFileRoute } from "@tanstack/react-router";
import { travelGuideMeta } from "@/components/TravelGuide";
import { MountPrecipiceAttractionPage } from "@/components/MountPrecipiceAttractionPage";

export const Route = createFileRoute("/attractions/mount-precipice")({
  head: () => travelGuideMeta("precipice"),
  component: MountPrecipiceAttractionPage,
});
