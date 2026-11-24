import { createFileRoute } from "@tanstack/react-router";
import { AirportJourneyPage, airportJourneyMeta } from "@/components/AirportJourneyPage";

export const Route = createFileRoute("/travel-blog/ben-gurion-airport-to-tel-aviv")({
  head: async (ctx) => { const { routeHead } = await import("../route-heads/travel-blog.ben-gurion-airport-to-tel-aviv.head"); return Reflect.apply(routeHead, undefined, [ctx]); },
  component: () => <AirportJourneyPage id="tel-aviv" />,
});
