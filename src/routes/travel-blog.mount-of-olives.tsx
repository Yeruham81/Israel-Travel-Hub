import { createFileRoute } from "@tanstack/react-router";
import { AttractionGuidePage, attractionMeta } from "@/components/AttractionGuidePage";

export const Route = createFileRoute("/travel-blog/mount-of-olives")({
  head: () => attractionMeta("mount-of-olives"),
  component: () => <AttractionGuidePage id="mount-of-olives" />,
});
