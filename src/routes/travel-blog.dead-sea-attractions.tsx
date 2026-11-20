import { createFileRoute } from "@tanstack/react-router";
import { attractionMeta } from "@/components/AttractionGuidePage";
import { DeadSeaAttractionsGuide } from "@/components/DeadSeaAttractionsGuide";

export const Route = createFileRoute("/travel-blog/dead-sea-attractions")({
  head: () => attractionMeta("dead-sea-attractions"),
  component: DeadSeaAttractionsGuide,
});
