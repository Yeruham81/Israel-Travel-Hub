import { createFileRoute } from "@tanstack/react-router";
import { travelGuideMeta } from "@/components/TravelGuide";
import { MountPrecipiceAttractionPage } from "@/components/MountPrecipiceAttractionPage";

export const Route = createFileRoute("/attractions/mount-precipice")({
  head: async (ctx) => { const { routeHead } = await import("../route-heads/attractions.mount-precipice.head"); return Reflect.apply(routeHead, undefined, [ctx]); },
  component: MountPrecipiceAttractionPage,
});
