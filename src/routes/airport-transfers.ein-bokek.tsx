import { createFileRoute } from "@tanstack/react-router";
import { AirportRoutePage } from "@/components/AirportRoutePage";

export const Route = createFileRoute("/airport-transfers/ein-bokek")({
  head: async (ctx) => {
    const { routeHead } = await import("../route-heads/airport-transfers.ein-bokek.head");
    return Reflect.apply(routeHead, undefined, [ctx]);
  },
  component: () => <AirportRoutePage id="dead-sea" />,
});
