import { createFileRoute } from "@tanstack/react-router";
import { AttractionGuidePage, attractionMeta } from "@/components/AttractionGuidePage";

export const Route = createFileRoute("/travel-blog/rosh-hanikra")({
  head: () => attractionMeta("rosh-hanikra"),
  component: () => <AttractionGuidePage id="rosh-hanikra" />,
});
