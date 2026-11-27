import { createFileRoute } from "@tanstack/react-router";
import { CarRentalGuide } from "@/components/CarRentalGuide";

export const Route = createFileRoute("/car-rental")({
  head: async (ctx) => { const { routeHead } = await import("../route-heads/car-rental.head"); return Reflect.apply(routeHead, undefined, [ctx]); },
  component: CarRentalGuide,
});
