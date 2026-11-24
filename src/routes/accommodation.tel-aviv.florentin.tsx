import { createFileRoute } from "@tanstack/react-router";
import { NeighborhoodStayPage } from "@/components/NeighborhoodStayPage";
import { telAvivAreaGuides, cityStayGuides } from "@/data/content";
import { hotelSubguideMeta } from "@/lib/landing-schema";
const guide = telAvivAreaGuides.find(g => g.path === "/accommodation/tel-aviv/florentin/")!;

export const Route = createFileRoute("/accommodation/tel-aviv/florentin")({
 head: async (ctx) => { const { routeHead } = await import("../route-heads/accommodation.tel-aviv.florentin.head"); return Reflect.apply(routeHead, undefined, [ctx]); },
 component: () => <NeighborhoodStayPage area={guide} />,
});
