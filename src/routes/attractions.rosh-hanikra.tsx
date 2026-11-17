import { createFileRoute } from "@tanstack/react-router";
import { attractionMeta } from "@/components/AttractionGuidePage";
import { RoshHanikraAttractionPage } from "@/components/RoshHanikraAttractionPage";

export const Route = createFileRoute("/attractions/rosh-hanikra")({
  head: () => attractionMeta("rosh-hanikra"),
  component: RoshHanikraAttractionPage,
});
