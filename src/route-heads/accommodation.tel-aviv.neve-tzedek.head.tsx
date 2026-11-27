import { telAvivAreaGuides, cityStayGuides } from "@/data/content";
import { hotelSubguideMeta } from "@/lib/landing-schema";

const guide = telAvivAreaGuides.find(g => g.path === "/accommodation/tel-aviv/neve-tzedek/")!;
const city = cityStayGuides[guide.cityId];
export const routeHead = () => hotelSubguideMeta(guide, { name: city.city, path: city.path, reviewedAt: city.reviewedAt, sourceIds: city.sourceIds }, guide.shortName, guide.photo.src);