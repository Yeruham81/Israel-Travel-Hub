import { createFileRoute } from "@tanstack/react-router";
import { AttractionGuidePage, attractionMeta } from "@/components/AttractionGuidePage";

export const Route = createFileRoute("/attractions/mount-tabor")({
  head: () => attractionMeta("mount-tabor"),
  component: () => <AttractionGuidePage id="mount-tabor" />,
});
