import { createFileRoute } from "@tanstack/react-router";
import { RoshHanikraAttractionPage } from "@/components/RoshHanikraAttractionPage";

export const Route = createFileRoute("/attractions/rosh-hanikra")({
  head: async (ctx) => {
    const { routeHead } = await import("../route-heads/attractions.rosh-hanikra.head");
    return Reflect.apply(routeHead, undefined, [ctx]);
  },
  component: RoshHanikraAttractionPage,
});
