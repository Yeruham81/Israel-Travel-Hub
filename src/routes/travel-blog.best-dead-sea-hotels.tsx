import { createFileRoute } from "@tanstack/react-router";
import { HotelStyleEditorialGuide } from "@/components/HotelStyleEditorialGuide";
import { deadSeaStayGuide } from "@/data/content";
import { hotelEditorialMeta } from "@/lib/hotel-editorial-meta";

const g = deadSeaStayGuide;
export const Route = createFileRoute("/travel-blog/best-dead-sea-hotels")({
 head: () => hotelEditorialMeta(g, "deadsea", g.photo.src),
 component: () => <HotelStyleEditorialGuide guide={g} />,
});
