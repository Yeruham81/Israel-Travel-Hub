import { createFileRoute } from "@tanstack/react-router";
import { CityNeighborhoodEditorial } from "@/components/CityNeighborhoodEditorial";
import { cityStayGuides } from "@/data/content";
import { stayEditorialHeroPhotos } from "@/data/stayEditorialHeroPhotos";
import { hotelEditorialMeta } from "@/lib/hotel-editorial-meta";

const g = cityStayGuides.jerusalem;
export const Route = createFileRoute("/travel-blog/where-to-stay-in-jerusalem")({
 head: () => hotelEditorialMeta(g, "jerusalem", stayEditorialHeroPhotos.jerusalem.src),
 component: () => <CityNeighborhoodEditorial guide={g} />,
});
