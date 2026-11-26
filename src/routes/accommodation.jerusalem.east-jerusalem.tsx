import { createFileRoute } from "@tanstack/react-router";
import { NeighborhoodStayPage } from "@/components/NeighborhoodStayPage";
import { jerusalemAreaGuides } from "@/data/content";
import { hotelSubguideMeta } from "@/lib/landing-schema";
const guide = jerusalemAreaGuides.find(g => g.path === "/accommodation/jerusalem/east-jerusalem/")!;

export const Route = createFileRoute("/accommodation/jerusalem/east-jerusalem")({
 head: async (ctx) => { const { routeHead } = await import("../route-heads/accommodation.jerusalem.east-jerusalem.head"); return Reflect.apply(routeHead, undefined, [ctx]); },
 component: () => <NeighborhoodStayPage area={guide} />,
});
