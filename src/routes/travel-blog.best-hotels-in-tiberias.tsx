import { createFileRoute } from "@tanstack/react-router";
import { HotelDestinationPage } from "@/components/HotelDestinationPage";
import { tiberiasStayGuide as g } from "@/data/content";
import { pageMeta } from "@/lib/site";

export const Route = createFileRoute("/travel-blog/best-hotels-in-tiberias")({
  head: () =>
    pageMeta({
      title: g.title,
      description: g.metaDescription,
      path: g.path,
      type: "article",
      crumbs: [{ name: "Home", path: "/" }, { name: "Accommodation", path: "/hotels/" }, { name: g.name, path: g.path }],
    }),
  component: StayTiberias,
});

function StayTiberias() {
  return <HotelDestinationPage guide={g} />;
}
