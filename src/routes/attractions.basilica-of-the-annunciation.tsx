import { createFileRoute } from "@tanstack/react-router";
import { travelGuideMeta } from "@/components/TravelGuide";
import { AnnunciationAttractionPage } from "@/components/AnnunciationAttractionPage";

export const Route = createFileRoute("/attractions/basilica-of-the-annunciation")({
  head: () => travelGuideMeta("annunciation"),
  component: AnnunciationAttractionPage,
});
