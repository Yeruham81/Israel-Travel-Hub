import { createFileRoute } from "@tanstack/react-router";
import { TiberiasHotelEditorialGuide } from "@/components/TiberiasHotelEditorialGuide";
import { tiberiasStayGuide } from "@/data/content";
import { hotelEditorialMeta } from "@/lib/hotel-editorial-meta";

const g = { ...tiberiasStayGuide, reviewedAt: "2026-11-19" };
export const Route = createFileRoute("/travel-blog/best-hotels-in-tiberias")({
 head: () => hotelEditorialMeta(g, "tiberias", g.photo.src),
 component: () => <TiberiasHotelEditorialGuide guide={g} />,
});
