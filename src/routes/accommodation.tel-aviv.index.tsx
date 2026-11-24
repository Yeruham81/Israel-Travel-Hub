import { createFileRoute } from "@tanstack/react-router";
import { CityStayHub } from "@/components/CityStayHub";
import { cityStayGuides, telAvivAreaGuides } from "@/data/content";
import { hotelGuideMeta } from "@/lib/landing-schema";
const g = cityStayGuides.telaviv;
export const Route = createFileRoute("/accommodation/tel-aviv/")({
 head: async (ctx) => { const { routeHead } = await import("../route-heads/accommodation.tel-aviv.index.head"); return Reflect.apply(routeHead, undefined, [ctx]); },
 component: () => <CityStayHub g={g} areas={telAvivAreaGuides} />,
});
