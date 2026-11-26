import { createFileRoute } from "@tanstack/react-router";
import { attractionMeta } from "@/lib/attraction-meta";
import { MountTaborAttractionPage } from "@/components/MountTaborAttractionPage";

export const Route = createFileRoute("/attractions/mount-tabor")({
  head: async (ctx) => { const { routeHead } = await import("../route-heads/attractions.mount-tabor.head"); return Reflect.apply(routeHead, undefined, [ctx]); },
  component: MountTaborAttractionPage,
});
