import { createFileRoute } from "@tanstack/react-router";
import { AttractionGuidePage, attractionMeta } from "@/components/AttractionGuidePage";

export const Route = createFileRoute("/travel-blog/akko-acre")({
  head: () => attractionMeta("akko-acre"),
  component: () => <AttractionGuidePage id="akko-acre" />,
});
