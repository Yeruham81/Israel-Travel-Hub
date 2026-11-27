import { createFileRoute } from "@tanstack/react-router";
import { NeighborhoodStayPage } from "@/components/NeighborhoodStayPage";
import { jerusalemAreaGuides } from "@/data/content";
const guide = jerusalemAreaGuides.find(g => g.path === "/accommodation/jerusalem/old-city/")!;

export const Route = createFileRoute("/accommodation/jerusalem/old-city")({
 head: async (ctx) => { const { routeHead } = await import("../route-heads/accommodation.jerusalem.old-city.head"); return Reflect.apply(routeHead, undefined, [ctx]); },
 component: () => <NeighborhoodStayPage area={guide} />,
});
