import { createFileRoute } from "@tanstack/react-router";
import { NeighborhoodStayPage } from "@/components/NeighborhoodStayPage";
import { telAvivAreaGuides, cityStayGuides } from "@/data/content";
import { hotelSubguideMeta } from "@/lib/landing-schema";
const guide = telAvivAreaGuides.find(g => g.path === "/accommodation/tel-aviv/neve-tzedek/")!;

export const Route = createFileRoute("/accommodation/tel-aviv/neve-tzedek")({
 head: async (ctx) => { const { routeHead } = await import("../route-heads/accommodation.tel-aviv.neve-tzedek.head"); return Reflect.apply(routeHead, undefined, [ctx]); },
 component: () => <NeighborhoodStayPage area={guide} />,
});
