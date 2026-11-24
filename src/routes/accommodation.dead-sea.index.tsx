import { createFileRoute } from "@tanstack/react-router";
import { HotelDestinationPage } from "@/components/HotelDestinationPage";
import { deadSeaStayGuide } from "@/data/content";
import { hotelGuideMeta } from "@/lib/landing-schema";
const g = deadSeaStayGuide;
export const Route = createFileRoute("/accommodation/dead-sea/")({
 head: async (ctx) => { const { routeHead } = await import("../route-heads/accommodation.dead-sea.index.head"); return Reflect.apply(routeHead, undefined, [ctx]); },
 component: () => <HotelDestinationPage guide={g} />,
});
