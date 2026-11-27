import { createFileRoute } from "@tanstack/react-router";
import { HotelCategoryPage } from "@/components/HotelCategoryPage";
import { hotelCategoryGuides, deadSeaStayGuide } from "@/data/content";
const guide = hotelCategoryGuides.find(g => g.path === "/accommodation/dead-sea/family/")!;
const destination = deadSeaStayGuide;
export const Route = createFileRoute("/accommodation/dead-sea/family")({
 head: async (ctx) => { const { routeHead } = await import("../route-heads/accommodation.dead-sea.family.head"); return Reflect.apply(routeHead, undefined, [ctx]); },
 component: () => <HotelCategoryPage guide={guide} destination={destination} />,
});
