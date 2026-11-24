import { jerusalemAreaGuides, cityStayGuides } from "@/data/content";
import { hotelSubguideMeta } from "@/lib/landing-schema";
import { Route } from "../routes/accommodation.jerusalem.old-city";

const guide = jerusalemAreaGuides.find(g => g.path === "/accommodation/jerusalem/old-city/")!;
const city = cityStayGuides[guide.cityId];
export const routeHead = () => hotelSubguideMeta(guide, { name: city.city, path: city.path, reviewedAt: city.reviewedAt, sourceIds: city.sourceIds }, guide.shortName, guide.photo.src);