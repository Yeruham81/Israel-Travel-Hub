import { createFileRoute } from "@tanstack/react-router";
import { AttractionGuidePage, attractionMeta } from "@/components/AttractionGuidePage";

export const Route = createFileRoute("/travel-blog/mount-tabor")({
  head: () => attractionMeta("mount-tabor"),
  component: () => <AttractionGuidePage id="mount-tabor" />,
});
