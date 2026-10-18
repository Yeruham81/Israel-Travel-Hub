import { createFileRoute } from "@tanstack/react-router";
import { AttractionGuidePage, attractionMeta } from "@/components/AttractionGuidePage";

export const Route = createFileRoute("/travel-blog/mount-of-beatitudes")({
  head: () => attractionMeta("mount-of-beatitudes"),
  component: () => <AttractionGuidePage id="mount-of-beatitudes" />,
});
