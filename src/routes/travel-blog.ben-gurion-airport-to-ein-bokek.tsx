import { createFileRoute } from "@tanstack/react-router";
import { AirportJourneyPage } from "@/components/AirportJourneyPage";

export const Route = createFileRoute("/travel-blog/ben-gurion-airport-to-ein-bokek")({
  head: async (ctx) => { const { routeHead } = await import("../route-heads/travel-blog.ben-gurion-airport-to-ein-bokek.head"); return Reflect.apply(routeHead, undefined, [ctx]); },
  component: () => <AirportJourneyPage id="ein-bokek" />,
});
