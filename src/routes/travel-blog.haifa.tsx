import { createFileRoute } from "@tanstack/react-router";
import { AttractionGuidePage, attractionMeta } from "@/components/AttractionGuidePage";

export const Route = createFileRoute("/travel-blog/haifa")({
  head: () => attractionMeta("haifa"),
  component: () => <AttractionGuidePage id="haifa" />,
});
