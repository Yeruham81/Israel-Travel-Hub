import { createFileRoute } from "@tanstack/react-router";
import { CapernaumAttractionPage } from "@/components/CapernaumAttractionPage";
import { attractionMeta } from "@/components/AttractionGuidePage";

export const Route = createFileRoute("/attractions/capernaum")({
  head: () => attractionMeta("capernaum"),
  component: CapernaumAttractionPage,
});
