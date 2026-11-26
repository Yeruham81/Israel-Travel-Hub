import { createFileRoute } from "@tanstack/react-router";
import { NeighborhoodStayPage } from "@/components/NeighborhoodStayPage";
import { jerusalemAreaGuides } from "@/data/content";
import { hotelSubguideMeta } from "@/lib/landing-schema";
const guide = jerusalemAreaGuides.find(g => g.path === "/accommodation/jerusalem/mamilla-king-david/")!;

export const Route = createFileRoute("/accommodation/jerusalem/mamilla-king-david")({
 head: async (ctx) => { const { routeHead } = await import("../route-heads/accommodation.jerusalem.mamilla-king-david.head"); return Reflect.apply(routeHead, undefined, [ctx]); },
 component: () => <NeighborhoodStayPage area={guide} />,
});
