import { airportTransferContact } from "@/data/registry";

export type QuoteEmail = { requestId: string; replyTo: string; subject: string; text: string };
export const brevoFailureCodes = ["BREVO_UNAUTHORIZED", "BREVO_FORBIDDEN", "BREVO_SENDER", "BREVO_RATE_LIMIT", "BREVO_REJECTED", "BREVO_PROVIDER", "BREVO_RESPONSE", "BREVO_TIMEOUT", "BREVO_DNS", "BREVO_TLS", "BREVO_CONNECT", "BREVO_REDIRECT", "BREVO_RUNTIME", "BREVO_NETWORK"] as const;
export type BrevoFailureCode = typeof brevoFailureCodes[number];

/** Contains fixed diagnostics only; never retain provider bodies, credentials or visitor data. */
export class BrevoDeliveryError extends Error {
  constructor(public readonly deliveryCode: BrevoFailureCode, public readonly providerStatus?: number) {
    super(deliveryCode);
    this.name = "BrevoDeliveryError";
  }
}

/**
 * Classify only known, non-sensitive transport failure patterns. Do not return
 * provider error messages or network exception text: those may contain secrets.
 * Workers and Node runtimes wrap fetch errors differently, often in cause.
 */
export function classifyBrevoNetworkError(error: unknown): BrevoFailureCode {
  let current = error;
  for (let depth = 0; depth < 3 && current && typeof current === "object"; depth++) {
    const value = current as { code?: unknown; name?: unknown; message?: unknown; cause?: unknown };
    const code = typeof value.code === "string" ? value.code.toUpperCase() : "";
    const name = typeof value.name === "string" ? value.name : "";
    const detail = typeof value.message === "string" ? value.message : "";
    if (/^(?:ENOTFOUND|EAI_AGAIN|EDNS|DNS_ERROR)$/.test(code) || /getaddrinfo|dns resolution|failed to resolve|dns lookup/i.test(detail)) return "BREVO_DNS";
    if (/^(?:ERR_TLS_|CERT_|DEPTH_ZERO_|UNABLE_TO_VERIFY_)/.test(code) || /(?:tls|ssl) handshake|certificate verify/i.test(detail)) return "BREVO_TLS";
    if (/^(?:ECONNREFUSED|ECONNRESET|EHOSTUNREACH|ENETUNREACH|EPIPE|UND_ERR_CONNECT_TIMEOUT|UND_ERR_SOCKET)$/.test(code) || /connection (?:refused|reset)|connect(?:ion)? timed out/i.test(detail)) return "BREVO_CONNECT";
    if (/redirect/i.test(detail) && /redirect|fetch|network/i.test(detail)) return "BREVO_REDIRECT";
    if ((name === "ReferenceError" && /fetch/i.test(detail)) || /fetch is not (?:defined|a function)|not implemented.*fetch/i.test(detail)) return "BREVO_RUNTIME";
    current = value.cause;
  }
  return "BREVO_NETWORK";
}

export async function sendBrevoQuote(message: QuoteEmail, apiKey: string): Promise<void> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 20_000);
  try {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST", signal: controller.signal, redirect: "error",
      headers: { "api-key": apiKey, accept: "application/json", "content-type": "application/json" },
      body: JSON.stringify({
        sender: { email: airportTransferContact.email, name: "Israel Travel Hub" },
        to: [{ email: airportTransferContact.email }],
        replyTo: { email: message.replyTo }, subject: message.subject, textContent: message.text,
      }),
    });
    if (response.status !== 201) {
      let code: BrevoFailureCode = response.status === 401 ? "BREVO_UNAUTHORIZED"
        : response.status === 403 ? "BREVO_FORBIDDEN"
        : response.status === 429 ? "BREVO_RATE_LIMIT"
        : response.status >= 500 ? "BREVO_PROVIDER" : "BREVO_REJECTED";
      if (response.status === 400) {
        // Examine sender-specific validation privately, without retaining or exposing the body.
        const body: unknown = await response.json().catch(() => null);
        if (body && typeof body === "object") {
          const error = body as { code?: unknown; message?: unknown };
          if (error.code === "invalid_sender" || (error.code === "invalid_parameter" && typeof error.message === "string" && /\bsender\b/i.test(error.message))) code = "BREVO_SENDER";
        }
      } else {
        // Once HTTP status is known, stream cleanup must never mask a 401/403/etc.
        try { await response.body?.cancel(); } catch { /* Keep the real provider HTTP error. */ }
      }
      throw new BrevoDeliveryError(code, response.status);
    }
    const body: unknown = await response.json().catch(() => null);
    if (!body || typeof body !== "object" || !("messageId" in body) || typeof body.messageId !== "string" || !body.messageId.trim()) {
      throw new BrevoDeliveryError("BREVO_RESPONSE", 201);
    }
    // API acceptance is not inbox delivery; messageId is deliberately not returned or logged.
  } catch (error) {
    if (controller.signal.aborted) throw new BrevoDeliveryError("BREVO_TIMEOUT");
    if (error instanceof BrevoDeliveryError) throw error;
    throw new BrevoDeliveryError(classifyBrevoNetworkError(error));
  } finally { clearTimeout(timer); }
}