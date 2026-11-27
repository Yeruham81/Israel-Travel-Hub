import { tiberiasStayGuide } from "@/data/content";
import { hotelEditorialMeta } from "@/lib/hotel-editorial-meta";

const g = { ...tiberiasStayGuide, reviewedAt: "2026-11-19" };
export const routeHead = () => hotelEditorialMeta(g, "tiberias", g.photo.src);
