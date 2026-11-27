import { jerusalemAreaGuides, cityStayGuides } from "@/data/content";
import { hotelSubguideMeta } from "@/lib/landing-schema";

const guide = jerusalemAreaGuides.find(g => g.path === "/accommodation/jerusalem/mahane-yehuda-nachlaot/")!;
const city = cityStayGuides[guide.cityId];
export const routeHead = () => hotelSubguideMeta(guide, { name: city.city, path: city.path, reviewedAt: city.reviewedAt, sourceIds: city.sourceIds }, guide.shortName, guide.photo.src);