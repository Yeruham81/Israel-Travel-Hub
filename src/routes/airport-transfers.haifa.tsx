import { createFileRoute } from "@tanstack/react-router";
import { AirportRoutePage, airportRouteMeta } from "@/components/AirportRoutePage";

export const Route = createFileRoute("/airport-transfers/haifa")({
  head: () => airportRouteMeta("haifa"),
  component: () => <AirportRoutePage id="haifa" />,
});
