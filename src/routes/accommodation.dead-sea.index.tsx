import { createFileRoute } from "@tanstack/react-router";
import { HotelDestinationPage } from "@/components/HotelDestinationPage";
import { deadSeaStayGuide } from "@/data/content";
const g = { ...deadSeaStayGuide, reviewedAt: "2026-11-25" };
export const Route = createFileRoute("/accommodation/dead-sea/")({
 head: async (ctx) => { const { routeHead } = await import("../route-heads/accommodation.dead-sea.index.head"); return Reflect.apply(routeHead, undefined, [ctx]); },
 component: () => <HotelDestinationPage guide={g} />,
});
