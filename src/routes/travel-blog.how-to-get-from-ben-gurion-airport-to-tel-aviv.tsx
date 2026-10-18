import { createFileRoute } from "@tanstack/react-router";
import { AirportJourneyPage, airportJourneyMeta } from "@/components/AirportJourneyPage";

export const Route = createFileRoute("/travel-blog/how-to-get-from-ben-gurion-airport-to-tel-aviv")({
  head: () => airportJourneyMeta("tel-aviv"),
  component: () => <AirportJourneyPage id="tel-aviv" />,
});
