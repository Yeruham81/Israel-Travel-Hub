import { QuoteSubmissionControls } from "@/components/QuoteSubmissionControls";
import { useQuoteSubmission } from "@/hooks/useQuoteSubmission";
import { PrivacyInformationLink } from "@/components/PrivacyInformationLink";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { airportTransferRates } from "@/data/registry";
import { QuoteFormIntro } from "@/components/QuoteFormIntro";
import { buildAirportDropoffMessage, emptyTransferQuote, validateTransferQuote, type TransferQuoteFields } from "@/lib/transfer-quote";

export function TransferQuoteForm({ destinationId, onDestinationChange, fixedDestination = false, fixedDestinationLabel, compactHeader = false, allowAirportDropoff = false }: { destinationId: string; onDestinationChange?: (id: string) => void; fixedDestination?: boolean; fixedDestinationLabel?: string; compactHeader?: boolean; allowAirportDropoff?: boolean }) {
  const selectedDestination = airportTransferRates.find((rate) => rate.id === destinationId);
  const destinationLabel = fixedDestinationLabel || selectedDestination?.destination;
  const [fields, setFields] = useState(emptyTransferQuote);
  const [direction, setDirection] = useState<"pickup" | "dropoff">("pickup");
  const airportDropoff = allowAirportDropoff && direction === "dropoff";
  const [errors, setErrors] = useState<string[]>([]);
  const submission = useQuoteSubmission();
  const { reset } = submission;
  useEffect(() => reset(), [destinationId, reset]);
  const errorRef = useRef<HTMLDivElement>(null);
  function update<K extends keyof TransferQuoteFields>(key: K, value: TransferQuoteFields[K]) {
    setFields((previous) => ({ ...previous, [key]: value })); submission.reset();
  }
  async function send(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = { ...fields, destinationId };
    const nextErrors = validateTransferQuote(values, new Date(), airportDropoff ? "dropoff" : "pickup");
    setErrors(nextErrors);
    if (nextErrors.length) { submission.reset(); requestAnimationFrame(() => errorRef.current?.focus()); return; }
    if (airportDropoff) {
      await submission.submit({ kind: "contact", fields: {
        name: values.name, email: values.email, subject: "Private transfer to Ben Gurion Airport",
        message: buildAirportDropoffMessage(values), consent: values.consent,
      } });
    } else {
      await submission.submit({ kind: "transfer", fields: values });
    }
  }
  const fieldClass = "mt-2 h-11 w-full min-w-0 bg-background text-base";
  return (
    <section id="request-quote" tabIndex={-1} aria-labelledby="quote-h" className={`${compactHeader ? "mx-auto mt-9 w-full" : "mt-14"} scroll-mt-24 overflow-hidden rounded-2xl border bg-card shadow-sm focus-visible:outline-2 focus-visible:outline-primary`}>
      <div>
        <QuoteFormIntro
          headingId="quote-h"
          eyebrow="A local, personal service"
          showTripadvisorReviews={allowAirportDropoff && compactHeader}
          title={compactHeader ? "Request a private transfer quote" : fixedDestination && selectedDestination ? `Request your transfer to ${destinationLabel}` : "Ask me for a personal quote"}
          description={compactHeader
            ? "Share your route, flight and passenger details for a private airport transfer quote."
            : "Tell me about your arrival and destination. I'll help arrange a suitable private vehicle and confirm the full price before you book."}
        />
        <div className="p-5 sm:p-7">
          <form onSubmit={send} noValidate aria-label="Private airport transfer quote request" aria-busy={submission.isSending}>
            <fieldset disabled={submission.isSending} className="min-w-0">
              {errors.length > 0 && <div ref={errorRef} tabIndex={-1} role="alert" className="mb-5 rounded-xl border border-destructive p-4 text-sm text-destructive"><p className="font-semibold">Please check these details:</p><ul className="mt-2 list-disc pl-5">{errors.map((error) => <li key={error}>{error}</li>)}</ul></div>}
              <div className="space-y-5">
                {allowAirportDropoff && <fieldset className="rounded-xl border border-primary/20 bg-secondary/30 p-3 sm:p-4" aria-label="Transfer direction">
                  <legend className="px-1 text-sm font-semibold">Transfer direction</legend>
                  <div className="grid grid-cols-2 gap-2">
                    {([{ id: "pickup", label: "From Ben Gurion Airport" }, { id: "dropoff", label: "To Ben Gurion Airport" }] as const).map(option => <label key={option.id} className={`flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-lg border px-2 py-2 text-center text-xs font-semibold leading-snug sm:text-sm ${direction === option.id ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background text-foreground hover:border-primary/50"}`}>
                      <input type="radio" name="transferDirection" value={option.id} checked={direction === option.id} onChange={() => { setDirection(option.id); setErrors([]); submission.reset(); }} className={direction === option.id ? "accent-white" : "accent-primary"} />{option.label}
                    </label>)}
                  </div>
                </fieldset>}
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3" data-testid="quote-fields-contact">
                  <label className="min-w-0 text-sm font-medium">Full name *<Input name="name" autoComplete="name" required maxLength={120} value={fields.name} onChange={(e) => update("name", e.target.value)} className={fieldClass} /></label>
                  <label className="min-w-0 text-sm font-medium">Email address *<Input name="email" type="email" autoComplete="email" required maxLength={254} value={fields.email} onChange={(e) => update("email", e.target.value)} className={fieldClass} /></label>
                  <label className="min-w-0 text-sm font-medium">Phone / WhatsApp<Input name="phone" type="tel" autoComplete="tel" maxLength={50} placeholder="Include country code" value={fields.phone} onChange={(e) => update("phone", e.target.value)} className={fieldClass} /></label>
                </div>
                <div>
                  <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3" data-testid="quote-fields-arrival">
                    <label className="min-w-0 text-sm font-medium">Flight number<Input name="flight" maxLength={30} placeholder="For example, LY123" value={fields.flight} onChange={(e) => update("flight", e.target.value)} className={fieldClass} /></label>
                    <label className="min-w-0 text-sm font-medium">{airportDropoff ? "Flight departure date *" : "Flight arrival date *"}<Input name="date" type="date" required value={fields.date} onChange={(e) => update("date", e.target.value)} className={fieldClass} /></label>
                    <label className="min-w-0 text-sm font-medium">{airportDropoff ? "Flight departure time *" : "Flight arrival time *"}<Input name="time" type="time" required value={fields.time} onChange={(e) => update("time", e.target.value)} className={fieldClass} /></label>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">Use the {airportDropoff ? "departure" : "arrival"} date and time in Israel local time, including the correct date after midnight.</p>
                </div>
                <div>
                  <div className="grid gap-4 sm:grid-cols-2" data-testid="quote-fields-destination">
                    <label className="min-w-0 text-sm font-medium">{airportDropoff ? "Pickup area *" : "Destination *"}{fixedDestination && selectedDestination ? <Input name="destination" readOnly value={destinationLabel} className={`${fieldClass} bg-secondary/40`} /> : <select name="destination" required value={destinationId} onChange={(e) => { onDestinationChange?.(e.target.value); submission.reset(); }} className="mt-2 h-11 w-full min-w-0 rounded-md border border-input bg-background px-3 text-base"><option value="">{airportDropoff ? "Choose your pickup area" : "Choose your destination"}</option>{airportTransferRates.map((rate) => <option key={rate.id} value={rate.id}>{rate.destination}</option>)}<option value="other">Another destination</option></select>}</label>
                    <label className="min-w-0 text-sm font-medium">{airportDropoff ? "Pickup hotel or address *" : "Drop-off hotel or address"}<Input name="address" required={airportDropoff} maxLength={250} placeholder={airportDropoff ? "Pickup hotel or full address" : "Hotel name or full address, if known"} value={fields.address} onChange={(e) => update("address", e.target.value)} className={fieldClass} /></label>
                  </div>
                  {destinationId === "other" && <label className="mt-4 block min-w-0 text-sm font-medium">{airportDropoff ? "Pickup city or area *" : "City or destination *"}<Input name="otherDestination" required maxLength={120} value={fields.otherDestination} onChange={(e) => update("otherDestination", e.target.value)} className={fieldClass} /></label>}
                </div>
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3" data-testid="quote-fields-party">
                  <label className="min-w-0 text-sm font-medium">Passengers *<Input name="passengers" type="number" min={1} max={99} step={1} required value={fields.passengers} onChange={(e) => update("passengers", e.target.value)} className={fieldClass} /></label>
                  <label className="min-w-0 text-sm font-medium">Suitcases *<Input name="suitcases" type="number" min={0} max={40} step={1} required value={fields.suitcases} onChange={(e) => update("suitcases", e.target.value)} className={fieldClass} /></label>
                  <label className="min-w-0 text-sm font-medium">Carry-ons *<Input name="carryOns" type="number" min={0} max={40} step={1} required value={fields.carryOns} onChange={(e) => update("carryOns", e.target.value)} className={fieldClass} /></label>
                </div>
                {Number(fields.passengers) > 4 && <p className="rounded-lg bg-secondary p-3 text-sm">For more than four passengers, ask for a group quote. The published car starting prices do not apply to your whole group.</p>}
                <label className="block min-w-0 text-sm font-medium">Additional requests<Textarea name="notes" maxLength={1500} rows={3} placeholder="Children's ages, strollers, extra luggage, accessibility needs or a return-trip request" value={fields.notes} onChange={(e) => update("notes", e.target.value)} className="mt-2 w-full bg-background text-base" /></label>
              </div>
              <label className="mt-5 flex items-start gap-3 text-sm leading-relaxed"><input name="consent" type="checkbox" required checked={fields.consent} onChange={(e) => update("consent", e.target.checked)} className="mt-1 h-4 w-4 shrink-0 accent-primary" /><span>I agree to share these details with Moshe Barak for this quote request. <PrivacyInformationLink /></span></label>
              <QuoteSubmissionControls submission={submission} label="Send quote request" />
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">All bookings require confirmation.</p>
            </fieldset>
          </form>
        </div>
      </div>
    </section>
  );
}
