import { createFileRoute } from "@tanstack/react-router";
import { StayEditorialGuidePage } from "@/components/StayEditorialGuidePage";
import { cityStayGuides, neighborhoodGuidesForCity } from "@/data/content";
import { hotelEditorialMeta } from "@/lib/hotel-editorial-meta";

const g = cityStayGuides.jerusalem;
export const Route = createFileRoute("/travel-blog/where-to-stay-in-jerusalem")({
 head: () => hotelEditorialMeta(g, "jerusalem", neighborhoodGuidesForCity(g.id)[0]?.photo.src || ""),
 component: () => <StayEditorialGuidePage guide={g} id="jerusalem" />,
});
