import { createFileRoute } from "@tanstack/react-router";
import { travelGuideMeta } from "@/components/TravelGuide";
import { YardenitAttractionPage } from "@/components/YardenitAttractionPage";

export const Route = createFileRoute("/attractions/yardenit")({
  head: () => travelGuideMeta("yardenit"),
  component: YardenitAttractionPage,
});
