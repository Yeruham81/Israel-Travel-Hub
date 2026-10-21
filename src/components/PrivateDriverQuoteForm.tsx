import { QuoteSubmissionControls } from "@/components/QuoteSubmissionControls";
import { useQuoteSubmission } from "@/hooks/useQuoteSubmission";
import { PrivacyInformationLink } from "@/components/PrivacyInformationLink";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { privateDriverServices } from "@/data/registry";
import { airportTransferPhotos } from "@/data/airportTransfers";
import { emptyDriverQuote, validateDriverQuote, type DriverQuoteFields } from "@/lib/private-driver-quote";

export function PrivateDriverQuoteForm({ serviceId, onServiceChange, initialFields }: { serviceId: string; onServiceChange: (id: string) => void; initialFields?: Partial<DriverQuoteFields> | undefined }) {
  const [fields, setFields] = useState(() => ({ ...emptyDriverQuote, ...initialFields }));
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
  const photo = airportTransferPhotos["moshe"]!;
  const fieldClass = "mt-2 h-11 bg-background text-base";
  const selectClass = "mt-2 h-11 w-full rounded-md border border-input bg-background px-3 text-base";
  return <section id="request-quote" tabIndex={-1} aria-labelledby="driver-quote-h" className="mt-12 scroll-mt-24 overflow-hidden rounded-2xl border bg-card shadow-sm focus-visible:outline-2 focus-visible:outline-primary">
    <div className="grid md:grid-cols-[0.8fr_1.6fr]">
      <div className="bg-navy p-6 text-navy-foreground sm:p-8">
        <img src={photo.src} alt={photo.alt} width={150} height={200} loading="lazy" className="h-24 w-20 rounded-xl object-cover" />
        <p className="mt-5 text-xs font-semibold uppercase tracking-widest opacity-75">Your route starts here</p>
        <h2 id="driver-quote-h" className="mt-3 text-3xl">Request a private driver quote</h2>
        <p className="mt-4 leading-relaxed opacity-90">Tell Moshe Barak where you want to go, when and who is travelling. Ask for an itinerary and vehicle that fit your trip.</p>
        <ul className="mt-6 space-y-3 text-sm opacity-90"><li>Hotel-to-hotel and intercity journeys</li><li>A driver for the day or several stops</li><li>A personal quote for your actual route</li><li>Booking only after confirmation</li></ul>
        <p className="mt-6 border-t border-white/20 pt-5 text-xs leading-relaxed opacity-75">Disclosure: Moshe Barak operates the publisher's local transport business. Requests here are for this service.</p>
      </div>
      <div className="p-5 sm:p-8">
        <form onSubmit={send} noValidate aria-label="Private driver quote request" aria-busy={submission.isSending}>
          <fieldset disabled={submission.isSending} className="min-w-0">
            {errors.length > 0 && <div ref={errorRef} tabIndex={-1} role="alert" className="mb-5 rounded-xl border border-destructive p-4 text-sm text-destructive"><p className="font-semibold">Please check these details:</p><ul className="mt-2 list-disc pl-5">{errors.map((error) => <li key={error}>{error}</li>)}</ul></div>}
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="text-sm font-medium">Full name *<Input name="name" autoComplete="name" required maxLength={120} value={fields.name} onChange={(e) => update("name", e.target.value)} className={fieldClass} /></label>
              <label className="text-sm font-medium">Email address *<Input name="email" type="email" autoComplete="email" required maxLength={254} value={fields.email} onChange={(e) => update("email", e.target.value)} className={fieldClass} /></label>
              <label className="text-sm font-medium">Phone / WhatsApp<Input name="phone" type="tel" autoComplete="tel" maxLength={50} placeholder="Include country code" value={fields.phone} onChange={(e) => update("phone", e.target.value)} className={fieldClass} /></label>
              <label className="text-sm font-medium">Type of journey *<select name="service" required value={serviceId} onChange={(e) => { onServiceChange(e.target.value); submission.reset(); }} className={selectClass}><option value="">Choose your journey</option>{privateDriverServices.map((service) => <option key={service.id} value={service.id}>{service.label}</option>)}</select></label>
              <label className="text-sm font-medium">Pickup date *<Input name="date" type="date" required value={fields.date} onChange={(e) => update("date", e.target.value)} className={fieldClass} /></label>
              <label className="text-sm font-medium">Preferred pickup time<Input name="time" type="time" value={fields.time} onChange={(e) => update("time", e.target.value)} className={fieldClass} /></label>
              <p className="-mt-3 text-xs text-muted-foreground sm:col-span-2">Use Israel local date and time. Leave the time open if it still needs to be agreed.</p>
              <label className="text-sm font-medium sm:col-span-2">Pickup city, hotel or address *<Input name="pickup" required maxLength={250} placeholder="For example, your hotel in Tel Aviv" value={fields.pickup} onChange={(e) => update("pickup", e.target.value)} className={fieldClass} /></label>
              <label className="text-sm font-medium sm:col-span-2">Final drop-off *<Input name="dropoff" required maxLength={250} placeholder="Hotel/address, or return to the pickup point" value={fields.dropoff} onChange={(e) => update("dropoff", e.target.value)} className={fieldClass} /></label>
              <label className="text-sm font-medium">Passengers, including children *<Input name="passengers" type="number" min={1} max={99} step={1} required value={fields.passengers} onChange={(e) => update("passengers", e.target.value)} className={fieldClass} /></label>
              <label className="text-sm font-medium">Luggage<Input name="luggage" maxLength={250} placeholder="Cases, carry-ons, strollers, bulky items" value={fields.luggage} onChange={(e) => update("luggage", e.target.value)} className={fieldClass} /></label>
              <label className="text-sm font-medium sm:col-span-2">Stops / itinerary{serviceId === "day-hire" || serviceId === "multi-stop" ? " *" : ""}<Textarea name="itinerary" required={serviceId === "day-hire" || serviceId === "multi-stop"} maxLength={1500} rows={4} placeholder="Places you want to visit, rough timing and any fixed appointments" value={fields.itinerary} onChange={(e) => update("itinerary", e.target.value)} className="mt-2 bg-background text-base" /></label>
              <label className="text-sm font-medium sm:col-span-2">Additional requests<Textarea name="notes" maxLength={1500} rows={3} placeholder="Children's ages, mobility needs, desired hours or a return journey" value={fields.notes} onChange={(e) => update("notes", e.target.value)} className="mt-2 bg-background text-base" /></label>
            </div>
            <label className="mt-5 flex items-start gap-3 text-sm leading-relaxed"><input name="consent" type="checkbox" required checked={fields.consent} onChange={(e) => update("consent", e.target.checked)} className="mt-1 h-4 w-4 shrink-0 accent-primary" /><span>I agree to share these details with Moshe Barak for this quote request. <PrivacyInformationLink /></span></label>
            <QuoteSubmissionControls submission={submission} label="Send quote request" />
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">Send your details directly to Moshe. The itinerary, vehicle, price and booking require confirmation.</p>
          </fieldset>
        </form>
      </div>
    </div>
  </section>;
}
