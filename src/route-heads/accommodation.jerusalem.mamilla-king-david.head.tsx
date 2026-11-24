import { jerusalemAreaGuides, cityStayGuides } from "@/data/content";
import { hotelSubguideMeta } from "@/lib/landing-schema";
import { Route } from "../routes/accommodation.jerusalem.mamilla-king-david";

const guide = jerusalemAreaGuides.find(g => g.path === "/accommodation/jerusalem/mamilla-king-david/")!;
const city = cityStayGuides[guide.cityId];
export const routeHead = () => hotelSubguideMeta(guide, { name: city.city, path: city.path, reviewedAt: city.reviewedAt, sourceIds: city.sourceIds }, guide.shortName, guide.photo.src);