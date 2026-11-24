import { haifaStayGuide } from "@/data/content";
import { hotelEditorialMeta } from "@/lib/hotel-editorial-meta";

const g = { ...haifaStayGuide, photo: { ...haifaStayGuide.photo, src: "/images/travel-blog/featured-haifa-hotels.webp", alt: "Haifa hotels and cityscape" } };
export const routeHead = () => hotelEditorialMeta(g, "haifa", g.photo.src);