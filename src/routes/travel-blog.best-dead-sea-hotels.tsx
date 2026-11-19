import { createFileRoute } from "@tanstack/react-router";
import { HotelStyleEditorialGuide } from "@/components/HotelStyleEditorialGuide";
import { deadSeaStayGuide } from "@/data/content";
import { hotelEditorialMeta } from "@/lib/hotel-editorial-meta";

const g = { ...deadSeaStayGuide, reviewedAt: "2026-11-19" };
export const Route = createFileRoute("/travel-blog/best-dead-sea-hotels")({
 head: () => hotelEditorialMeta(g, "deadsea", g.photo.src),
 component: () => <HotelStyleEditorialGuide guide={g} />,
});
