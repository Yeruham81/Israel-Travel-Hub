import { createFileRoute } from "@tanstack/react-router";
import { CapernaumAttractionPage } from "@/components/CapernaumAttractionPage";

export const Route = createFileRoute("/attractions/capernaum")({
  head: async (ctx) => { const { routeHead } = await import("../route-heads/attractions.capernaum.head"); return Reflect.apply(routeHead, undefined, [ctx]); },
  component: CapernaumAttractionPage,
});
