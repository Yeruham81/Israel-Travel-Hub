import { createFileRoute } from "@tanstack/react-router";
import { StayEditorialGuidePage } from "@/components/StayEditorialGuidePage";
import { haifaStayGuide } from "@/data/content";
import { hotelEditorialMeta } from "@/lib/hotel-editorial-meta";

const g = haifaStayGuide;
export const Route = createFileRoute("/travel-blog/best-hotels-in-haifa")({
 head: () => hotelEditorialMeta(g, "haifa", g.photo.src),
 component: () => <StayEditorialGuidePage guide={g} id="haifa" />,
});
