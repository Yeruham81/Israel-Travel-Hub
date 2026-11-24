import { createFileRoute } from "@tanstack/react-router";
import { travelGuideMeta } from "@/components/TravelGuide";
import { MagdalaAttractionPage } from "@/components/MagdalaAttractionPage";

export const Route = createFileRoute("/attractions/magdala")({
  head: async (ctx) => { const { routeHead } = await import("../route-heads/attractions.magdala.head"); return Reflect.apply(routeHead, undefined, [ctx]); },
  component: MagdalaAttractionPage,
});
