import { cityStayGuides, telAvivAreaGuides } from "@/data/content";
import { hotelGuideMeta } from "@/lib/landing-schema";

const g = cityStayGuides.telaviv;
export const routeHead = () => hotelGuideMeta(g, g.city, telAvivAreaGuides[0]?.photo.src || "");