import { deadSeaStayGuide } from "@/data/content";
import { hotelEditorialMeta } from "@/lib/hotel-editorial-meta";

const g = { ...deadSeaStayGuide, reviewedAt: "2026-11-19" };
export const routeHead = () => hotelEditorialMeta(g, "deadsea", g.photo.src);
