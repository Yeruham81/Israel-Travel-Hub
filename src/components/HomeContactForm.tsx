import { PrivacyInformationLink } from "@/components/PrivacyInformationLink";
import { useState, type FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { QuoteSubmissionControls } from "@/components/QuoteSubmissionControls";
import { useQuoteSubmission } from "@/hooks/useQuoteSubmission";
import { validateContactMessage } from "@/lib/contact-message";

export function HomeContactForm({ context = "homepage" }: { context?: "homepage" | "about" }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState("");
  const submission = useQuoteSubmission();
  function update(setter: (value: string) => void, value: string) { setter(value); submission.reset(); setError(""); }
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
  return <section id="contact" aria-labelledby={context === "about" ? "about-contact-h" : "home-contact-h"} className="scroll-mt-24 overflow-hidden rounded-2xl border bg-card shadow-sm">
    <div className="grid md:grid-cols-[0.85fr_1.5fr]">
      <div className="bg-navy p-6 text-navy-foreground sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-widest opacity-80">Get in Touch</p>
        <h2 id={context === "about" ? "about-contact-h" : "home-contact-h"} className="mt-3 text-3xl">Send me a message</h2>
        <p className="mt-4 leading-relaxed opacity-90">Have a question about airport transfers, private journeys or your visit to Israel? Tell me a little about your plans, and I’ll reply personally.</p>
      </div>
      <div className="p-5 sm:p-8">
        <form onSubmit={send} noValidate className="mt-6" aria-label={context === "about" ? "Contact me" : "Homepage contact message"} aria-busy={submission.isSending}>
          <fieldset disabled={submission.isSending} className="min-w-0 space-y-5">
          {error && <p role="alert" className="rounded-lg border border-destructive p-3 text-sm text-destructive">{error}</p>}
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="text-sm font-medium">Your name *<Input name="name" autoComplete="name" required maxLength={120} value={name} onChange={e => update(setName, e.target.value)} className="mt-2 h-11 bg-background" /></label>
            <label className="text-sm font-medium">Email address *<Input name="email" type="email" autoComplete="email" required maxLength={254} value={email} onChange={e => update(setEmail, e.target.value)} className="mt-2 h-11 bg-background" /></label>
          </div>
          <label className="block text-sm font-medium">Subject *<Input name="subject" required maxLength={160} value={subject} onChange={e => update(setSubject, e.target.value)} placeholder="What would you like to ask?" className="mt-2 h-11 bg-background" /></label>
          <label className="block text-sm font-medium">Your message *<Textarea name="message" required maxLength={4000} rows={5} value={message} onChange={e => update(setMessage, e.target.value)} placeholder={context === "about" ? "Tell me how I can help…" : "Tell me how I can help…"} className="mt-2 bg-background" /></label>
          <label className="flex items-start gap-3 text-sm leading-relaxed"><input type="checkbox" name="consent" checked={consent} onChange={e => { setConsent(e.target.checked); submission.reset(); }} required className="mt-1 size-4 shrink-0 accent-primary" /><span>I agree to share these details with Moshe Barak to respond to my enquiry. <PrivacyInformationLink />.</span></label>
          <QuoteSubmissionControls submission={submission} label="Send message" message />
          <p className="text-xs text-muted-foreground">All bookings require confirmation.</p>
          </fieldset>
        </form>
      </div>
    </div>
  </section>;
}
