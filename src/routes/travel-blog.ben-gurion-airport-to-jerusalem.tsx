import { createFileRoute } from "@tanstack/react-router";
import { AirportRoutePage, airportRouteMeta } from "@/components/AirportRoutePage";

export const Route = createFileRoute("/travel-blog/ben-gurion-airport-to-jerusalem")({
  head: () => airportRouteMeta("jerusalem"),
  component: () => <AirportRoutePage id="jerusalem" />,
});
