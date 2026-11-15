import { createFileRoute } from "@tanstack/react-router";
import { AttractionGuidePage, attractionMeta } from "@/components/AttractionGuidePage";

export const Route = createFileRoute("/attractions/mitzpe-ramon-crater")({
  head: () => attractionMeta("mitzpe-ramon-crater"),
  component: () => <AttractionGuidePage id="mitzpe-ramon-crater" />,
});
