import { createFileRoute } from "@tanstack/react-router";
import { TourCategoryPage, tourCategoryMeta } from "@/components/TourCategoryPage";
import { parseTourSearch } from "@/lib/tours";

export const Route = createFileRoute("/tours/negev-desert-ramon-crater")({
  validateSearch: parseTourSearch,
  head: () => tourCategoryMeta("negev-ramon"),
  component: CategoryRoute,
});

function CategoryRoute() {
  const filters = Route.useSearch();
  const navigate = Route.useNavigate();
  return <TourCategoryPage id="negev-ramon" filters={filters} onChange={(search, replace) => { void navigate({ search: parseTourSearch(search), resetScroll: false, replace: Boolean(replace) }); }} />;
}
