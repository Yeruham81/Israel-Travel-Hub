import { createFileRoute } from "@tanstack/react-router";
import { HotelCategoryPage } from "@/components/HotelCategoryPage";
import { tiberiasStayGuide as destination, hotelCategoryGuides } from "@/data/content";
import { hotelSubguideMeta } from "@/lib/landing-schema";

const guide = hotelCategoryGuides.find((guide) => guide.destinationId === destination.id && guide.id === "luxury")!;

export const Route = createFileRoute("/tiberias/luxury-hotels")({
  head: () => hotelSubguideMeta(guide, destination, guide.shortTitle, guide.photo.src),
  component: () => <HotelCategoryPage guide={guide} destination={destination} />,
});
