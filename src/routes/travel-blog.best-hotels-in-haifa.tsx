import { createFileRoute } from "@tanstack/react-router";
import { HaifaHotelEditorialGuide } from "@/components/HaifaHotelEditorialGuide";
import { accommodationEditorial } from "@/data/accommodationEditorial";
import { haifaStayGuide } from "@/data/content";

const g = {
  ...haifaStayGuide,
  title: accommodationEditorial.haifa.title,
  intro: accommodationEditorial.haifa.intro,
  reviewedAt: "2026-11-25",
  photo: {
    ...haifaStayGuide.photo,
    src: "/images/travel-blog/featured-haifa-hotels.webp",
    alt: "Haifa hotels and cityscape",
  },
};
export const Route = createFileRoute("/travel-blog/best-hotels-in-haifa")({
  head: async (ctx) => {
    const { routeHead } = await import("../route-heads/travel-blog.best-hotels-in-haifa.head");
    return Reflect.apply(routeHead, undefined, [ctx]);
  },
  component: () => <HaifaHotelEditorialGuide guide={g} />,
});
