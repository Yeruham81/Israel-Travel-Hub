import { createFileRoute } from "@tanstack/react-router";
import { AirportRoutePage } from "@/components/AirportRoutePage";

export const Route = createFileRoute("/airport-transfers/jerusalem")({
  head: async (ctx) => { const { routeHead } = await import("../route-heads/airport-transfers.jerusalem.head"); return Reflect.apply(routeHead, undefined, [ctx]); },
  component: () => <AirportRoutePage id="jerusalem" />,
});
