import { createFileRoute } from "@tanstack/react-router";
import { travelGuideMeta } from "@/components/TravelGuide";
import { YardenitAttractionPage } from "@/components/YardenitAttractionPage";

export const Route = createFileRoute("/attractions/yardenit")({
  head: async (ctx) => { const { routeHead } = await import("../route-heads/attractions.yardenit.head"); return Reflect.apply(routeHead, undefined, [ctx]); },
  component: YardenitAttractionPage,
});
