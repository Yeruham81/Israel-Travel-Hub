import { deadSeaStayGuide } from "@/data/content";
import { hotelGuideMeta } from "@/lib/landing-schema";

const g = { ...deadSeaStayGuide, reviewedAt: "2026-11-25" };
export const routeHead = () => hotelGuideMeta(g, g.name, g.photo.src);