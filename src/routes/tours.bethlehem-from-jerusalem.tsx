import { createFileRoute } from "@tanstack/react-router";
import { TourCategoryPage, tourCategoryMeta } from "@/components/TourCategoryPage";
import { parseTourSearch } from "@/lib/tours";

export const Route = createFileRoute("/tours/bethlehem-from-jerusalem")({
  validateSearch: parseTourSearch,
  head: () => tourCategoryMeta("bethlehem-jericho", {
    path: "/tours/bethlehem-from-jerusalem/", title: "Bethlehem tours from Jerusalem",
    description: "Compare Bethlehem tours departing from Jerusalem: private Jerusalem–Bethlehem guiding and shared Bethlehem, Jericho and Jordan River day trips, with duration and booking links.",
    origin: "jerusalem",
  }),
  component: CategoryRoute,
});

function CategoryRoute() {
  const filters = Route.useSearch();
  const navigate = Route.useNavigate();
  return <TourCategoryPage id="bethlehem-jericho" departurePage filters={filters} onChange={(search, replace) => { void navigate({ search: parseTourSearch(search), resetScroll: false, replace: Boolean(replace) }); }} />;
}
