import { createFileRoute } from "@tanstack/react-router";
import { TabghaAttractionPage } from "@/components/TabghaAttractionPage";

export const Route = createFileRoute("/attractions/tabgha")({
  head: async (ctx) => {
    const { routeHead } = await import("../route-heads/attractions.tabgha.head");
    return Reflect.apply(routeHead, undefined, [ctx]);
  },
  component: TabghaAttractionPage,
});
