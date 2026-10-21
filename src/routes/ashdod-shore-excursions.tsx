import { createFileRoute } from "@tanstack/react-router";
import { PortPage, shorePortMeta } from "@/components/PortPage";
import { parseShoreServiceSearch } from "@/lib/shore-services";

export const Route = createFileRoute("/ashdod-shore-excursions")({
  validateSearch: parseShoreServiceSearch,
  head: () => shorePortMeta("ashdod"),
  component: AshdodShorePage,
});

function AshdodShorePage() {
  const filters = Route.useSearch();
  const navigate = Route.useNavigate();
  return <PortPage id="ashdod" filters={filters} onFilterChange={(search) => { void navigate({ search, resetScroll: false }); }} />;
}
