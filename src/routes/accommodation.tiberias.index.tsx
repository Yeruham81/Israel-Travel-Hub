import { createFileRoute } from "@tanstack/react-router";
import { HotelDestinationPage } from "@/components/HotelDestinationPage";
import { tiberiasStayGuide } from "@/data/content";
import { hotelGuideMeta } from "@/lib/landing-schema";
const g = tiberiasStayGuide;
export const Route = createFileRoute("/accommodation/tiberias/")({
 head: async (ctx) => { const { routeHead } = await import("../route-heads/accommodation.tiberias.index.head"); return Reflect.apply(routeHead, undefined, [ctx]); },
 component: () => <HotelDestinationPage guide={g} />,
});
