import { telAvivAreaGuides, cityStayGuides } from "@/data/content";
import { hotelSubguideMeta } from "@/lib/landing-schema";
import { Route } from "../routes/accommodation.tel-aviv.kerem-hateimanim";

const guide = telAvivAreaGuides.find(g => g.path === "/accommodation/tel-aviv/kerem-hateimanim/")!;
const city = cityStayGuides[guide.cityId];
export const routeHead = () => hotelSubguideMeta(guide, { name: city.city, path: city.path, reviewedAt: city.reviewedAt, sourceIds: city.sourceIds }, guide.shortName, guide.photo.src);