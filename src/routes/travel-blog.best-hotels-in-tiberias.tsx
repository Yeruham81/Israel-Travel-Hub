import { createFileRoute } from "@tanstack/react-router";
import { TiberiasHotelEditorialGuide } from "@/components/TiberiasHotelEditorialGuide";
import { tiberiasStayGuide } from "@/data/content";

const g = { ...tiberiasStayGuide, reviewedAt: "2026-11-19" };
export const Route = createFileRoute("/travel-blog/best-hotels-in-tiberias")({
  head: async (ctx) => {
    const { routeHead } = await import("../route-heads/travel-blog.best-hotels-in-tiberias.head");
    return Reflect.apply(routeHead, undefined, [ctx]);
  },
  component: () => <TiberiasHotelEditorialGuide guide={g} />,
});
