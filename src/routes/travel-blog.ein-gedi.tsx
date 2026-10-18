import { createFileRoute } from "@tanstack/react-router";
import { AttractionGuidePage, attractionMeta } from "@/components/AttractionGuidePage";

export const Route = createFileRoute("/travel-blog/ein-gedi")({
  head: () => attractionMeta("ein-gedi"),
  component: () => <AttractionGuidePage id="ein-gedi" />,
});
