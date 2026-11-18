import { createFileRoute } from "@tanstack/react-router";
import { HotelCategoryPage } from "@/components/HotelCategoryPage";
import { hotelCategoryGuides, tiberiasStayGuide } from "@/data/content";
import { hotelSubguideMeta } from "@/lib/landing-schema";
const guide = hotelCategoryGuides.find(g => g.path === "/accommodation/tiberias/family-hotels/")!;
const destination = tiberiasStayGuide;
export const Route = createFileRoute("/accommodation/tiberias/family-hotels")({
 head: () => hotelSubguideMeta(guide, destination, guide.shortTitle, guide.photo.src),
 component: () => <HotelCategoryPage guide={guide} destination={destination} />,
});
