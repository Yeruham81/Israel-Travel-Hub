import { hotelCategoryGuides, deadSeaStayGuide } from "@/data/content";
import { hotelSubguideMeta } from "@/lib/landing-schema";

const guide = hotelCategoryGuides.find((g) => g.path === "/accommodation/dead-sea/family/")!;
const destination = deadSeaStayGuide;
export const routeHead = () =>
  hotelSubguideMeta(guide, destination, guide.shortTitle, guide.photo.src);
