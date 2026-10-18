import { createFileRoute } from "@tanstack/react-router";
import { AttractionGuidePage, attractionMeta } from "@/components/AttractionGuidePage";

export const Route = createFileRoute("/travel-blog/museums-in-jerusalem")({
  head: () => attractionMeta("museums-in-jerusalem"),
  component: () => <AttractionGuidePage id="museums-in-jerusalem" />,
});
