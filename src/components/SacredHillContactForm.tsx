import { useState, type FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PrivacyInformationLink } from "@/components/PrivacyInformationLink";
import { QuoteSubmissionControls } from "@/components/QuoteSubmissionControls";
import { useQuoteSubmission } from "@/hooks/useQuoteSubmission";
import { validateContactMessage } from "@/lib/contact-message";
import type { SacredHillId } from "@/data/sacredHillGuides";

/** Exactly the same direct, consent-gated contact delivery used on the homepage.
 * Source page/path are attached by useQuoteSubmission. No third-party form embed.
 */
export function SacredHillContactForm({ id }: { id: SacredHillId }) {
  const subject = id === "mount-zion" ? "Mount Zion visit" : "Mount of Olives visit";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState(subject);
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const submission = useQuoteSubmission();

  function change(setter: (value: string) => void, value: string) {
    setter(value);
    setErrors([]);
    submission.reset();
  }

  async function send(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const fields = { name, email, subject: topic, message, consent };
    const validation = validateContactMessage(fields);
    setErrors(validation);
    if (validation.length) { submission.reset(); return; }
    await submission.submit({ kind: "contact", fields });
  }

  return <section id="contact-moshe" aria-labelledby="sacred-hill-contact-heading" className="mt-12 scroll-mt-24 overflow-hidden rounded-2xl border bg-card shadow-sm">
    <div className="grid md:grid-cols-[0.85fr_1.4fr]">
      <div className="bg-navy p-6 text-navy-foreground sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-widest opacity-80">Plan a Jerusalem visit</p>
        <h2 id="sacred-hill-contact-heading" className="mt-3 text-2xl leading-tight sm:text-3xl">Send me a message</h2>
        <p className="mt-3 leading-relaxed opacity-90">Thinking about including {id === "mount-zion" ? "Mount Zion" : "the Mount of Olives"} in your Jerusalem day? Tell me when you are visiting, where you are staying and which places interest you. I'll reply personally and help with transport arrangements or a practical itinerary.</p>
        <p className="mt-4 text-sm leading-relaxed opacity-85">You can ask a question before deciding on a route. The message form is not an automatic booking.</p>
      </div>
      <div className="p-5 sm:p-7">
        <form onSubmit={send} noValidate aria-label={`Message Moshe about ${id === "mount-zion" ? "Mount Zion" : "the Mount of Olives"}`} aria-busy={submission.isSending}>
          <fieldset disabled={submission.isSending} className="min-w-0 space-y-4">
            {errors.length > 0 && <div role="alert" className="rounded-lg border border-destructive p-3 text-sm text-destructive"><p className="font-semibold">Please check your message:</p><ul className="mt-1 list-disc pl-5">{errors.map(e => <li key={e}>{e}</li>)}</ul></div>}
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="text-sm font-medium">Your name *<Input name="name" required autoComplete="name" maxLength={120} value={name} onChange={e => change(setName, e.target.value)} className="mt-2 h-11 bg-background" /></label>
              <label className="text-sm font-medium">Email address *<Input name="email" type="email" autoComplete="email" required maxLength={254} value={email} onChange={e => change(setEmail, e.target.value)} className="mt-2 h-11 bg-background" /></label>
            </div>
            <label className="block text-sm font-medium">Subject *<Input name="subject" required maxLength={160} value={topic} onChange={e => change(setTopic, e.target.value)} className="mt-2 h-11 bg-background" /></label>
            <label className="block text-sm font-medium">Your message *<Textarea name="message" required maxLength={4000} rows={5} value={message} onChange={e => change(setMessage, e.target.value)} placeholder="Travel date, group size, pickup area, sites you want to visit, or anything you'd like to ask…" className="mt-2 bg-background" /></label>
            <label className="flex items-start gap-3 text-sm leading-relaxed"><input type="checkbox" name="consent" checked={consent} onChange={e => { setConsent(e.target.checked); setErrors([]); submission.reset(); }} className="mt-1 size-4 shrink-0 accent-primary" required /><span>I agree to share these details with Moshe Barak so he can respond to my enquiry. <PrivacyInformationLink />.</span></label>
            <QuoteSubmissionControls submission={submission} label="Send message" message />
          </fieldset>
        </form>
      </div>
    </div>
  </section>;
}
