import { createFileRoute, redirect } from "@tanstack/react-router";
import { parseAirportTransferSearch } from "@/lib/transfer-quote";

/** The former airport sub-hub now has one permanent destination. */
export const Route = createFileRoute("/transfers/ben-gurion-airport")({
  validateSearch: parseAirportTransferSearch,
  beforeLoad: ({ search, location }) => {
    throw redirect({ to: "/transfers/", search: parseAirportTransferSearch(search), hash: location.hash, replace: true, statusCode: 301 });
  },
});
