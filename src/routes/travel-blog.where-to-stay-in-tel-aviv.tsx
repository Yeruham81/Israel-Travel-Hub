import { createFileRoute } from "@tanstack/react-router";
import { CityNeighborhoodEditorial } from "@/components/CityNeighborhoodEditorial";
import { cityStayGuides, neighborhoodGuidesForCity } from "@/data/content";
import { hotelEditorialMeta } from "@/lib/hotel-editorial-meta";

const g = cityStayGuides.telaviv;
export const Route = createFileRoute("/travel-blog/where-to-stay-in-tel-aviv")({
 head: () => hotelEditorialMeta(g, "telaviv", neighborhoodGuidesForCity(g.id)[0]?.photo.src || ""),
 component: () => <CityNeighborhoodEditorial guide={g} />,
});
