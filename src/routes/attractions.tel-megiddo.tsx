import { createFileRoute } from "@tanstack/react-router";
import { travelGuideMeta } from "@/components/TravelGuide";
import { TelMegiddoAttractionPage } from "@/components/TelMegiddoAttractionPage";

export const Route = createFileRoute("/attractions/tel-megiddo")({
  head: () => travelGuideMeta("megiddo"),
  component: TelMegiddoAttractionPage,
});
