import { createFileRoute } from "@tanstack/react-router";
import { TourCategoryPage } from "@/components/TourCategoryPage";
import { parseTourSearch } from "@/lib/tours";

export const Route = createFileRoute("/tours/tel-aviv-jaffa")({
  validateSearch: parseTourSearch,
  head: async (ctx) => { const { routeHead } = await import("../route-heads/tours.tel-aviv-jaffa.head"); return Reflect.apply(routeHead, undefined, [ctx]); },
  component: CategoryRoute,
});

function CategoryRoute() {
  const filters = Route.useSearch();
  const navigate = Route.useNavigate();
  return <TourCategoryPage id="tel-aviv-jaffa" filters={filters} onChange={(search, replace) => { void navigate({ search: parseTourSearch(search), resetScroll: false, replace: Boolean(replace) }); }} />;
}
