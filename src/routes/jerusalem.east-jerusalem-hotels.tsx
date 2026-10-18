import { createFileRoute } from "@tanstack/react-router";
import { NeighborhoodStayPage } from "@/components/NeighborhoodStayPage";
import { cityStayGuides, jerusalemAreaGuides } from "@/data/content";
import { hotelSubguideMeta } from "@/lib/landing-schema";

const area = jerusalemAreaGuides.find((guide) => guide.id === "east-jerusalem")!;
const city = cityStayGuides[area.cityId];

export const Route = createFileRoute("/jerusalem/east-jerusalem-hotels")({
  head: () => hotelSubguideMeta(area, { name: city.city, path: city.path, reviewedAt: city.reviewedAt, sourceIds: city.sourceIds }, area.shortName, area.photo.src),
  component: () => <NeighborhoodStayPage area={area} />,
});
