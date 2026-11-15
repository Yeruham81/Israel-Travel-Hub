import { createFileRoute } from "@tanstack/react-router";
import { AttractionGuidePage, attractionMeta } from "@/components/AttractionGuidePage";

export const Route = createFileRoute("/attractions/jaffa")({
  head: () => attractionMeta("jaffa"),
  component: () => <AttractionGuidePage id="jaffa" />,
});
