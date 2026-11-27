import { hotelCategoryGuides, haifaStayGuide } from "@/data/content";
import { hotelSubguideMeta } from "@/lib/landing-schema";

const guide = hotelCategoryGuides.find((g) => g.path === "/accommodation/haifa/family/")!;
const destination = haifaStayGuide;
export const routeHead = () =>
  hotelSubguideMeta(guide, destination, guide.shortTitle, guide.photo.src);
