import { createFileRoute } from "@tanstack/react-router";
import { NeighborhoodStayPage } from "@/components/NeighborhoodStayPage";
import { telAvivAreaGuides, cityStayGuides } from "@/data/content";
import { hotelSubguideMeta } from "@/lib/landing-schema";
const guide = telAvivAreaGuides.find(g => g.path === "/accommodation/tel-aviv/rothschild-boulevard-hotels/")!;
const city = cityStayGuides[guide.cityId];
export const Route = createFileRoute("/accommodation/tel-aviv/rothschild-boulevard-hotels")({
 head: () => hotelSubguideMeta(guide, { name: city.city, path: city.path, reviewedAt: city.reviewedAt, sourceIds: city.sourceIds }, guide.shortName, guide.photo.src),
 component: () => <NeighborhoodStayPage area={guide} />,
});
