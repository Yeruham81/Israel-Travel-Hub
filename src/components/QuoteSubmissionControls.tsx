import { airportTransferContact } from "@/data/registry";
import type { QuoteSubmission } from "@/hooks/useQuoteSubmission";

export function QuoteSubmissionControls({ submission, label, message = false }: {
  submission: QuoteSubmission; label: string; message?: boolean;
}) {
  const noun = message ? "message" : "request";
  const { result } = submission;
  return <>
    <div className="sr-only" aria-hidden="true"><label>Leave this field empty<input name="website" tabIndex={-1} autoComplete="off" value={submission.website} onChange={(event) => submission.setWebsite(event.target.value)} /></label></div>
    <button type="submit" disabled={submission.isSending || submission.isSent} className="btn btn-primary mt-6 w-full sm:w-auto">{submission.isSending ? "Sending…" : submission.isSent ? "Sent" : label}</button>
    {result.state === "sending" && <p role="status" className="mt-4 text-sm">Sending your {noun} to Moshe. Please wait.</p>}
    {result.state === "sent" && <div role="status" className="mt-5 rounded-xl border border-primary/30 bg-secondary/60 p-5">
      <h3 className="text-xl">Your {noun} has been sent to Moshe</h3>
      <p className="mt-2 text-sm">Your {noun} was accepted for email delivery to <strong>{airportTransferContact.email}</strong>. {message ? "Moshe will reply to the email address you provided." : "Availability, the price and your booking still require Moshe's confirmation."}</p>
      <p className="mt-3 text-xs text-muted-foreground">Request reference: {result.requestId}</p>
    </div>}
    {(result.state === "failed" || result.state === "unavailable") && <div role="alert" className="mt-5 rounded-xl border border-destructive p-4 text-sm">
      <p>{result.error}</p><p className="mt-2">Your details are still in the form. You can contact Moshe at <strong>{airportTransferContact.email}</strong>.</p>
      {result.requestId && <p className="mt-2 text-xs">Request reference: {result.requestId}</p>}
      {result.deliveryCode && <p className="mt-1 text-xs">Error code: {result.deliveryCode}{result.httpStatus ? ` (HTTP ${result.httpStatus})` : ""}</p>}
    </div>}
  </>;
}
