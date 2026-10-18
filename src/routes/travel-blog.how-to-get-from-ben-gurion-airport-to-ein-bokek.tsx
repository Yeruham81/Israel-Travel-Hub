import { createFileRoute } from "@tanstack/react-router";
import { AirportJourneyPage, airportJourneyMeta } from "@/components/AirportJourneyPage";

export const Route = createFileRoute("/travel-blog/how-to-get-from-ben-gurion-airport-to-ein-bokek")({
  head: () => airportJourneyMeta("ein-bokek"),
  component: () => <AirportJourneyPage id="ein-bokek" />,
});
