import { createFileRoute } from "@tanstack/react-router";
import { AttractionGuidePage, attractionMeta } from "@/components/AttractionGuidePage";

export const Route = createFileRoute("/attractions/mount-zion")({
  head: () => attractionMeta("mount-zion"),
  component: () => <AttractionGuidePage id="mount-zion" />,
});
