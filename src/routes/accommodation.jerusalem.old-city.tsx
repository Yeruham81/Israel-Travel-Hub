import { createFileRoute } from "@tanstack/react-router";
import { NeighborhoodStayPage } from "@/components/NeighborhoodStayPage";
import { jerusalemAreaGuides, cityStayGuides } from "@/data/content";
import { hotelSubguideMeta } from "@/lib/landing-schema";
const guide = jerusalemAreaGuides.find(g => g.path === "/accommodation/jerusalem/old-city/")!;

export const Route = createFileRoute("/accommodation/jerusalem/old-city")({
 head: async (ctx) => { const { routeHead } = await import("../route-heads/accommodation.jerusalem.old-city.head"); return Reflect.apply(routeHead, undefined, [ctx]); },
 component: () => <NeighborhoodStayPage area={guide} />,
});
