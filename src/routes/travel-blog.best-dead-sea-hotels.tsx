import { createFileRoute } from "@tanstack/react-router";
import { StayEditorialGuidePage } from "@/components/StayEditorialGuidePage";
import { deadSeaStayGuide } from "@/data/content";
import { hotelEditorialMeta } from "@/lib/hotel-editorial-meta";

const g = deadSeaStayGuide;
export const Route = createFileRoute("/travel-blog/best-dead-sea-hotels")({
 head: () => hotelEditorialMeta(g, "deadsea", g.photo.src),
 component: () => <StayEditorialGuidePage guide={g} id="deadsea" />,
});
