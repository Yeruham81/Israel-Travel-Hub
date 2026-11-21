import { createFileRoute } from "@tanstack/react-router";
import { AirportJourneyPage, airportJourneyMeta } from "@/components/AirportJourneyPage";

export const Route = createFileRoute("/travel-blog/ben-gurion-airport-to-jerusalem")({
  head: () => airportJourneyMeta("jerusalem"),
  component: () => <AirportJourneyPage id="jerusalem" />,
});
