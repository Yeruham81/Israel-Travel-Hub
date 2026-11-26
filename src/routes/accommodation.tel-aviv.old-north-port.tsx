import { createFileRoute } from "@tanstack/react-router";
import { NeighborhoodStayPage } from "@/components/NeighborhoodStayPage";
import { telAvivAreaGuides } from "@/data/content";
import { hotelSubguideMeta } from "@/lib/landing-schema";
const guide = telAvivAreaGuides.find(g => g.path === "/accommodation/tel-aviv/old-north-port/")!;

export const Route = createFileRoute("/accommodation/tel-aviv/old-north-port")({
 head: async (ctx) => { const { routeHead } = await import("../route-heads/accommodation.tel-aviv.old-north-port.head"); return Reflect.apply(routeHead, undefined, [ctx]); },
 component: () => <NeighborhoodStayPage area={guide} />,
});
