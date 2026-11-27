import { cityStayGuides } from "@/data/content";
import { hotelGuideMeta } from "@/lib/landing-schema";
import jerusalemHeroPhoto from "@/assets/home/hero-refresh-jerusalem-jaffa-gate-v4-medium.webp";

const g = cityStayGuides.jerusalem;
export const routeHead = () => hotelGuideMeta(g, g.city, jerusalemHeroPhoto);
