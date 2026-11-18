import { createFileRoute } from "@tanstack/react-router";
import { NeighborhoodStayPage } from "@/components/NeighborhoodStayPage";
import { jerusalemAreaGuides, cityStayGuides } from "@/data/content";
import { hotelSubguideMeta } from "@/lib/landing-schema";
const guide = jerusalemAreaGuides.find(g => g.path === "/accommodation/jerusalem/mamilla-king-david-hotels/")!;
const city = cityStayGuides[guide.cityId];
export const Route = createFileRoute("/accommodation/jerusalem/mamilla-king-david-hotels")({
 head: () => hotelSubguideMeta(guide, { name: city.city, path: city.path, reviewedAt: city.reviewedAt, sourceIds: city.sourceIds }, guide.shortName, guide.photo.src),
 component: () => <NeighborhoodStayPage area={guide} />,
});
