import { createFileRoute } from "@tanstack/react-router";
import { CityNeighborhoodEditorial } from "@/components/CityNeighborhoodEditorial";
import { cityStayGuides } from "@/data/content";
import telAvivHero from "@/assets/guides/2026-11/where-to-stay-tel-aviv-drive.webp";
import { hotelEditorialMeta } from "@/lib/hotel-editorial-meta";

const g = cityStayGuides.telaviv;
export const Route = createFileRoute("/travel-blog/where-to-stay-in-tel-aviv")({
 head: () => hotelEditorialMeta(g, "telaviv", telAvivHero),
 component: () => <CityNeighborhoodEditorial guide={g} />,
});
