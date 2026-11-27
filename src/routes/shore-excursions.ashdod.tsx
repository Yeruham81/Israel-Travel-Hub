import { createFileRoute } from "@tanstack/react-router";
import { PortPage } from "@/components/PortPage";
import { parseShoreServiceSearch } from "@/lib/shore-services";

export const Route = createFileRoute("/shore-excursions/ashdod")({
  validateSearch: parseShoreServiceSearch,
  head: async (ctx) => {
    const { routeHead } = await import("../route-heads/shore-excursions.ashdod.head");
    return Reflect.apply(routeHead, undefined, [ctx]);
  },
  component: AshdodShorePage,
});

function AshdodShorePage() {
  const filters = Route.useSearch();
  const navigate = Route.useNavigate();
  return (
    <PortPage
      id="ashdod"
      filters={filters}
      onFilterChange={(search) => {
        void navigate({ search, resetScroll: false });
      }}
    />
  );
}
