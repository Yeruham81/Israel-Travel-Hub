import { createFileRoute } from "@tanstack/react-router";
import { NeighborhoodStayPage } from "@/components/NeighborhoodStayPage";
import { telAvivAreaGuides } from "@/data/content";
const guide = telAvivAreaGuides.find(
  (g) => g.path === "/accommodation/tel-aviv/dizengoff-city-center/",
)!;

export const Route = createFileRoute("/accommodation/tel-aviv/dizengoff-city-center")({
  head: async (ctx) => {
    const { routeHead } =
      await import("../route-heads/accommodation.tel-aviv.dizengoff-city-center.head");
    return Reflect.apply(routeHead, undefined, [ctx]);
  },
  component: () => <NeighborhoodStayPage area={guide} />,
});
