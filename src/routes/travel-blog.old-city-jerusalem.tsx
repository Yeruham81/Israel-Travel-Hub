import { createFileRoute } from "@tanstack/react-router";
import { AttractionGuidePage, attractionMeta } from "@/components/AttractionGuidePage";

export const Route = createFileRoute("/travel-blog/old-city-jerusalem")({
  head: () => attractionMeta("old-city-jerusalem"),
  component: () => <AttractionGuidePage id="old-city-jerusalem" />,
});
