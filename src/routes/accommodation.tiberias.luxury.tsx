import { createFileRoute } from "@tanstack/react-router";
import { HotelCategoryPage } from "@/components/HotelCategoryPage";
import { hotelCategoryGuides, tiberiasStayGuide } from "@/data/content";
const guide = hotelCategoryGuides.find(g => g.path === "/accommodation/tiberias/luxury/")!;
const destination = tiberiasStayGuide;
export const Route = createFileRoute("/accommodation/tiberias/luxury")({
 head: async (ctx) => { const { routeHead } = await import("../route-heads/accommodation.tiberias.luxury.head"); return Reflect.apply(routeHead, undefined, [ctx]); },
 component: () => <HotelCategoryPage guide={guide} destination={destination} />,
});
