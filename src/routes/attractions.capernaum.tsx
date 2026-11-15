import { createFileRoute } from "@tanstack/react-router";
import { AttractionGuidePage, attractionMeta } from "@/components/AttractionGuidePage";

export const Route = createFileRoute("/attractions/capernaum")({
  head: () => attractionMeta("capernaum"),
  component: () => <AttractionGuidePage id="capernaum" />,
});
