import { createFileRoute } from "@tanstack/react-router";
import { MountBeatitudesAttractionPage } from "@/components/MountBeatitudesAttractionPage";

export const Route = createFileRoute("/attractions/mount-of-beatitudes")({
  head: async (ctx) => { const { routeHead } = await import("../route-heads/attractions.mount-of-beatitudes.head"); return Reflect.apply(routeHead, undefined, [ctx]); },
  component: MountBeatitudesAttractionPage,
});
