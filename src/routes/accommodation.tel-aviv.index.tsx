import { createFileRoute } from "@tanstack/react-router";
import { TelAvivStayHub } from "@/components/TelAvivStayHub";
import { cityStayGuides, telAvivAreaGuides } from "@/data/content";
const g = cityStayGuides.telaviv;
export const Route = createFileRoute("/accommodation/tel-aviv/")({
 head: async (ctx) => { const { routeHead } = await import("../route-heads/accommodation.tel-aviv.index.head"); return Reflect.apply(routeHead, undefined, [ctx]); },
 component: () => <TelAvivStayHub g={g} areas={telAvivAreaGuides} />,
});
