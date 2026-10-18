import { createFileRoute } from "@tanstack/react-router";
import { HotelCategoryPage } from "@/components/HotelCategoryPage";
import { haifaStayGuide as destination, hotelCategoryGuides } from "@/data/content";
import { hotelSubguideMeta } from "@/lib/landing-schema";

const guide = hotelCategoryGuides.find((guide) => guide.destinationId === destination.id && guide.id === "boutique")!;

export const Route = createFileRoute("/haifa/boutique-hotels")({
  head: () => hotelSubguideMeta(guide, destination, guide.shortTitle, guide.photo.src),
  component: () => <HotelCategoryPage guide={guide} destination={destination} />,
});
