import { createFileRoute } from "@tanstack/react-router";
import { AttractionGuidePage, attractionMeta } from "@/components/AttractionGuidePage";

export const Route = createFileRoute("/travel-blog/attractions-in-tel-aviv")({
  head: () => attractionMeta("attractions-in-tel-aviv"),
  component: () => <AttractionGuidePage id="attractions-in-tel-aviv" />,
});
