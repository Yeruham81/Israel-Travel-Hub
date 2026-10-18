import { createFileRoute } from "@tanstack/react-router";
import { AirportJourneyPage, airportJourneyMeta } from "@/components/AirportJourneyPage";

export const Route = createFileRoute("/travel-blog/how-to-get-from-ben-gurion-airport-to-haifa")({
  head: () => airportJourneyMeta("haifa"),
  component: () => <AirportJourneyPage id="haifa" />,
});
