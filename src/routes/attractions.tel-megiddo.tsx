import { createFileRoute } from "@tanstack/react-router";
import { travelGuideMeta } from "@/components/TravelGuide";
import { TelMegiddoAttractionPage } from "@/components/TelMegiddoAttractionPage";

export const Route = createFileRoute("/attractions/tel-megiddo")({
  head: async (ctx) => { const { routeHead } = await import("../route-heads/attractions.tel-megiddo.head"); return Reflect.apply(routeHead, undefined, [ctx]); },
  component: TelMegiddoAttractionPage,
});
