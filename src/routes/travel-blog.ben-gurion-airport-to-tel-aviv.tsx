import { createFileRoute } from "@tanstack/react-router";
import { AirportRoutePage, airportRouteMeta } from "@/components/AirportRoutePage";

export const Route = createFileRoute("/travel-blog/ben-gurion-airport-to-tel-aviv")({
  head: () => airportRouteMeta("tel-aviv"),
  component: () => <AirportRoutePage id="tel-aviv" />,
});
