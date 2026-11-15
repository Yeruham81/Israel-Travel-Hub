import { createFileRoute } from "@tanstack/react-router";
import { AttractionGuidePage, attractionMeta } from "@/components/AttractionGuidePage";

export const Route = createFileRoute("/attractions/rosh-hanikra")({
  head: () => attractionMeta("rosh-hanikra"),
  component: () => <AttractionGuidePage id="rosh-hanikra" />,
});
