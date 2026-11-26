import { createFileRoute } from "@tanstack/react-router";
import { AirportJourneyPage } from "@/components/AirportJourneyPage";

export const Route = createFileRoute("/travel-blog/ben-gurion-airport-to-jerusalem")({
  head: async (ctx) => { const { routeHead } = await import("../route-heads/travel-blog.ben-gurion-airport-to-jerusalem.head"); return Reflect.apply(routeHead, undefined, [ctx]); },
  component: () => <AirportJourneyPage id="jerusalem" />,
});
