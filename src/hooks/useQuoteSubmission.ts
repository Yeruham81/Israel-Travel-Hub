import { useCallback, useRef, useState } from "react";
import { quoteRequestEndpoint, type QuoteRequest, type QuoteRequestPayload } from "@/lib/quote-request";

type SubmissionResult = { state: "idle" | "sending" | "sent" | "unavailable" | "failed"; requestId?: string; error?: string };

/** Only an explicit, valid form submit transmits enquiry fields. Never retry automatically. */
export function useQuoteSubmission() {
  const [result, setResult] = useState<SubmissionResult>({ state: "idle" });
  const [website, setWebsite] = useState("");
  const sending = useRef(false);
  const attempt = useRef<{ fingerprint: string; requestId: string; accepted: boolean } | null>(null);

  const reset = useCallback(() => { if (!sending.current) setResult({ state: "idle" }); }, []);

  async function submit(request: QuoteRequest) {
    if (sending.current) return;
    const sourceTitle = (document.querySelector("main h1")?.textContent || document.title).replace(/\s+/g, " ").trim().slice(0, 300) || undefined;
    const snapshot = { sourcePath: window.location.pathname, sourceTitle, website, request };
    const fingerprint = JSON.stringify(snapshot);
    if (attempt.current?.fingerprint === fingerprint && attempt.current.accepted) {
      setResult({ state: "sent", requestId: attempt.current.requestId });
      return;
    }
    sending.current = true;
    setResult({ state: "sending" });
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 45_000);
    try {
      // Retrying unchanged details reuses the same reference, including after an ambiguous timeout.
      if (attempt.current?.fingerprint !== fingerprint) attempt.current = { fingerprint, requestId: crypto.randomUUID(), accepted: false };
      const requestId = attempt.current!.requestId;
      const payload: QuoteRequestPayload = { requestId, ...snapshot };
      const response = await fetch(quoteRequestEndpoint, {
        method: "POST", credentials: "same-origin", cache: "no-store", signal: controller.signal,
        headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload),
      });
      if (response.status === 503 || response.status === 429) {
        setResult({ state: "unavailable", requestId, error: response.status === 429 ? "Too many messages have been submitted. Please try again later." : "Message sending is temporarily unavailable. Please try again later." });
        return;
      }
      if (response.status === 400) {
        setResult({ state: "failed", requestId, error: "Please check your contact and request details, then send again." });
        return;
      }
      const body = await response.json() as { accepted?: boolean; requestId?: string };
      if (!response.ok || body.accepted !== true || body.requestId !== requestId) throw new Error("Delivery not confirmed");
      attempt.current!.accepted = true;
      setResult({ state: "sent", requestId });
    } catch {
      setResult({ state: "failed", ...(attempt.current ? { requestId: attempt.current.requestId } : {}), error: "We could not confirm email delivery. Please check with Moshe before sending the same message again." });
    } finally { clearTimeout(timer); sending.current = false; }
  }

  return { result, website, setWebsite, submit, reset, isSending: result.state === "sending", isSent: result.state === "sent" };
}

export type QuoteSubmission = ReturnType<typeof useQuoteSubmission>;
