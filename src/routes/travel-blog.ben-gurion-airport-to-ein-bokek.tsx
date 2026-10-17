import { createFileRoute } from "@tanstack/react-router";
import { AirportRoutePage, airportRouteMeta } from "@/components/AirportRoutePage";

export const Route = createFileRoute("/travel-blog/ben-gurion-airport-to-ein-bokek")({
  head: () => airportRouteMeta("dead-sea"),
  component: () => <AirportRoutePage id="dead-sea" />,
});
