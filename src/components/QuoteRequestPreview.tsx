import { useEffect, useRef, useState } from "react";
import { airportTransferContact } from "@/data/registry";
import { quoteRequestEndpoint, type QuoteRequest } from "@/lib/quote-request";

type Draft = { subject: string; body: string; url: string };

/** Preparing/reviewing a draft never transmits its fields. Sending is a separate action. */
export function QuoteRequestPreview({ draft, request, previewLabel, onBusy }: {
  draft: Draft; request: QuoteRequest; previewLabel: string; onBusy: (busy: boolean) => void;
}) {
  const [available, setAvailable] = useState(false);
  const [state, setState] = useState<"draft" | "sending" | "sent" | "failed">("draft");
  const [copyMessage, setCopyMessage] = useState("");
  const [website, setWebsite] = useState("");
  const requestId = useRef<string | null>(null);
  const sending = useRef(false);

  useEffect(() => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 5000);
    // Readiness contains no enquiry data, and failures retain the existing email route.
    void fetch(quoteRequestEndpoint, { method: "GET", credentials: "same-origin", cache: "no-store", signal: controller.signal })
      .then(async (response) => response.ok ? response.json() as Promise<{ available?: boolean }> : null)
      .then((result) => { if (!controller.signal.aborted) setAvailable(result?.available === true); })
      .catch(() => {})
      .finally(() => clearTimeout(timer));
    return () => { controller.abort(); clearTimeout(timer); };
  }, []);

  async function send() {
    if (sending.current || state !== "draft") return;
    sending.current = true;
    setState("sending"); onBusy(true);
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 45_000);
    try {
      requestId.current ??= crypto.randomUUID();
      const response = await fetch(quoteRequestEndpoint, {
        method: "POST", credentials: "same-origin", cache: "no-store",
        signal: controller.signal,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requestId: requestId.current, sourcePath: window.location.pathname, website, request }),
      });
      const result = await response.json() as { accepted?: boolean; requestId?: string };
      if (!response.ok || result.accepted !== true || result.requestId !== requestId.current) throw new Error("Delivery not confirmed");
      setState("sent");
    } catch { setState("failed"); }
    finally { clearTimeout(timer); onBusy(false); }
  }

  async function copyRequest() {
    try { await navigator.clipboard.writeText(`${draft.subject}\n\n${draft.body}`); setCopyMessage("Request copied. Paste it into an email to Moshe."); }
    catch { setCopyMessage("Select and copy the request text below, then paste it into your email."); }
  }

  if (state === "sent") return <div role="status" className="mt-6 rounded-xl border border-primary/30 bg-secondary/60 p-5">
    <h3 className="text-xl">Your request has been sent to Moshe</h3>
    <p className="mt-2 text-sm leading-relaxed">Your request was accepted for email delivery to <strong>{airportTransferContact.email}</strong>. Availability, the price and your booking still require Moshe's confirmation.</p>
    <p className="mt-3 text-xs text-muted-foreground">Request reference: {requestId.current}</p>
  </div>;

  return <div role="status" aria-busy={state === "sending"} className="mt-6 rounded-xl border border-primary/30 bg-secondary/60 p-5">
    <h3 className="text-xl">Your request is ready to send</h3>
    {state === "draft" && <p className="mt-2 text-sm leading-relaxed">{available ? "Review the details, then send your request to Moshe here or through your email app." : <>Open your email app, review the details and send to <strong>{airportTransferContact.email}</strong>.</>} Your request has not been sent yet.</p>}
    {state === "sending" && <p className="mt-2 text-sm">Sending your request. Please wait before submitting it again.</p>}
    {state === "failed" && <p role="alert" className="mt-3 text-sm">We could not confirm email delivery. Your details are still below. You can contact Moshe using the email option if needed.</p>}
    <div className="sr-only" aria-hidden="true"><label>Leave this field empty<input name="website" tabIndex={-1} autoComplete="off" value={website} onChange={(event) => setWebsite(event.target.value)} /></label></div>
    <div className="mt-4 flex flex-wrap gap-3">
      {available && (state === "draft" || state === "sending") && <button type="button" onClick={() => void send()} disabled={state === "sending"} className="btn btn-primary">{state === "sending" ? "Sending request…" : "Send request to Moshe"}</button>}
      {state !== "sending" && <><a href={draft.url} className={available ? "btn btn-outline" : "btn btn-primary"}>Open email to Moshe</a><button type="button" onClick={() => void copyRequest()} className="btn btn-outline">Copy request</button></>}
    </div>
    {copyMessage && <p className="mt-3 text-sm">{copyMessage}</p>}
    <details className="mt-4 text-sm"><summary className="cursor-pointer font-medium">Review request text</summary><textarea aria-label={previewLabel} readOnly rows={12} value={`${draft.subject}\n\n${draft.body}`} className="mt-3 w-full rounded border bg-background p-3 text-sm" /></details>
  </div>;
}
