import { createFileRoute } from "@tanstack/react-router";
import { AirportRoutePage, airportRouteMeta } from "@/components/AirportRoutePage";

export const Route = createFileRoute("/airport-transfers/tel-aviv")({
  head: () => airportRouteMeta("tel-aviv"),
  component: () => <AirportRoutePage id="tel-aviv" />,
});
