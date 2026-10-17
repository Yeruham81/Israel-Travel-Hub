import { useRef, useState, type FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { airportTransferContact, airportTransferRates } from "@/data/registry";
import { airportTransferPhotos } from "@/data/airportTransfers";
import { buildTransferQuoteDraft, emptyTransferQuote, validateTransferQuote, type TransferQuoteFields } from "@/lib/transfer-quote";

export function TransferQuoteForm({ destinationId, onDestinationChange, fixedDestination = false }: { destinationId: string; onDestinationChange?: (id: string) => void; fixedDestination?: boolean }) {
  const selectedDestination = airportTransferRates.find((rate) => rate.id === destinationId);
  const [fields, setFields] = useState(emptyTransferQuote);
  const [errors, setErrors] = useState<string[]>([]);
  const [prepared, setPrepared] = useState<{ destinationId: string; draft: ReturnType<typeof buildTransferQuoteDraft> } | null>(null);
  const [copyMessage, setCopyMessage] = useState("");
  const errorRef = useRef<HTMLDivElement>(null);
  const draft = prepared?.destinationId === destinationId ? prepared.draft : null;
  function update<K extends keyof TransferQuoteFields>(key: K, value: TransferQuoteFields[K]) {
    setFields((previous) => ({ ...previous, [key]: value })); setPrepared(null); setCopyMessage("");
  }
  function prepare(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = { ...fields, destinationId };
    const nextErrors = validateTransferQuote(values);
    setErrors(nextErrors);
    if (nextErrors.length) { setPrepared(null); requestAnimationFrame(() => errorRef.current?.focus()); return; }
    setPrepared({ destinationId, draft: buildTransferQuoteDraft(values) });
  }
  async function copyRequest() {
    if (!draft) return;
    try { await navigator.clipboard.writeText(`${draft.subject}\n\n${draft.body}`); setCopyMessage("Request copied. Paste it into an email to Moshe."); }
    catch { setCopyMessage("Select and copy the request text below, then paste it into your email."); }
  }
  const photo = airportTransferPhotos["moshe"]!;
  const fieldClass = "mt-2 h-11 bg-background text-base";
  return (
    <section id="request-quote" tabIndex={-1} aria-labelledby="quote-h" className="mt-14 scroll-mt-24 overflow-hidden rounded-2xl border bg-card shadow-sm focus-visible:outline-2 focus-visible:outline-primary">
      <div className="grid md:grid-cols-[0.8fr_1.6fr]">
        <div className="bg-navy p-6 text-navy-foreground sm:p-8">
          <img src={photo.src} alt={photo.alt} width={150} height={200} loading="lazy" className="h-24 w-20 rounded-xl object-cover" />
          <p className="mt-5 text-xs font-semibold uppercase tracking-widest opacity-75">A local, personal service</p>
          <h2 id="quote-h" className="mt-3 text-3xl">{fixedDestination && selectedDestination ? `Request your transfer to ${selectedDestination.destination}` : "Request a quote from Moshe Barak"}</h2>
          <p className="mt-4 leading-relaxed opacity-90">Share your arrival and destination. Moshe can help arrange the right private vehicle for your party and confirm the full price before you book.</p>
          <ul className="mt-6 space-y-3 text-sm opacity-90"><li>One-way pickup from Ben Gurion Airport</li><li>Cars, vans and larger group requests</li><li>Request at least 24 hours ahead</li><li>A quote request carries no booking commitment</li></ul>
          <p className="mt-6 border-t border-white/20 pt-5 text-xs leading-relaxed opacity-75">Moshe Barak operates the publisher's local transport business. The prices above relate to this service.</p>
        </div>
        <div className="p-5 sm:p-8">
          <p className="text-sm leading-relaxed text-muted-foreground">Prepare your request below, then open it in your email app to review and send to Moshe. Prefer an online form? <a href={airportTransferContact.onlineFormUrl} target="_blank" rel="noopener noreferrer" className="font-medium text-primary underline">Use Moshe's existing contact form<span className="sr-only"> (opens in a new tab)</span></a>.</p>
          <form onSubmit={prepare} noValidate className="mt-6" aria-label="Private airport transfer quote request">
            {errors.length > 0 && <div ref={errorRef} tabIndex={-1} role="alert" className="mb-5 rounded-xl border border-destructive p-4 text-sm text-destructive"><p className="font-semibold">Please check these details:</p><ul className="mt-2 list-disc pl-5">{errors.map((error) => <li key={error}>{error}</li>)}</ul></div>}
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="text-sm font-medium">Full name *<Input name="name" autoComplete="name" required maxLength={120} value={fields.name} onChange={(e) => update("name", e.target.value)} className={fieldClass} /></label>
              <label className="text-sm font-medium">Email address *<Input name="email" type="email" autoComplete="email" required maxLength={254} value={fields.email} onChange={(e) => update("email", e.target.value)} className={fieldClass} /></label>
              <label className="text-sm font-medium">Phone / WhatsApp<Input name="phone" type="tel" autoComplete="tel" maxLength={50} placeholder="Include country code" value={fields.phone} onChange={(e) => update("phone", e.target.value)} className={fieldClass} /></label>
              <label className="text-sm font-medium">Flight number<Input name="flight" maxLength={30} placeholder="For example, LY123" value={fields.flight} onChange={(e) => update("flight", e.target.value)} className={fieldClass} /></label>
              <label className="text-sm font-medium">Flight arrival date *<Input name="date" type="date" required value={fields.date} onChange={(e) => update("date", e.target.value)} className={fieldClass} /></label>
              <label className="text-sm font-medium">Flight arrival time *<Input name="time" type="time" required value={fields.time} onChange={(e) => update("time", e.target.value)} className={fieldClass} /></label>
              <p className="-mt-3 text-xs text-muted-foreground sm:col-span-2">Use the arrival date and time in Israel local time, including the correct date after midnight.</p>
              <label className="text-sm font-medium sm:col-span-2">Destination *{fixedDestination && selectedDestination ? <Input name="destination" readOnly value={selectedDestination.destination} className={`${fieldClass} bg-secondary/40`} /> : <select name="destination" required value={destinationId} onChange={(e) => { onDestinationChange?.(e.target.value); setPrepared(null); }} className="mt-2 h-11 w-full rounded-md border border-input bg-background px-3 text-base"><option value="">Choose your destination</option>{airportTransferRates.map((rate) => <option key={rate.id} value={rate.id}>{rate.destination}</option>)}<option value="other">Another destination</option></select>}</label>
              {destinationId === "other" && <label className="text-sm font-medium sm:col-span-2">City or destination *<Input name="otherDestination" required maxLength={120} value={fields.otherDestination} onChange={(e) => update("otherDestination", e.target.value)} className={fieldClass} /></label>}
              <label className="text-sm font-medium sm:col-span-2">Drop-off hotel or address<Input name="address" maxLength={250} placeholder="Hotel name or full address, if known" value={fields.address} onChange={(e) => update("address", e.target.value)} className={fieldClass} /></label>
              <label className="text-sm font-medium">Passengers, including children *<Input name="passengers" type="number" min={1} max={99} step={1} required value={fields.passengers} onChange={(e) => update("passengers", e.target.value)} className={fieldClass} /></label>
              <label className="text-sm font-medium">Suitcases *<Input name="suitcases" type="number" min={0} max={40} step={1} required value={fields.suitcases} onChange={(e) => update("suitcases", e.target.value)} className={fieldClass} /></label>
              <label className="text-sm font-medium">Carry-ons *<Input name="carryOns" type="number" min={0} max={40} step={1} required value={fields.carryOns} onChange={(e) => update("carryOns", e.target.value)} className={fieldClass} /></label>
              {Number(fields.passengers) > 4 && <p className="self-center rounded-lg bg-secondary p-3 text-sm sm:col-span-2">For more than four passengers, ask for a group quote. The published car starting prices do not apply to your whole group.</p>}
              <label className="text-sm font-medium sm:col-span-2">Child seats or additional requests<Textarea name="notes" maxLength={1500} rows={4} placeholder="Children's ages, strollers, extra luggage, accessibility needs or a return-trip request" value={fields.notes} onChange={(e) => update("notes", e.target.value)} className="mt-2 bg-background text-base" /></label>
            </div>
            <label className="mt-5 flex items-start gap-3 text-sm leading-relaxed"><input name="consent" type="checkbox" required checked={fields.consent} onChange={(e) => update("consent", e.target.checked)} className="mt-1 h-4 w-4 shrink-0 accent-primary" /><span>I agree to share these details with Moshe Barak for this quote request. <a href={airportTransferContact.privacyUrl} target="_blank" rel="noopener noreferrer" className="underline">Privacy policy<span className="sr-only"> (opens in a new tab)</span></a></span></label>
            <button type="submit" className="btn btn-primary mt-6 w-full sm:w-auto">Prepare my quote request</button>
            <p className="mt-3 text-xs text-muted-foreground">Your request is sent only when you send the email or submit the existing online form. A booking requires Moshe's confirmation.</p>
          </form>
          {draft && <div role="status" className="mt-6 rounded-xl border border-primary/30 bg-secondary/60 p-5">
            <h3 className="text-xl">Your request is ready to send</h3><p className="mt-2 text-sm leading-relaxed">Open your email app, review the details and send to <strong>{airportTransferContact.email}</strong>. Your request has not been sent yet.</p>
            <div className="mt-4 flex flex-wrap gap-3"><a href={draft.url} className="btn btn-primary">Open email to Moshe</a><button type="button" onClick={copyRequest} className="btn btn-outline">Copy request</button></div>
            {copyMessage && <p className="mt-3 text-sm">{copyMessage}</p>}
            <details className="mt-4 text-sm"><summary className="cursor-pointer font-medium">Review request text</summary><textarea aria-label="Prepared quote request" readOnly rows={10} value={`${draft.subject}\n\n${draft.body}`} className="mt-3 w-full rounded border bg-background p-3 text-sm" /></details>
          </div>}
        </div>
      </div>
    </section>
  );
}
