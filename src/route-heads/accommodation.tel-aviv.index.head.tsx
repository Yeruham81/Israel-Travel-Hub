import { cityStayGuides } from "@/data/content";
import telavivHeroPhoto from "@/assets/home/hero-refresh-tel-aviv-coastline-v2-medium.webp";
import { hotelGuideMeta } from "@/lib/landing-schema";

const g = cityStayGuides.telaviv;
export const routeHead = () => hotelGuideMeta(g, g.city, telavivHeroPhoto);