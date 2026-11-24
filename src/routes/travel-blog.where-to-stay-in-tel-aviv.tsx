import { createFileRoute } from "@tanstack/react-router";
import { CityNeighborhoodEditorial } from "@/components/CityNeighborhoodEditorial";
import { cityStayGuides } from "@/data/content";
import { stayEditorialHeroPhotos } from "@/data/stayEditorialHeroPhotos";
import { hotelEditorialMeta } from "@/lib/hotel-editorial-meta";

const g = cityStayGuides.telaviv;
export const Route = createFileRoute("/travel-blog/where-to-stay-in-tel-aviv")({
 head: async (ctx) => { const { routeHead } = await import("../route-heads/travel-blog.where-to-stay-in-tel-aviv.head"); return Reflect.apply(routeHead, undefined, [ctx]); },
 component: () => <CityNeighborhoodEditorial guide={g} />,
});
