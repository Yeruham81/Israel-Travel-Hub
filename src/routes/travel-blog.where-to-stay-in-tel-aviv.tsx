import { createFileRoute } from "@tanstack/react-router";
import { CityStayPage } from "@/components/CityStayPage";
import { cityStayGuides } from "@/data/content";
import { pageMeta } from "@/lib/site";

const g = cityStayGuides.telaviv;

export const Route = createFileRoute("/travel-blog/where-to-stay-in-tel-aviv")({
  head: () =>
    pageMeta({
      title: g.title,
      description: g.metaDescription,
      path: g.path,
      type: "article",
      crumbs: [{ name: "Home", path: "/" }, { name: "Accommodation", path: "/hotels/" }, { name: g.city, path: g.path }],
    }),
  component: StayTelAviv,
});

function StayTelAviv() {
  return <CityStayPage g={g} />;
}
