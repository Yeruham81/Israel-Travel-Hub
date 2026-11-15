import { createFileRoute } from "@tanstack/react-router";
import { AttractionGuidePage, attractionMeta } from "@/components/AttractionGuidePage";

export const Route = createFileRoute("/attractions/tabgha")({
  head: () => attractionMeta("tabgha"),
  component: () => <AttractionGuidePage id="tabgha" />,
});
