import { createFileRoute } from "@tanstack/react-router";
import { CityNeighborhoodEditorial } from "@/components/CityNeighborhoodEditorial";
import { cityStayGuides } from "@/data/content";
import jerusalemHero from "@/assets/guides/2026-11/where-to-stay-jerusalem-drive.webp";
import { hotelEditorialMeta } from "@/lib/hotel-editorial-meta";

const g = cityStayGuides.jerusalem;
export const Route = createFileRoute("/travel-blog/where-to-stay-in-jerusalem")({
 head: () => hotelEditorialMeta(g, "jerusalem", jerusalemHero),
 component: () => <CityNeighborhoodEditorial guide={g} />,
});
