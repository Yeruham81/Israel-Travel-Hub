import { createFileRoute } from "@tanstack/react-router";
import { AttractionGuidePage, attractionMeta } from "@/components/AttractionGuidePage";

export const Route = createFileRoute("/travel-blog/dead-sea-attractions")({
  head: () => attractionMeta("dead-sea-attractions"),
  component: () => <AttractionGuidePage id="dead-sea-attractions" />,
});
