import { hotelCategoryGuides, tiberiasStayGuide } from "@/data/content";
import { hotelSubguideMeta } from "@/lib/landing-schema";

const guide = hotelCategoryGuides.find(g => g.path === "/accommodation/tiberias/luxury/")!;
const destination = tiberiasStayGuide;
export const routeHead = () => hotelSubguideMeta(guide, destination, guide.shortTitle, guide.photo.src);