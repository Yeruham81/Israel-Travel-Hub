import { createFileRoute } from "@tanstack/react-router";
import { HotelCategoryPage } from "@/components/HotelCategoryPage";
import { deadSeaStayGuide as destination, hotelCategoryGuides } from "@/data/content";
import { hotelSubguideMeta } from "@/lib/landing-schema";

const guide = hotelCategoryGuides.find((guide) => guide.destinationId === destination.id && guide.id === "spa")!;

export const Route = createFileRoute("/dead-sea/spa-hotels")({
  head: () => hotelSubguideMeta(guide, destination, guide.shortTitle, guide.photo.src),
  component: () => <HotelCategoryPage guide={guide} destination={destination} />,
});
