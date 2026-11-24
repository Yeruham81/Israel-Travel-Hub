import { createFileRoute } from "@tanstack/react-router";
import { HaifaHotelEditorialGuide } from "@/components/HaifaHotelEditorialGuide";
import { haifaStayGuide } from "@/data/content";
import { hotelGuideMeta } from "@/lib/landing-schema";
const g = { ...haifaStayGuide, reviewedAt: "2026-11-19" };
export const Route = createFileRoute("/accommodation/haifa/")({
 head: async (ctx) => { const { routeHead } = await import("../route-heads/accommodation.haifa.index.head"); return Reflect.apply(routeHead, undefined, [ctx]); },
 component: () => <HaifaHotelEditorialGuide guide={g} />,
});
