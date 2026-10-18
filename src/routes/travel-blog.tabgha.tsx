import { createFileRoute } from "@tanstack/react-router";
import { AttractionGuidePage, attractionMeta } from "@/components/AttractionGuidePage";

export const Route = createFileRoute("/travel-blog/tabgha")({
  head: () => attractionMeta("tabgha"),
  component: () => <AttractionGuidePage id="tabgha" />,
});
