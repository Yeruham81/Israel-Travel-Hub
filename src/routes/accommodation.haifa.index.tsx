import { createFileRoute } from "@tanstack/react-router";
import { HotelDestinationPage } from "@/components/HotelDestinationPage";
import { haifaStayGuide } from "@/data/content";
import { hotelGuideMeta } from "@/lib/landing-schema";
const g = { ...haifaStayGuide, reviewedAt: "2026-11-25" };
export const Route = createFileRoute("/accommodation/haifa/")({
 head: async (ctx) => { const { routeHead } = await import("../route-heads/accommodation.haifa.index.head"); return Reflect.apply(routeHead, undefined, [ctx]); },
 component: () => <HotelDestinationPage guide={g} />,
});
