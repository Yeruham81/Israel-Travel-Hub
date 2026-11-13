import { createFileRoute, redirect } from "@tanstack/react-router";
import { parseAirportTransferSearch } from "@/lib/transfer-quote";

/** Permanent redirect to the canonical airport-transfer hub. */
export const Route = createFileRoute("/transfers/")({
  validateSearch: parseAirportTransferSearch,
  beforeLoad: ({ search, location }) => {
    throw redirect({ to: "/airport-transfers/", search: parseAirportTransferSearch(search), hash: location.hash, replace: true, statusCode: 301 });
  },
});
