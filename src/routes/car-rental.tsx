import { createFileRoute } from "@tanstack/react-router";
import { CarRentalGuide } from "@/components/CarRentalGuide";
import { CAR_RENTAL_UPDATED, carRentalTitle, carRentalDescription, carRentalHero } from "@/data/carRentalGuide";
import { CANONICAL_ORIGIN, jsonLd, pageMeta } from "@/lib/site";

export const Route = createFileRoute("/car-rental")({
  head: async (ctx) => { const { routeHead } = await import("../route-heads/car-rental.head"); return Reflect.apply(routeHead, undefined, [ctx]); },
  component: CarRentalGuide,
});
