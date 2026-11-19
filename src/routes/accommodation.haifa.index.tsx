import { createFileRoute } from "@tanstack/react-router";
import { HaifaHotelEditorialGuide } from "@/components/HaifaHotelEditorialGuide";
import { haifaStayGuide } from "@/data/content";
import { hotelGuideMeta } from "@/lib/landing-schema";
const g = { ...haifaStayGuide, reviewedAt: "2026-11-19" };
export const Route = createFileRoute("/accommodation/haifa/")({
 head: () => hotelGuideMeta(g, g.name, g.photo.src),
 component: () => <HaifaHotelEditorialGuide guide={g} />,
});
