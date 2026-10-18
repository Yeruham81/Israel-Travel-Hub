import { createFileRoute } from "@tanstack/react-router";
import { NeighborhoodStayPage } from "@/components/NeighborhoodStayPage";
import { cityStayGuides, telAvivAreaGuides } from "@/data/content";
import { hotelSubguideMeta } from "@/lib/landing-schema";

const area = telAvivAreaGuides.find((guide) => guide.id === "telaviv-old-north")!;
const city = cityStayGuides[area.cityId];

export const Route = createFileRoute("/tel-aviv/old-north-port-hotels")({
  head: () => hotelSubguideMeta(area, { name: city.city, path: city.path, reviewedAt: city.reviewedAt, sourceIds: city.sourceIds }, area.shortName, area.photo.src),
  component: () => <NeighborhoodStayPage area={area} />,
});
