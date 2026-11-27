import { createFileRoute } from "@tanstack/react-router";
import { PortPage } from "@/components/PortPage";
import { parseShoreServiceSearch } from "@/lib/shore-services";

export const Route = createFileRoute("/shore-excursions/haifa")({
  validateSearch: parseShoreServiceSearch,
  head: async (ctx) => { const { routeHead } = await import("../route-heads/shore-excursions.haifa.head"); return Reflect.apply(routeHead, undefined, [ctx]); },
  component: HaifaShorePage,
});

function HaifaShorePage() {
  const filters = Route.useSearch();
  const navigate = Route.useNavigate();
  return <PortPage id="haifa" filters={filters} onFilterChange={(search) => { void navigate({ search, resetScroll: false }); }} />;
}
