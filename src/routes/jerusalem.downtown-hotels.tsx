import { createFileRoute } from "@tanstack/react-router";
import { NeighborhoodStayPage } from "@/components/NeighborhoodStayPage";
import { cityStayGuides, jerusalemAreaGuides } from "@/data/content";
import { pageMeta } from "@/lib/site";

const area = jerusalemAreaGuides.find((guide) => guide.id === "downtown")!;
const city = cityStayGuides[area.cityId];

export const Route = createFileRoute("/jerusalem/downtown-hotels")({
  head: () => pageMeta({ title: area.title, description: area.metaDescription, path: area.path, type: "article", crumbs: [{ name: "Home", path: "/" }, { name: "Accommodation", path: "/hotels/" }, { name: city.city, path: city.path }, { name: area.shortName, path: area.path }] }),
  component: () => <NeighborhoodStayPage area={area} />,
});
