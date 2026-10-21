import { createFileRoute } from "@tanstack/react-router";
import { PortPage, shorePortMeta } from "@/components/PortPage";
import { parseShoreServiceSearch } from "@/lib/shore-services";

export const Route = createFileRoute("/haifa-shore-excursions")({
  validateSearch: parseShoreServiceSearch,
  head: () => shorePortMeta("haifa"),
  component: HaifaShorePage,
});

function HaifaShorePage() {
  const filters = Route.useSearch();
  const navigate = Route.useNavigate();
  return <PortPage id="haifa" filters={filters} onFilterChange={(search) => { void navigate({ search, resetScroll: false }); }} />;
}
