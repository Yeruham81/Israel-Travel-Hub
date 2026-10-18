import { createFileRoute } from "@tanstack/react-router";
import { AttractionGuidePage, attractionMeta } from "@/components/AttractionGuidePage";

export const Route = createFileRoute("/travel-blog/capernaum")({
  head: () => attractionMeta("capernaum"),
  component: () => <AttractionGuidePage id="capernaum" />,
});
