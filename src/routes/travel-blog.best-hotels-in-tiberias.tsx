import { createFileRoute } from "@tanstack/react-router";
import { StayEditorialGuidePage } from "@/components/StayEditorialGuidePage";
import { tiberiasStayGuide } from "@/data/content";
import { hotelEditorialMeta } from "@/lib/hotel-editorial-meta";

const g = tiberiasStayGuide;
export const Route = createFileRoute("/travel-blog/best-hotels-in-tiberias")({
 head: () => hotelEditorialMeta(g, "tiberias", g.photo.src),
 component: () => <StayEditorialGuidePage guide={g} id="tiberias" />,
});
