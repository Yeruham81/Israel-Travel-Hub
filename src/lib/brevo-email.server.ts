import { airportTransferContact } from "@/data/registry";

export type QuoteEmail = { requestId: string; replyTo: string; subject: string; text: string };
export const brevoFailureCodes = ["BREVO_UNAUTHORIZED", "BREVO_FORBIDDEN", "BREVO_SENDER", "BREVO_RATE_LIMIT", "BREVO_REJECTED", "BREVO_PROVIDER", "BREVO_RESPONSE", "BREVO_TIMEOUT", "BREVO_NETWORK"] as const;
export type BrevoFailureCode = typeof brevoFailureCodes[number];

/** Contains fixed diagnostics only; never retain provider bodies, credentials or visitor data. */
export class BrevoDeliveryError extends Error {
  constructor(public readonly deliveryCode: BrevoFailureCode, public readonly providerStatus?: number) {
    super(deliveryCode);
    this.name = "BrevoDeliveryError";
  }
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
      } else { await response.body?.cancel(); }
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
    throw new BrevoDeliveryError("BREVO_NETWORK");
  } finally { clearTimeout(timer); }
}