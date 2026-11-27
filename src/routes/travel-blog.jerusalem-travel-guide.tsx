import { createFileRoute } from "@tanstack/react-router";
import { JerusalemCityHubPage } from "@/components/JerusalemCityHub";

export const Route = createFileRoute("/travel-blog/jerusalem-travel-guide")({
  head: async (ctx) => { const { routeHead } = await import("../route-heads/travel-blog.jerusalem-travel-guide.head"); return Reflect.apply(routeHead, undefined, [ctx]); },
  component:JerusalemCityHubPage,
});
