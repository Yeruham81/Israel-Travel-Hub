import { createFileRoute } from "@tanstack/react-router";
import { CityNeighborhoodEditorial } from "@/components/CityNeighborhoodEditorial";
import { cityStayGuides } from "@/data/content";

const g = cityStayGuides.jerusalem;
export const Route = createFileRoute("/travel-blog/where-to-stay-in-jerusalem")({
  head: async (ctx) => {
    const { routeHead } =
      await import("../route-heads/travel-blog.where-to-stay-in-jerusalem.head");
    return Reflect.apply(routeHead, undefined, [ctx]);
  },
  component: () => <CityNeighborhoodEditorial guide={g} />,
});
