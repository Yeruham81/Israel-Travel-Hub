import { QuoteSubmissionControls } from "@/components/QuoteSubmissionControls";
import { useQuoteSubmission } from "@/hooks/useQuoteSubmission";
import { PrivacyInformationLink } from "@/components/PrivacyInformationLink";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { QuoteFormIntro } from "@/components/QuoteFormIntro";
import { shoreExcursionRates, shorePorts, type ShorePortId } from "@/data/registry";
import { emptyShoreQuote, validateShoreQuote, type ShoreQuoteFields } from "@/lib/shore-quote";

export function ShoreQuoteForm({
  portId,
  itineraryId,
  onItineraryChange,
}: {
  portId: ShorePortId;
  itineraryId: string;
  onItineraryChange: (id: string) => void;
}) {
  const port = shorePorts[portId];
  const itineraries = shoreExcursionRates.filter((rate) => rate.portId === portId);
  const [fields, setFields] = useState(emptyShoreQuote);
  const [errors, setErrors] = useState<string[]>([]);
  const submission = useQuoteSubmission();
  const { reset } = submission;
  useEffect(() => reset(), [portId, itineraryId, reset]);
  const errorRef = useRef<HTMLDivElement>(null);
  function update<K extends keyof ShoreQuoteFields>(key: K, value: ShoreQuoteFields[K]) {
    setFields((previous) => ({
      ...previous,
      [key]: value,
      ...(key === "date" && (!previous.allAboardDate || previous.allAboardDate === previous.date)
        ? { allAboardDate: String(value) }
        : {}),
    }));
    submission.reset();
  }
  async function send(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = { ...fields, itineraryId };
    const nextErrors = validateShoreQuote(values, portId);
    setErrors(nextErrors);
    if (nextErrors.length) {
      submission.reset();
      requestAnimationFrame(() => errorRef.current?.focus());
      return;
    }
    await submission.submit({ kind: "shore", portId, fields: values });
  }
  const fieldClass = "mt-2 h-11 w-full min-w-0 bg-background text-base";
  return (
    <section
      id="request-quote"
      tabIndex={-1}
      aria-labelledby="quote-h"
      className="mt-12 scroll-mt-24 overflow-hidden rounded-2xl border bg-card shadow-sm focus-visible:outline-2 focus-visible:outline-primary"
    >
      <div>
        <QuoteFormIntro
          headingId="quote-h"
          eyebrow="Private shore excursions"
          title={`Request your ${port.name} shore excursion`}
          description={`I arrange private car-and-driver trips from ${port.name} Port. Tell me your ship, hours ashore, group size and preferred stops.`}
        />
        <div className="p-5 sm:p-7">
          <form
            onSubmit={send}
            noValidate
            aria-label={`${port.name} shore excursion quote request`}
            aria-busy={submission.isSending}
          >
            <fieldset disabled={submission.isSending} className="min-w-0">
              {errors.length > 0 && (
                <div
                  ref={errorRef}
                  tabIndex={-1}
                  role="alert"
                  className="mb-5 rounded-xl border border-destructive p-4 text-sm text-destructive"
                >
                  <p className="font-semibold">Please check these details:</p>
                  <ul className="mt-2 list-disc pl-5">
                    {errors.map((error) => (
                      <li key={error}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="space-y-5">
                <div
                  className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4"
                  data-testid="quote-fields-contact"
                >
                  <label className="col-span-2 min-w-0 text-sm font-medium sm:col-span-1">
                    Full name *
                    <Input
                      name="name"
                      autoComplete="name"
                      required
                      maxLength={120}
                      value={fields.name}
                      onChange={(event) => update("name", event.target.value)}
                      className={fieldClass}
                    />
                  </label>
                  <label className="col-span-2 min-w-0 text-sm font-medium sm:col-span-1">
                    Email address *
                    <Input
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      maxLength={254}
                      value={fields.email}
                      onChange={(event) => update("email", event.target.value)}
                      className={fieldClass}
                    />
                  </label>
                  <label className="min-w-0 text-sm font-medium">
                    Phone / WhatsApp
                    <Input
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      maxLength={50}
                      placeholder="Include country code"
                      value={fields.phone}
                      onChange={(event) => update("phone", event.target.value)}
                      className={fieldClass}
                    />
                  </label>
                  <label className="min-w-0 text-sm font-medium">
                    Country of origin
                    <Input
                      name="country"
                      autoComplete="country-name"
                      maxLength={100}
                      value={fields.country}
                      onChange={(event) => update("country", event.target.value)}
                      className={fieldClass}
                    />
                  </label>
                </div>
                <div className="grid gap-4 sm:grid-cols-2" data-testid="quote-fields-cruise">
                  <label className="min-w-0 text-sm font-medium">
                    Departure & return port
                    <Input
                      name="port"
                      readOnly
                      value={`${port.name} Port`}
                      className={`${fieldClass} bg-secondary/40`}
                    />
                  </label>
                  <label className="min-w-0 text-sm font-medium">
                    Cruise ship name *
                    <Input
                      name="ship"
                      required
                      maxLength={120}
                      placeholder="Cruise ship name"
                      value={fields.ship}
                      onChange={(event) => update("ship", event.target.value)}
                      className={fieldClass}
                    />
                  </label>
                </div>
                <div>
                  <div
                    className="grid grid-cols-2 gap-3 sm:gap-4 2xl:grid-cols-4"
                    data-testid="quote-fields-schedule"
                  >
                    <label className="min-w-0 text-sm font-medium">
                      Excursion date *
                      <Input
                        name="date"
                        type="date"
                        required
                        value={fields.date}
                        onChange={(event) => update("date", event.target.value)}
                        className={fieldClass}
                      />
                    </label>
                    <label className="min-w-0 text-sm font-medium">
                      Expected disembarkation time *
                      <Input
                        name="pickupTime"
                        type="time"
                        required
                        value={fields.pickupTime}
                        onChange={(event) => update("pickupTime", event.target.value)}
                        className={fieldClass}
                      />
                    </label>
                    <label className="min-w-0 text-sm font-medium">
                      All-aboard date *
                      <Input
                        name="allAboardDate"
                        type="date"
                        min={fields.date || undefined}
                        required
                        value={fields.allAboardDate}
                        onChange={(event) => update("allAboardDate", event.target.value)}
                        className={fieldClass}
                      />
                    </label>
                    <label className="min-w-0 text-sm font-medium">
                      Ship's all-aboard time *
                      <Input
                        name="allAboardTime"
                        type="time"
                        required
                        value={fields.allAboardTime}
                        onChange={(event) => update("allAboardTime", event.target.value)}
                        className={fieldClass}
                      />
                    </label>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    Use Israel local dates and times. All-aboard is the deadline to be back on the
                    ship, which may be earlier than sailing. Check the return date for an overnight
                    call.
                  </p>
                </div>
                <div>
                  <div className="grid gap-4 sm:grid-cols-2" data-testid="quote-fields-party">
                    <label className="min-w-0 text-sm font-medium">
                      Preferred itinerary *
                      <select
                        name="itinerary"
                        required
                        value={itineraryId}
                        onChange={(event) => {
                          onItineraryChange(event.target.value);
                          submission.reset();
                        }}
                        className="mt-2 h-11 w-full min-w-0 rounded-md border border-input bg-background px-3 text-base"
                      >
                        <option value="">Choose your itinerary</option>
                        {itineraries.map((itinerary) => (
                          <option key={itinerary.id} value={itinerary.id}>
                            {itinerary.destination}
                          </option>
                        ))}
                        <option value="other">Other destination or custom itinerary</option>
                      </select>
                    </label>
                    <label className="min-w-0 text-sm font-medium">
                      Passengers *
                      <Input
                        name="passengers"
                        type="number"
                        min={1}
                        max={99}
                        step={1}
                        required
                        value={fields.passengers}
                        onChange={(event) => update("passengers", event.target.value)}
                        className={fieldClass}
                      />
                    </label>
                  </div>
                  {itineraryId === "other" && (
                    <label className="mt-4 block min-w-0 text-sm font-medium">
                      Your itinerary or destinations *
                      <Input
                        name="otherItinerary"
                        required
                        maxLength={250}
                        value={fields.otherItinerary}
                        onChange={(event) => update("otherItinerary", event.target.value)}
                        className={fieldClass}
                      />
                    </label>
                  )}
                </div>
                {Number(fields.passengers) > 4 && (
                  <p className="rounded-lg bg-secondary p-3 text-sm">
                    Vans and minibuses are available for larger groups.
                  </p>
                )}
                <label className="block min-w-0 text-sm font-medium">
                  Additional requests
                  <Textarea
                    name="notes"
                    maxLength={1500}
                    rows={3}
                    placeholder="Must-see stops, children's ages, walking preferences, equipment, luggage or a request for a licensed guide"
                    value={fields.notes}
                    onChange={(event) => update("notes", event.target.value)}
                    className="mt-2 w-full bg-background text-base"
                  />
                </label>
              </div>
              <label className="mt-5 flex items-start gap-3 text-sm leading-relaxed">
                <input
                  name="consent"
                  type="checkbox"
                  required
                  checked={fields.consent}
                  onChange={(event) => update("consent", event.target.checked)}
                  className="mt-1 h-4 w-4 shrink-0 accent-primary"
                />
                <span>
                  I agree to share these details with Moshe Barak for this inquiry.{" "}
                  <PrivacyInformationLink />
                </span>
              </label>
              <QuoteSubmissionControls submission={submission} label="Send excursion request" />
              <p className="mt-3 text-xs text-muted-foreground">
                All bookings require confirmation.
              </p>
            </fieldset>
          </form>
        </div>
      </div>
    </section>
  );
}
