import { createHash } from "node:crypto";
import { buildTransferQuoteDraft, validateTransferQuote } from "@/lib/transfer-quote";
import { buildDriverQuoteDraft, validateDriverQuote } from "@/lib/private-driver-quote";
import { buildShoreQuoteDraft, validateShoreQuote } from "@/lib/shore-quote";
import { quoteRequestSchema } from "@/lib/quote-request-schema.server";
import { quoteRequestBody, type DeliveryErrorCode, type QuoteRequestPayload } from "@/lib/quote-request";
import type { QuoteEmail } from "@/lib/hostinger-smtp.server";
import { buildContactMessage, validateContactMessage } from "@/lib/contact-message";

type MailEnvironment = { SMTP_PASSWORD?: string; QUOTE_DELIVERY_ENABLED?: string };
type Result = { status: number; body: { accepted?: boolean; requestId?: string; error?: string; deliveryCode?: DeliveryErrorCode } };
export type DeliveryFailure = { event: "quote-delivery.failed"; requestId: string; deliveryCode: DeliveryErrorCode; smtpStatus?: number };
const hash = (value: string) => createHash("sha256").update(value).digest("hex");
const maxBodyBytes = 20_000;
const windowMs = 10 * 60_000;

/** Only fixed labels and numeric SMTP statuses escape this classifier, never raw errors. */
export function deliveryFailure(error: unknown, requestId: string): DeliveryFailure {
  const value = (error && typeof error === "object" ? error : {}) as { code?: unknown; message?: unknown; responseCode?: unknown };
  const code = typeof value.code === "string" ? value.code : "";
  const message = typeof value.message === "string" ? value.message : "";
  let deliveryCode: DeliveryErrorCode = "SMTP_UNKNOWN";
  if (code === "EAUTH") deliveryCode = "SMTP_AUTH";
  else if (code === "EDNS" || code === "ENOTFOUND" || code === "EAI_AGAIN") deliveryCode = "SMTP_DNS";
  else if (code === "ETLS" || /^ERR_TLS_|^CERT_|^DEPTH_ZERO_|^UNABLE_TO_/.test(code)) deliveryCode = "SMTP_TLS";
  else if (code === "ETIMEDOUT" || code === "ESOCKETTIMEDOUT") deliveryCode = "SMTP_TIMEOUT";
  else if (["ECONNECTION", "ESOCKET", "ECONNREFUSED", "ECONNRESET", "EHOSTUNREACH", "ENETUNREACH"].includes(code)) deliveryCode = "SMTP_CONNECT";
  else if (["EENVELOPE", "EMESSAGE", "SMTP_NOT_ACCEPTED"].includes(code)) deliveryCode = "SMTP_REJECTED";
  if (/not implemented|unsupported.*(?:node:|socket|module)|cannot find module/i.test(message) || ["ERR_MODULE_NOT_FOUND", "ERR_UNKNOWN_BUILTIN_MODULE", "ERR_UNSUPPORTED_ESM_URL_SCHEME"].includes(code)) deliveryCode = "SMTP_RUNTIME";
  const smtpStatus = typeof value.responseCode === "number" && Number.isInteger(value.responseCode) && value.responseCode >= 400 && value.responseCode <= 599 ? value.responseCode : undefined;
  return { event: "quote-delivery.failed", requestId, deliveryCode, ...(smtpStatus === undefined ? {} : { smtpStatus }) };
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
    requestId: payload.requestId, replyTo: fields.email.trim(), subject: draft.subject,
    text: `${quoteRequestBody(draft.body, payload)}\n\n---\nWebsite: Israel Travel Hub\nForm: ${request.kind}\nSubmitted: ${now.toISOString()}\nRequest reference: ${payload.requestId}`,
  };
}

/** No message bodies or raw contact/IP data are kept in these short-lived guards. */
export function createQuoteDeliveryService({
  environment = (): MailEnvironment => process.env,
  send = async (message: QuoteEmail, password: string) => (await import("@/lib/hostinger-smtp.server")).sendHostingerQuote(message, password),
  now = () => Date.now(),
  reportFailure = (failure: DeliveryFailure) => { console.warn(JSON.stringify(failure)); },
} = {}) {
  const recent = new Map<string, { expires: number; fingerprint: string; result: Promise<Result> }>();
  const limits = new Map<string, { expires: number; count: number }>();
  let inFlight = 0;
  const configured = () => {
    const env = environment();
    return env.QUOTE_DELIVERY_ENABLED === "true" && Boolean(env.SMTP_PASSWORD?.trim());
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
    const password = environment().SMTP_PASSWORD!;
    // Register the promise before starting SMTP, so concurrent retries share one attempt.
    inFlight++;
    const result: Promise<Result> = Promise.resolve().then(async () => {
      try {
        await send(email, password);
        return { status: 200, body: { accepted: true, requestId: payload.requestId } };
      } catch (error) {
        const failure = deliveryFailure(error, payload.requestId);
        try { reportFailure(failure); } catch { /* Logging must not change the delivery result. */ }
        // A timeout after SMTP DATA can be ambiguous. Do not retry it automatically.
        return { status: 502, body: { error: "We could not confirm email delivery. Please check with Moshe before sending the same message again.", requestId: payload.requestId, deliveryCode: failure.deliveryCode } };
      } finally { inFlight--; }
    });
    recent.set(payload.requestId, { fingerprint, expires: timestamp + windowMs, result });
    const completed = await result;
    return response(completed.body, completed.status);
  };
}

export const quoteDeliveryResponse = createQuoteDeliveryService();
