import { createFileRoute } from "@tanstack/react-router";
import { NeighborhoodStayPage } from "@/components/NeighborhoodStayPage";
import { jerusalemAreaGuides } from "@/data/content";
const guide = jerusalemAreaGuides.find((g) => g.path === "/accommodation/jerusalem/downtown/")!;

export const Route = createFileRoute("/accommodation/jerusalem/downtown")({
  head: async (ctx) => {
    const { routeHead } = await import("../route-heads/accommodation.jerusalem.downtown.head");
    return Reflect.apply(routeHead, undefined, [ctx]);
  },
  component: () => <NeighborhoodStayPage area={guide} />,
});
