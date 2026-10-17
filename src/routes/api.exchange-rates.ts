import { createFileRoute } from "@tanstack/react-router";
import { exchangeRatesResponse } from "@/lib/exchange-rates.server";

export const Route = createFileRoute("/api/exchange-rates")({
  server: { handlers: { GET: () => exchangeRatesResponse() } },
});
