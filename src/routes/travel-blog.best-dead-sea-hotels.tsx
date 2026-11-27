import { createFileRoute } from "@tanstack/react-router";
import { HotelStyleEditorialGuide } from "@/components/HotelStyleEditorialGuide";
import { deadSeaStayGuide } from "@/data/content";

const g = { ...deadSeaStayGuide, reviewedAt: "2026-11-19" };
export const Route = createFileRoute("/travel-blog/best-dead-sea-hotels")({
 head: async (ctx) => { const { routeHead } = await import("../route-heads/travel-blog.best-dead-sea-hotels.head"); return Reflect.apply(routeHead, undefined, [ctx]); },
 component: () => <HotelStyleEditorialGuide guide={g} />,
});
