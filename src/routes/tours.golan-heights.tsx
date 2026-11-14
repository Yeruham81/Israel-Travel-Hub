import { createFileRoute } from "@tanstack/react-router";
import { TourCategoryPage, tourCategoryMeta } from "@/components/TourCategoryPage";
import { parseTourSearch } from "@/lib/tours";

export const Route = createFileRoute("/tours/golan-heights")({
  validateSearch: parseTourSearch,
  head: () => tourCategoryMeta("golan-heights"),
  component: CategoryRoute,
});

function CategoryRoute() {
  const filters = Route.useSearch();
  const navigate = Route.useNavigate();
  return <TourCategoryPage id="golan-heights" filters={filters} onChange={(search, replace) => { void navigate({ search: parseTourSearch(search), resetScroll: false, replace: Boolean(replace) }); }} />;
}
