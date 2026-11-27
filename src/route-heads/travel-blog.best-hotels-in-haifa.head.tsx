import { haifaStayGuide } from "@/data/content";
import { hotelEditorialMeta } from "@/lib/hotel-editorial-meta";

const g = {
  ...haifaStayGuide,
  reviewedAt: "2026-11-25",
  photo: {
    ...haifaStayGuide.photo,
    src: "/images/travel-blog/featured-haifa-hotels.webp",
    alt: "Haifa hotels and cityscape",
  },
};
export const routeHead = () => hotelEditorialMeta(g, "haifa", g.photo.src);
