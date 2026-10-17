import { createFileRoute } from "@tanstack/react-router";
import { AirportRoutePage, airportRouteMeta } from "@/components/AirportRoutePage";

export const Route = createFileRoute("/travel-blog/ben-gurion-airport-to-haifa")({
  head: () => airportRouteMeta("haifa"),
  component: () => <AirportRoutePage id="haifa" />,
});
