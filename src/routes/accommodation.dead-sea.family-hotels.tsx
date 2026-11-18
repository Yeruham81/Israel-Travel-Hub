import { createFileRoute } from "@tanstack/react-router";
import { HotelCategoryPage } from "@/components/HotelCategoryPage";
import { hotelCategoryGuides, deadSeaStayGuide } from "@/data/content";
import { hotelSubguideMeta } from "@/lib/landing-schema";
const guide = hotelCategoryGuides.find(g => g.path === "/accommodation/dead-sea/family-hotels/")!;
const destination = deadSeaStayGuide;
export const Route = createFileRoute("/accommodation/dead-sea/family-hotels")({
 head: () => hotelSubguideMeta(guide, destination, guide.shortTitle, guide.photo.src),
 component: () => <HotelCategoryPage guide={guide} destination={destination} />,
});
