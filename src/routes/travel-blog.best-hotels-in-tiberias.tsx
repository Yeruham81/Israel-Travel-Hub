import { createFileRoute } from "@tanstack/react-router";
import { CityStayPage } from "@/components/CityStayPage";
import { cityStayGuides } from "@/data/content";
import { pageMeta } from "@/lib/site";

const g = cityStayGuides.tiberias;

export const Route = createFileRoute("/travel-blog/best-hotels-in-tiberias")({
  head: () =>
    pageMeta({
      title: g.title,
      description: g.metaDescription,
      path: g.path,
      type: "article",
      crumbs: [{ name: "Home", path: "/" }, { name: "Accommodation", path: "/hotels/" }, { name: g.city, path: g.path }],
    }),
  component: StayTiberias,
});

function StayTiberias() {
  return <CityStayPage g={g} />;
}
