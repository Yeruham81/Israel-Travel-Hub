import { createFileRoute } from "@tanstack/react-router";
import { CapernaumAttractionPage } from "@/components/CapernaumAttractionPage";
import { attractionMeta } from "@/lib/attraction-meta";

export const Route = createFileRoute("/attractions/capernaum")({
  head: async (ctx) => { const { routeHead } = await import("../route-heads/attractions.capernaum.head"); return Reflect.apply(routeHead, undefined, [ctx]); },
  component: CapernaumAttractionPage,
});
