import { createHash } from "node:crypto";
import { buildTransferQuoteDraft, validateTransferQuote } from "@/lib/transfer-quote";
import { buildDriverQuoteDraft, validateDriverQuote } from "@/lib/private-driver-quote";
import { buildShoreQuoteDraft, validateShoreQuote } from "@/lib/shore-quote";
import { quoteRequestSchema } from "@/lib/quote-request-schema.server";
import { quoteRequestBody, type DeliveryErrorCode, type QuoteRequestPayload } from "@/lib/quote-request";
import { BrevoDeliveryError, type QuoteEmail } from "@/lib/brevo-email.server";
import { buildContactMessage, validateContactMessage } from "@/lib/contact-message";
import { israelSubmissionTime, quoteEmailHtml, safeEmailSenderName } from "@/lib/quote-email-format.server";

type MailEnvironment = { BREVO_API_KEY?: string; QUOTE_DELIVERY_ENABLED?: string };
type Result = { status: number; body: { accepted?: boolean; requestId?: string; error?: string; deliveryCode?: DeliveryErrorCode } };
export type DeliveryFailure = { event: "quote-delivery.failed"; requestId: string; deliveryCode: DeliveryErrorCode; providerStatus?: number };
const hash = (value: string) => createHash("sha256").update(value).digest("hex");
const maxBodyBytes = 20_000;
const windowMs = 10 * 60_000;

/** Only trusted fixed labels and numeric HTTP statuses escape, never raw errors. */
export function deliveryFailure(error: unknown, requestId: string): DeliveryFailure {
  const deliveryCode = error instanceof BrevoDeliveryError ? error.deliveryCode : "BREVO_PROVIDER";
  const status = error instanceof BrevoDeliveryError ? error.providerStatus : undefined;
  const providerStatus = typeof status === "number" && Number.isInteger(status) && status >= 100 && status <= 599 ? status : undefined;
  return { event: "quote-delivery.failed", requestId, deliveryCode, ...(providerStatus === undefined ? {} : { providerStatus }) };
}

function response(body: unknown, status = 200, extraHeaders: Record<string, string> = {}) {
  return Response.json(body, { status, headers: {
    "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff", "X-Robots-Tag": "noindex, nofollow", ...extraHeaders,
  } });
}

async function boundedJson(request: Request) {
  const reader = request.body?.getReader();
  if (!reader) throw new Error("Missing body");
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > maxBodyBytes) { await reader.cancel(); throw new Error("Oversized body"); }
      chunks.push(value);
    }
  } finally { reader.releaseLock(); }
  const joined = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) { joined.set(chunk, offset); offset += chunk.length; }
  return JSON.parse(new TextDecoder().decode(joined)) as unknown;
}

export function quoteEmail(payload: QuoteRequestPayload, now: Date): QuoteEmail | null {
  const { request } = payload;
  const fields = request.fields;
  // Reply-To is one address, with no header-control characters or recipient lists.
  if (!/^[^\s@<>,;\r\n]+@[^\s@<>,;\r\n]+\.[^\s@<>,;\r\n]+$/.test(fields.email.trim())) return null;
  let draft: { subject: string; body: string };
  switch (request.kind) {
    case "transfer":
      if (validateTransferQuote(request.fields, now).length) return null;
      draft = buildTransferQuoteDraft(request.fields); break;
    case "driver":
      if (validateDriverQuote(request.fields, now).length) return null;
      draft = buildDriverQuoteDraft(request.fields); break;
    case "contact":
      if (validateContactMessage(request.fields).length) return null;
      draft = buildContactMessage(request.fields); break;
    case "shore":
      if (validateShoreQuote(request.fields, request.portId, now).length) return null;
      draft = buildShoreQuoteDraft(request.fields, request.portId); break;
  }
  return {
    requestId: payload.requestId, replyTo: fields.email.trim(), senderName: safeEmailSenderName(fields.name), subject: draft.subject,
    ...(() => { const text = `${quoteRequestBody(draft.body, payload)}\n\n---\nWebsite: Israel Taxi & Travel\nForm: ${request.kind}\nSubmitted: ${israelSubmissionTime(now)}\nRequest reference: ${payload.requestId}`; return { text, html: quoteEmailHtml(text) }; })(),
  };
}

/** No message bodies or raw contact/IP data are kept in these short-lived guards. */
export function createQuoteDeliveryService({
  environment = (): MailEnvironment => process.env,
  send = async (message: QuoteEmail, apiKey: string) => (await import("@/lib/brevo-email.server")).sendBrevoQuote(message, apiKey),
  now = () => Date.now(),
  reportFailure = (failure: DeliveryFailure) => { console.warn(JSON.stringify(failure)); },
} = {}) {
  const recent = new Map<string, { expires: number; fingerprint: string; result: Promise<Result> }>();
  const limits = new Map<string, { expires: number; count: number }>();
  let inFlight = 0;
  const configured = () => {
    const env = environment();
    return env.QUOTE_DELIVERY_ENABLED === "true" && Boolean(env.BREVO_API_KEY?.trim());
  };

  return async function handle(request: Request): Promise<Response> {
    if (request.method === "GET") return response({ available: configured() });
    if (request.method !== "POST") return response({ error: "Method not allowed" }, 405, { Allow: "GET, POST" });
    const origin = request.headers.get("origin");
    if (!origin || origin !== new URL(request.url).origin || request.headers.get("sec-fetch-site") === "cross-site") return response({ error: "Invalid request origin" }, 403);
    if (request.headers.get("content-type")?.split(";")[0]?.trim() !== "application/json") return response({ error: "Expected JSON" }, 415);
    if (!configured()) return response({ error: "Message sending is temporarily unavailable. Please try again later." }, 503);
    const timestamp = now();
    for (const [key, value] of recent) if (value.expires <= timestamp) recent.delete(key);
    for (const [key, value] of limits) if (value.expires <= timestamp) limits.delete(key);

    let payload: QuoteRequestPayload;
    try {
      const parsed = quoteRequestSchema.safeParse(await boundedJson(request));
      if (!parsed.success || parsed.data.website) return response({ error: "Please check your request details." }, 400);
      payload = parsed.data;
    } catch { return response({ error: "Please check your request details." }, 400); }
    const email = quoteEmail(payload, new Date(timestamp));
    if (!email) return response({ error: "Please check your contact and journey details." }, 400);
    const fingerprint = hash(JSON.stringify({ request: payload.request, sourcePath: payload.sourcePath, sourceTitle: payload.sourceTitle }));
    const previous = recent.get(payload.requestId);
    if (previous) {
      if (previous.fingerprint !== fingerprint) return response({ error: "Edited details need a new request reference." }, 409);
      const result = await previous.result;
      return response(result.body, result.status);
    }
    // These guards are per running instance; hosting-level abuse controls still apply.
    const keys = [`email:${hash(email.replyTo.toLowerCase())}`];
    const clientIp = request.headers.get("cf-connecting-ip");
    if (clientIp) keys.push(`ip:${hash(clientIp)}`);
    if (inFlight >= 2 || recent.size >= 200 || limits.size >= 500 || keys.some((key) => (limits.get(key)?.count ?? 0) >= 5)) return response({ error: "Too many requests. Please try later or use email." }, 429, { "Retry-After": "600" });
    for (const key of keys) {
      const limit = limits.get(key);
      limits.set(key, { count: (limit?.count ?? 0) + 1, expires: limit?.expires ?? timestamp + windowMs });
    }
    const apiKey = environment().BREVO_API_KEY;
    if (!apiKey?.trim()) return response({ error: "Message sending is temporarily unavailable. Please try again later." }, 503);
    // Register the promise before contacting Brevo, so concurrent retries share one attempt.
    inFlight++;
    const result: Promise<Result> = Promise.resolve().then(async () => {
      try {
        await send(email, apiKey);
        return { status: 200, body: { accepted: true, requestId: payload.requestId } };
      } catch (error) {
        const failure = deliveryFailure(error, payload.requestId);
        try { reportFailure(failure); } catch { /* Logging must not change the delivery result. */ }
        // A timeout after sending the API request can be ambiguous. Never retry automatically.
        return { status: 502, body: { error: "We could not confirm email delivery. Please check with Moshe before sending the same message again.", requestId: payload.requestId, deliveryCode: failure.deliveryCode } };
      } finally { inFlight--; }
    });
    recent.set(payload.requestId, { fingerprint, expires: timestamp + windowMs, result });
    const completed = await result;
    return response(completed.body, completed.status);
  };
}

export const quoteDeliveryResponse = createQuoteDeliveryService();
