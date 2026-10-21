import type { TransferQuoteFields } from "@/lib/transfer-quote";
import type { DriverQuoteFields } from "@/lib/private-driver-quote";
import type { ShoreQuoteFields } from "@/lib/shore-quote";
import type { ShorePortId } from "@/data/registry";

export const quoteRequestEndpoint = "/api/quote-request/";
export type QuoteRequest =
  | { kind: "transfer"; fields: TransferQuoteFields }
  | { kind: "driver"; fields: DriverQuoteFields }
  | { kind: "shore"; portId: ShorePortId; fields: ShoreQuoteFields };

export type QuoteSourcePage = { sourcePath: string; sourceTitle?: string | undefined };
export type QuoteRequestPayload = QuoteSourcePage & { requestId: string; website: string; request: QuoteRequest };

/** Keep the source above the enquiry in direct email, email-app drafts and copied text. */
export function quoteRequestBody(body: string, source: QuoteSourcePage) {
  return `Source page: ${source.sourceTitle || source.sourcePath}\nPage path: ${source.sourcePath}\n\n${body}`;
}
