import type { TransferQuoteFields } from "@/lib/transfer-quote";
import type { DriverQuoteFields } from "@/lib/private-driver-quote";
import type { ShoreQuoteFields } from "@/lib/shore-quote";
import type { ShorePortId } from "@/data/registry";
import type { ContactMessageFields } from "@/lib/contact-message";

export const quoteRequestEndpoint = "/api/quote-request/";
export const deliveryErrorCodes = [
  "SMTP_AUTH", "SMTP_CONNECT", "SMTP_DNS", "SMTP_TLS", "SMTP_TIMEOUT", "SMTP_REJECTED", "SMTP_RUNTIME", "SMTP_UNKNOWN",
  "HTTP_403", "HTTP_404", "HTTP_ERROR", "BAD_RESPONSE", "REQUEST_TIMEOUT", "REQUEST_NETWORK",
] as const;
export type DeliveryErrorCode = typeof deliveryErrorCodes[number];
export function knownDeliveryErrorCode(value: unknown): DeliveryErrorCode | undefined {
  return typeof value === "string" && deliveryErrorCodes.some((code) => code === value) ? value as DeliveryErrorCode : undefined;
}
export type QuoteRequest =
  | { kind: "transfer"; fields: TransferQuoteFields }
  | { kind: "driver"; fields: DriverQuoteFields }
  | { kind: "contact"; fields: ContactMessageFields }
  | { kind: "shore"; portId: ShorePortId; fields: ShoreQuoteFields };

export type QuoteSourcePage = { sourcePath: string; sourceTitle?: string | undefined };
export type QuoteRequestPayload = QuoteSourcePage & { requestId: string; website: string; request: QuoteRequest };

/** Keep the source above the enquiry in every directly submitted email. */
export function quoteRequestBody(body: string, source: QuoteSourcePage) {
  return `Source page: ${source.sourceTitle || source.sourcePath}\nPage path: ${source.sourcePath}\n\n${body}`;
}
