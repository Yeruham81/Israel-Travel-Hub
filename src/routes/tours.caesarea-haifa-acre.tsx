import { createFileRoute } from "@tanstack/react-router";
import { TourCategoryPage, tourCategoryMeta } from "@/components/TourCategoryPage";
import { parseTourSearch } from "@/lib/tours";

export const Route = createFileRoute("/tours/caesarea-haifa-acre")({
  validateSearch: parseTourSearch,
  head: () => tourCategoryMeta("northern-coast"),
  component: CategoryRoute,
});

function CategoryRoute() {
  const filters = Route.useSearch();
  const navigate = Route.useNavigate();
  return <TourCategoryPage id="northern-coast" filters={filters} onChange={(search, replace) => { void navigate({ search: parseTourSearch(search), resetScroll: false, replace: Boolean(replace) }); }} />;
}
