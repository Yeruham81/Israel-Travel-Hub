import { createFileRoute } from "@tanstack/react-router";
import { NeighborhoodStayPage } from "@/components/NeighborhoodStayPage";
import { jerusalemAreaGuides, cityStayGuides } from "@/data/content";
import { hotelSubguideMeta } from "@/lib/landing-schema";
const guide = jerusalemAreaGuides.find(g => g.path === "/accommodation/jerusalem/german-colony-baka/")!;

export const Route = createFileRoute("/accommodation/jerusalem/german-colony-baka")({
 head: async (ctx) => { const { routeHead } = await import("../route-heads/accommodation.jerusalem.german-colony-baka.head"); return Reflect.apply(routeHead, undefined, [ctx]); },
 component: () => <NeighborhoodStayPage area={guide} />,
});
