import { createFileRoute } from "@tanstack/react-router";
import { attractionMeta } from "@/components/AttractionGuidePage";
import { TelAvivAttractionsGuide } from "@/components/TelAvivAttractionsGuide";

export const Route = createFileRoute("/travel-blog/attractions-in-tel-aviv")({
  head: () => attractionMeta("attractions-in-tel-aviv"),
  component: TelAvivAttractionsGuide,
});
