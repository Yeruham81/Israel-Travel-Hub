import { PrivacyInformationLink } from "@/components/PrivacyInformationLink";
import { airportTransferPhotos } from "@/data/airportTransfers";
import { useEffect, useState, type FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { QuoteSubmissionControls } from "@/components/QuoteSubmissionControls";
import { useQuoteSubmission } from "@/hooks/useQuoteSubmission";
import { validateContactMessage } from "@/lib/contact-message";
import type { GuideContactCopy } from "@/lib/guide-contact";
import { TripadvisorReviewsButton } from "@/components/TripadvisorReviewsButton";

// A bottom-of-page contact portrait may repeat a separated introductory author portrait.
export function HomeContactForm({
  context = "homepage",
  guide,
  showPortrait = true,
  showTripadvisorBesidePortraitMobile = false,
  showTripadvisorReviews = true,
  subjectRequest,
}: {
  context?: "homepage" | "about" | "taxis";
  guide?: GuideContactCopy;
  showPortrait?: boolean;
  showTripadvisorBesidePortraitMobile?: boolean;
  showTripadvisorReviews?: boolean;
  subjectRequest?: { value: string } | undefined;
}) {
  const headingId = guide
    ? "guide-contact-h"
    : context === "about"
      ? "about-contact-h"
      : context === "taxis"
        ? "taxis-contact-h"
        : "home-contact-h";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState("");
  const submission = useQuoteSubmission();
  useEffect(() => {
    if (subjectRequest) {
      setSubject(subjectRequest.value);
      setError("");
    }
  }, [subjectRequest]);
  function update(setter: (value: string) => void, value: string) {
    setter(value);
    submission.reset();
    setError("");
  }
  async function send(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fields = { name, email, subject, message, consent };
    const errors = validateContactMessage(fields);
    if (errors.length) {
      setError(errors.join(" "));
      submission.reset();
      return;
    }
    setError("");
    await submission.submit({ kind: "contact", fields });
  }
  return (
    <section
      id="contact"
      aria-labelledby={headingId}
      className={`${guide || context === "taxis" ? "mt-12 " : ""}scroll-mt-24 overflow-hidden rounded-2xl border bg-card shadow-sm`}
    >
      <div className="grid md:grid-cols-[0.85fr_1.5fr]">
        <div className="bg-navy p-6 text-navy-foreground sm:p-8">
          {(showPortrait || showTripadvisorReviews) && (
            <div
              className={`flex items-start justify-between gap-3 ${showTripadvisorBesidePortraitMobile ? "flex-nowrap md:flex-wrap" : "flex-wrap"}`}
              data-testid="contact-reviews-row"
            >
              {showPortrait && (
                <img
                  src={airportTransferPhotos["moshe"]!.src}
                  alt={airportTransferPhotos["moshe"]!.alt}
                  data-photo-role="contact-portrait"
                  width={150}
                  height={200}
                  loading="lazy"
                  decoding="async"
                  className={`${showTripadvisorBesidePortraitMobile ? "h-20 w-16 sm:h-24 sm:w-20" : "h-24 w-20"} shrink-0 rounded-xl object-cover`}
                />
              )}
              {showTripadvisorReviews && (
                <div className="min-w-0" data-testid="contact-tripadvisor-reviews">
                  <TripadvisorReviewsButton />
                </div>
              )}
            </div>
          )}
          <p className="mt-5 text-xs font-semibold uppercase tracking-widest opacity-80">
            {guide?.eyebrow && !/ask moshe/i.test(guide.eyebrow) ? guide.eyebrow : "Contact me"}
          </p>
          <h2 id={headingId} className="mt-3 text-3xl">
            {guide?.heading ??
              (context === "taxis"
                ? "Need a private transfer or driver in Israel?"
                : "Need a private transfer or day trip in Israel?")}
          </h2>
          <p className="mt-4 leading-relaxed opacity-90">
            {guide?.introduction ??
              (context === "taxis"
                ? "I’m Moshe Barak. I arrange private transfers, city-to-city rides and day trips with a driver. Share your route, date and number of passengers, and I’ll reply personally."
                : "I’m Moshe Barak. I arrange airport transfers, private journeys and sightseeing days with a driver in Israel. Tell me your pickup location, travel date, destinations and passenger details, and I’ll reply personally.")}
          </p>
        </div>
        <div className="p-5 sm:p-8">
          <form
            onSubmit={send}
            noValidate
            className="mt-6"
            aria-label={
              guide
                ? "Guide contact message"
                : context === "about"
                  ? "Contact me"
                  : context === "taxis"
                    ? "Taxi guide contact message"
                    : "Homepage contact message"
            }
            aria-busy={submission.isSending}
          >
            <fieldset disabled={submission.isSending} className="min-w-0 space-y-5">
              {error && (
                <p
                  role="alert"
                  className="rounded-lg border border-destructive p-3 text-sm text-destructive"
                >
                  {error}
                </p>
              )}
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="text-sm font-medium">
                  Full name *
                  <Input
                    name="name"
                    autoComplete="name"
                    required
                    maxLength={120}
                    value={name}
                    onChange={(e) => update(setName, e.target.value)}
                    className="mt-2 h-11 bg-background"
                  />
                </label>
                <label className="text-sm font-medium">
                  Email address *
                  <Input
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    maxLength={254}
                    value={email}
                    onChange={(e) => update(setEmail, e.target.value)}
                    className="mt-2 h-11 bg-background"
                  />
                </label>
              </div>
              <label className="block text-sm font-medium">
                Subject *
                <Input
                  name="subject"
                  required
                  maxLength={160}
                  value={subject}
                  onChange={(e) => update(setSubject, e.target.value)}
                  placeholder="Message subject"
                  className="mt-2 h-11 bg-background"
                />
              </label>
              <label className="block text-sm font-medium">
                Your message *
                <Textarea
                  name="message"
                  required
                  maxLength={4000}
                  rows={5}
                  value={message}
                  onChange={(e) => update(setMessage, e.target.value)}
                  placeholder={
                    guide?.placeholder ??
                    (context === "taxis"
                      ? "Your route, travel date, passengers, luggage or question…"
                      : "Travel date, pickup point, destinations, passengers and luggage…")
                  }
                  className="mt-2 bg-background"
                />
              </label>
              <label className="flex items-start gap-3 text-sm leading-relaxed">
                <input
                  type="checkbox"
                  name="consent"
                  checked={consent}
                  onChange={(e) => {
                    setConsent(e.target.checked);
                    submission.reset();
                  }}
                  required
                  className="mt-1 size-4 shrink-0 accent-primary"
                />
                <span>
                  I agree to share my details with Moshe Barak for the purpose of responding to my
                  inquiry. <PrivacyInformationLink />.
                </span>
              </label>
              <QuoteSubmissionControls submission={submission} label="Send message" message />
              <p className="text-xs text-muted-foreground">All bookings require confirmation.</p>
            </fieldset>
          </form>
        </div>
      </div>
    </section>
  );
}
