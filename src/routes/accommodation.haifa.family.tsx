import { createFileRoute } from "@tanstack/react-router";
import { HotelCategoryPage } from "@/components/HotelCategoryPage";
import { hotelCategoryGuides, haifaStayGuide } from "@/data/content";
import { hotelSubguideMeta } from "@/lib/landing-schema";
const guide = hotelCategoryGuides.find(g => g.path === "/accommodation/haifa/family/")!;
const destination = haifaStayGuide;
export const Route = createFileRoute("/accommodation/haifa/family")({
 head: () => hotelSubguideMeta(guide, destination, guide.shortTitle, guide.photo.src),
 component: () => <HotelCategoryPage guide={guide} destination={destination} />,
});
