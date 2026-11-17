import { QuoteSubmissionControls } from "@/components/QuoteSubmissionControls";
import { useQuoteSubmission } from "@/hooks/useQuoteSubmission";
import { PrivacyInformationLink } from "@/components/PrivacyInformationLink";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { privateDriverServices } from "@/data/registry";
import { QuoteFormIntro } from "@/components/QuoteFormIntro";
import { emptyDriverQuote, validateDriverQuote, type DriverQuoteFields } from "@/lib/private-driver-quote";

export function PrivateDriverQuoteForm({ serviceId, onServiceChange }: { serviceId: string; onServiceChange: (id: string) => void }) {
  // Page links may select a journey type, but must never prefill the visitor’s free-text answers.
  const [fields, setFields] = useState(emptyDriverQuote);
  const [errors, setErrors] = useState<string[]>([]);
  const submission = useQuoteSubmission();
  const { reset } = submission;
  useEffect(() => reset(), [serviceId, reset]);
  const errorRef = useRef<HTMLDivElement>(null);
  function update<K extends keyof DriverQuoteFields>(key: K, value: DriverQuoteFields[K]) {
    setFields((previous) => ({ ...previous, [key]: value })); submission.reset();
  }
  async function send(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = { ...fields, serviceId };
    const nextErrors = validateDriverQuote(values);
    setErrors(nextErrors);
    if (nextErrors.length) { submission.reset(); requestAnimationFrame(() => errorRef.current?.focus()); return; }
    await submission.submit({ kind: "driver", fields: values });
  }
  const fieldClass = "mt-2 h-11 w-full min-w-0 bg-background text-base";
  const selectClass = "mt-2 h-11 w-full min-w-0 rounded-md border border-input bg-background px-3 text-base";
  const dateTimeClass = "mt-2 h-11 w-full min-w-0 bg-background px-1 text-[13px] sm:px-3 sm:text-base";
  return <section id="request-quote" tabIndex={-1} aria-labelledby="driver-quote-h" className="mt-9 scroll-mt-24 overflow-hidden rounded-2xl border bg-card shadow-sm focus-visible:outline-2 focus-visible:outline-primary">
    <div>
      <QuoteFormIntro
        headingId="driver-quote-h"
        eyebrow="Your route starts here"
        title="Request a private driver quote"
        description="Tell me where and when you'd like to travel, who is coming and which stops matter to you. I'll help plan a suitable itinerary and vehicle for your journey."
      />
      <div className="p-3 sm:p-7">
        <form onSubmit={send} noValidate aria-label="Private driver quote request" aria-busy={submission.isSending}>
          <fieldset disabled={submission.isSending} className="min-w-0">
            {errors.length > 0 && <div ref={errorRef} tabIndex={-1} role="alert" className="mb-5 rounded-xl border border-destructive p-4 text-sm text-destructive"><p className="font-semibold">Please check these details:</p><ul className="mt-2 list-disc pl-5">{errors.map((error) => <li key={error}>{error}</li>)}</ul></div>}
            <div className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3" data-testid="quote-fields-contact">
                <label className="min-w-0 text-sm font-medium">Full name *<Input name="name" autoComplete="name" required maxLength={120} value={fields.name} onChange={(e) => update("name", e.target.value)} className={fieldClass} /></label>
                <label className="min-w-0 text-sm font-medium">Email address *<Input name="email" type="email" autoComplete="email" required maxLength={254} value={fields.email} onChange={(e) => update("email", e.target.value)} className={fieldClass} /></label>
                <label className="min-w-0 text-sm font-medium">Phone / WhatsApp<Input name="phone" type="tel" autoComplete="tel" maxLength={50} placeholder="Include country code" value={fields.phone} onChange={(e) => update("phone", e.target.value)} className={fieldClass} /></label>
              </div>
              <div>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4" data-testid="quote-fields-journey">
                  <label className="col-span-2 min-w-0 text-sm font-medium sm:col-span-1">Type of journey *<select name="service" required value={serviceId} onChange={(e) => { onServiceChange(e.target.value); submission.reset(); }} className={selectClass}><option value="">Choose your journey</option>{privateDriverServices.map((service) => <option key={service.id} value={service.id}>{service.label}</option>)}</select></label>
                  <label className="min-w-0 text-sm font-medium">Pickup date *<Input name="date" type="date" required value={fields.date} onChange={(e) => update("date", e.target.value)} className={dateTimeClass} /></label>
                  <label className="min-w-0 text-sm font-medium">Pickup time<Input name="time" type="time" value={fields.time} onChange={(e) => update("time", e.target.value)} className={dateTimeClass} /></label>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">Use Israel local date and time. Leave the time open if it still needs to be agreed.</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2" data-testid="quote-fields-route">
                <label className="min-w-0 text-sm font-medium">Pickup city, hotel or address *<Input name="pickup" required maxLength={250} placeholder="For example, your hotel in Tel Aviv" value={fields.pickup} onChange={(e) => update("pickup", e.target.value)} className={fieldClass} /></label>
                <label className="min-w-0 text-sm font-medium">Final drop-off *<Input name="dropoff" required maxLength={250} placeholder="Hotel/address, or return to the pickup point" value={fields.dropoff} onChange={(e) => update("dropoff", e.target.value)} className={fieldClass} /></label>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:gap-4" data-testid="quote-fields-party">
                <label className="min-w-0 text-sm font-medium">Passengers *<Input name="passengers" type="number" min={1} max={99} step={1} required value={fields.passengers} onChange={(e) => update("passengers", e.target.value)} className={fieldClass} /></label>
                <label className="min-w-0 text-sm font-medium">Luggage<Input name="luggage" maxLength={250} placeholder="e.g. 2 suitcases" value={fields.luggage} onChange={(e) => update("luggage", e.target.value)} className={fieldClass} /></label>
              </div>
              <label className="block min-w-0 text-sm font-medium">Stops / itinerary{serviceId === "day-hire" || serviceId === "multi-stop" ? " *" : ""}<Textarea name="itinerary" required={serviceId === "day-hire" || serviceId === "multi-stop"} maxLength={1500} rows={3} placeholder="Places you want to visit, rough timing and any fixed appointments" value={fields.itinerary} onChange={(e) => update("itinerary", e.target.value)} className="mt-2 w-full bg-background text-base" /></label>
              <label className="block min-w-0 text-sm font-medium">Additional requests<Textarea name="notes" maxLength={1500} rows={3} placeholder="Children's ages, mobility needs, desired hours or a return journey" value={fields.notes} onChange={(e) => update("notes", e.target.value)} className="mt-2 w-full bg-background text-base" /></label>
            </div>
            <label className="mt-5 flex items-start gap-3 text-sm leading-relaxed"><input name="consent" type="checkbox" required checked={fields.consent} onChange={(e) => update("consent", e.target.checked)} className="mt-1 h-4 w-4 shrink-0 accent-primary" /><span>I agree to share these details with Moshe Barak for this quote request. <PrivacyInformationLink /></span></label>
            <QuoteSubmissionControls submission={submission} label="Send quote request" />
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">All bookings require confirmation.</p>
          </fieldset>
        </form>
      </div>
    </div>
  </section>;
}
