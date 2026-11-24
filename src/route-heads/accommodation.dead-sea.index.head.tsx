import { deadSeaStayGuide } from "@/data/content";
import { hotelGuideMeta } from "@/lib/landing-schema";

const g = deadSeaStayGuide;
export const routeHead = () => hotelGuideMeta(g, g.name, g.photo.src);