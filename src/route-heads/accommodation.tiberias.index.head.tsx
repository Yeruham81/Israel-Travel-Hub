import { tiberiasStayGuide } from "@/data/content";
import { hotelGuideMeta } from "@/lib/landing-schema";

const g = tiberiasStayGuide;
export const routeHead = () => hotelGuideMeta(g, g.name, g.photo.src);