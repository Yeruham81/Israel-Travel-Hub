import { createFileRoute } from "@tanstack/react-router";
import { travelGuideMeta } from "@/components/TravelGuide";
import { AnnunciationAttractionPage } from "@/components/AnnunciationAttractionPage";

export const Route = createFileRoute("/attractions/basilica-of-the-annunciation")({
  head: async (ctx) => { const { routeHead } = await import("../route-heads/attractions.basilica-of-the-annunciation.head"); return Reflect.apply(routeHead, undefined, [ctx]); },
  component: AnnunciationAttractionPage,
});
