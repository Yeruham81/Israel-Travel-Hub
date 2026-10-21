import { createFileRoute } from "@tanstack/react-router";
import { quoteDeliveryResponse } from "@/lib/quote-delivery.server";

export const Route = createFileRoute("/api/quote-request")({
  server: { handlers: {
    GET: ({ request }) => quoteDeliveryResponse(request),
    POST: ({ request }) => quoteDeliveryResponse(request),
  } },
});
