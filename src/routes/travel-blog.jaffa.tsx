import { createFileRoute } from "@tanstack/react-router";
import { AttractionGuidePage, attractionMeta } from "@/components/AttractionGuidePage";

export const Route = createFileRoute("/travel-blog/jaffa")({
  head: () => attractionMeta("jaffa"),
  component: () => <AttractionGuidePage id="jaffa" />,
});
