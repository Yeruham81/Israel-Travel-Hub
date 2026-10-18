import { createFileRoute } from "@tanstack/react-router";
import { AttractionGuidePage, attractionMeta } from "@/components/AttractionGuidePage";

export const Route = createFileRoute("/travel-blog/sea-of-galilee")({
  head: () => attractionMeta("sea-of-galilee"),
  component: () => <AttractionGuidePage id="sea-of-galilee" />,
});
