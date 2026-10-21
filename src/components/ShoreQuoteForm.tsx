import { QuoteSubmissionControls } from "@/components/QuoteSubmissionControls";
import { useQuoteSubmission } from "@/hooks/useQuoteSubmission";
import { PrivacyInformationLink } from "@/components/PrivacyInformationLink";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { airportTransferPhotos } from "@/data/airportTransfers";
import { shoreExcursionRates, shorePorts, type ShorePortId } from "@/data/registry";
import { emptyShoreQuote, validateShoreQuote, type ShoreQuoteFields } from "@/lib/shore-quote";

export function ShoreQuoteForm({ portId, itineraryId, onItineraryChange }: { portId: ShorePortId; itineraryId: string; onItineraryChange: (id: string) => void }) {
  const port = shorePorts[portId];
  const itineraries = shoreExcursionRates.filter((rate) => rate.portId === portId);
  const [fields, setFields] = useState(emptyShoreQuote);
  const [errors, setErrors] = useState<string[]>([]);
  const submission = useQuoteSubmission();
  const { reset } = submission;
  useEffect(() => reset(), [portId, itineraryId, reset]);
  const errorRef = useRef<HTMLDivElement>(null);
  function update<K extends keyof ShoreQuoteFields>(key: K, value: ShoreQuoteFields[K]) {
    setFields((previous) => ({ ...previous, [key]: value, ...(key === "date" && (!previous.allAboardDate || previous.allAboardDate === previous.date) ? { allAboardDate: String(value) } : {}) }));
    submission.reset();
  }
  async function send(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = { ...fields, itineraryId };
    const nextErrors = validateShoreQuote(values, portId);
    setErrors(nextErrors);
    if (nextErrors.length) { submission.reset(); requestAnimationFrame(() => errorRef.current?.focus()); return; }
    await submission.submit({ kind: "shore", portId, fields: values });
  }
  const photo = airportTransferPhotos["moshe"]!;
  const fieldClass = "mt-2 h-11 bg-background text-base";
  return <section id="request-quote" tabIndex={-1} aria-labelledby="quote-h" className="mt-12 scroll-mt-24 overflow-hidden rounded-2xl border bg-card shadow-sm focus-visible:outline-2 focus-visible:outline-primary">
    <div className="grid md:grid-cols-[0.8fr_1.6fr]">
      <div className="bg-navy p-6 text-navy-foreground sm:p-8">
        <img src={photo.src} alt={photo.alt} width={150} height={200} loading="lazy" className="h-24 w-20 rounded-xl object-cover" />
        <p className="mt-5 text-xs font-semibold uppercase tracking-widest opacity-75">A personal plan for your day ashore</p>
        <h2 id="quote-h" className="mt-3 text-3xl">Request your {port.name} shore excursion</h2>
        <p className="mt-4 leading-relaxed opacity-90">Tell Moshe about your ship and the places you want to visit. Agree a realistic route, the right vehicle and the full price before you book.</p>
        <ul className="mt-6 space-y-3 text-sm opacity-90"><li>Private return trip from {port.name} Port</li><li>Custom priorities and larger-group requests</li><li>Pickup and return planned around your ship</li><li>A quote request carries no booking commitment</li></ul>
        <p className="mt-6 border-t border-white/20 pt-5 text-xs leading-relaxed opacity-75">Moshe Barak operates the publisher's local transport business. The starting prices above relate to his car-and-driver service; a licensed guide is a separate arrangement.</p>
      </div>
      <div className="p-5 sm:p-8">
        <form onSubmit={send} noValidate aria-label={`${port.name} shore excursion quote request`} aria-busy={submission.isSending}>
          <fieldset disabled={submission.isSending} className="min-w-0">
            {errors.length > 0 && <div ref={errorRef} tabIndex={-1} role="alert" className="mb-5 rounded-xl border border-destructive p-4 text-sm text-destructive"><p className="font-semibold">Please check these details:</p><ul className="mt-2 list-disc pl-5">{errors.map((error) => <li key={error}>{error}</li>)}</ul></div>}
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="text-sm font-medium">Full name *<Input name="name" autoComplete="name" required maxLength={120} value={fields.name} onChange={(event) => update("name", event.target.value)} className={fieldClass} /></label>
              <label className="text-sm font-medium">Email address *<Input name="email" type="email" autoComplete="email" required maxLength={254} value={fields.email} onChange={(event) => update("email", event.target.value)} className={fieldClass} /></label>
              <label className="text-sm font-medium">Phone / WhatsApp<Input name="phone" type="tel" autoComplete="tel" maxLength={50} placeholder="Include country code" value={fields.phone} onChange={(event) => update("phone", event.target.value)} className={fieldClass} /></label>
              <label className="text-sm font-medium">Country of origin<Input name="country" autoComplete="country-name" maxLength={100} value={fields.country} onChange={(event) => update("country", event.target.value)} className={fieldClass} /></label>
              <label className="text-sm font-medium">Departure & return port<Input name="port" readOnly value={`${port.name} Port`} className={`${fieldClass} bg-secondary/40`} /></label>
              <label className="text-sm font-medium">Cruise ship name *<Input name="ship" required maxLength={120} placeholder="Your ship, not only the cruise line" value={fields.ship} onChange={(event) => update("ship", event.target.value)} className={fieldClass} /></label>
              <label className="text-sm font-medium">Excursion date *<Input name="date" type="date" required value={fields.date} onChange={(event) => update("date", event.target.value)} className={fieldClass} /></label>
              <label className="text-sm font-medium">Expected disembarkation time *<Input name="pickupTime" type="time" required value={fields.pickupTime} onChange={(event) => update("pickupTime", event.target.value)} className={fieldClass} /></label>
              <label className="text-sm font-medium">All-aboard date *<Input name="allAboardDate" type="date" min={fields.date || undefined} required value={fields.allAboardDate} onChange={(event) => update("allAboardDate", event.target.value)} className={fieldClass} /></label>
              <label className="text-sm font-medium">Ship's all-aboard time *<Input name="allAboardTime" type="time" required value={fields.allAboardTime} onChange={(event) => update("allAboardTime", event.target.value)} className={fieldClass} /></label>
              <p className="-mt-3 text-xs leading-relaxed text-muted-foreground sm:col-span-2">Use Israel local dates and times. All-aboard is the deadline to be back on the ship, which may be earlier than sailing. Check the return date for an overnight call.</p>
              <label className="text-sm font-medium sm:col-span-2">Requested itinerary *<select name="itinerary" required value={itineraryId} onChange={(event) => { onItineraryChange(event.target.value); submission.reset(); }} className="mt-2 h-11 w-full rounded-md border border-input bg-background px-3 text-base"><option value="">Choose your itinerary</option>{itineraries.map((itinerary) => <option key={itinerary.id} value={itinerary.id}>{itinerary.destination}</option>)}<option value="other">Another destination or custom day</option></select></label>
              {itineraryId === "other" && <label className="text-sm font-medium sm:col-span-2">Your itinerary or destinations *<Input name="otherItinerary" required maxLength={250} value={fields.otherItinerary} onChange={(event) => update("otherItinerary", event.target.value)} className={fieldClass} /></label>}
              <label className="text-sm font-medium sm:col-span-2">Passengers, including children *<Input name="passengers" type="number" min={1} max={99} step={1} required value={fields.passengers} onChange={(event) => update("passengers", event.target.value)} className={fieldClass} /></label>
              {Number(fields.passengers) > 4 && <p className="rounded-lg bg-secondary p-3 text-sm sm:col-span-2">Your party needs a separate group quote. The published starting rates for up to four passengers do not apply to your whole group.</p>}
              <label className="text-sm font-medium sm:col-span-2">Priorities, child seats, mobility needs or other requests<Textarea name="notes" maxLength={1500} rows={4} placeholder="Must-see stops, children's ages, walking preferences, equipment, luggage or a request for a licensed guide" value={fields.notes} onChange={(event) => update("notes", event.target.value)} className="mt-2 bg-background text-base" /></label>
            </div>
            <label className="mt-5 flex items-start gap-3 text-sm leading-relaxed"><input name="consent" type="checkbox" required checked={fields.consent} onChange={(event) => update("consent", event.target.checked)} className="mt-1 h-4 w-4 shrink-0 accent-primary" /><span>I agree to share these details with Moshe Barak for this inquiry. <PrivacyInformationLink /></span></label>
            <QuoteSubmissionControls submission={submission} label="Send excursion request" />
            <p className="mt-3 text-xs text-muted-foreground">Submitting this form does not constitute a booking. Please wait for confirmation.</p>
          </fieldset>
        </form>
      </div>
    </div>
  </section>;
}
