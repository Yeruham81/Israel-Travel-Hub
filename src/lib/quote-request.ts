import type { TransferQuoteFields } from "@/lib/transfer-quote";
import type { DriverQuoteFields } from "@/lib/private-driver-quote";
import type { ShoreQuoteFields } from "@/lib/shore-quote";
import type { ShorePortId } from "@/data/registry";

export const quoteRequestEndpoint = "/api/quote-request/";
export type QuoteRequest =
  | { kind: "transfer"; fields: TransferQuoteFields }
  | { kind: "driver"; fields: DriverQuoteFields }
  | { kind: "shore"; portId: ShorePortId; fields: ShoreQuoteFields };

export type QuoteRequestPayload = { requestId: string; sourcePath: string; website: string; request: QuoteRequest };
