import { createFileRoute } from "@tanstack/react-router";
import { HotelCategoryPage } from "@/components/HotelCategoryPage";
import { haifaStayGuide as destination, hotelCategoryGuides } from "@/data/content";
import { pageMeta } from "@/lib/site";

const guide = hotelCategoryGuides.find((guide) => guide.destinationId === destination.id && guide.id === "boutique")!;

export const Route = createFileRoute("/haifa/boutique-hotels")({
  head: () => pageMeta({ title: guide.title, description: guide.metaDescription, path: guide.path, type: "article", crumbs: [{ name: "Home", path: "/" }, { name: "Accommodation", path: "/hotels/" }, { name: destination.name, path: destination.path }, { name: guide.shortTitle, path: guide.path }] }),
  component: () => <HotelCategoryPage guide={guide} destination={destination} />,
});
