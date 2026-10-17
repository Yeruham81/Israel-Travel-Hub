import { createFileRoute } from "@tanstack/react-router";
import { HotelDestinationPage } from "@/components/HotelDestinationPage";
import { haifaStayGuide as guide } from "@/data/content";
import { pageMeta } from "@/lib/site";

export const Route = createFileRoute("/travel-blog/best-hotels-in-haifa")({
  head: () => pageMeta({ title: guide.title, description: guide.metaDescription, path: guide.path, type: "article", crumbs: [{ name: "Home", path: "/" }, { name: "Accommodation", path: "/hotels/" }, { name: guide.name, path: guide.path }] }),
  component: () => <HotelDestinationPage guide={guide} />,
});
