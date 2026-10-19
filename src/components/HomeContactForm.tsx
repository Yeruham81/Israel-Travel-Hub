import { useState, type FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { airportTransferContact } from "@/data/registry";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function HomeContactForm({ context = "homepage" }: { context?: "homepage" | "about" }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState("");
  const [prepared, setPrepared] = useState<{ url: string; body: string; subject: string } | null>(null);
  const [copyStatus, setCopyStatus] = useState("");
  function update(setter: (value: string) => void, value: string) { setter(value); setPrepared(null); setError(""); setCopyStatus(""); }
  function prepare(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!name.trim() || !emailPattern.test(email.trim()) || !subject.trim() || !message.trim() || !consent) {
      setError("Please enter your name, a valid email, a subject and a message, and agree to share these details.");
      setPrepared(null);
      return;
    }
    const mailSubject = "Israel Travel Hub enquiry: " + subject.trim();
    const body = "Name: " + name.trim() + "\nEmail: " + email.trim() + "\n\n" + message.trim();
    const url = "mailto:" + airportTransferContact.email + "?subject=" + encodeURIComponent(mailSubject) + "&body=" + encodeURIComponent(body);
    setPrepared({ url, subject: mailSubject, body });
    setError("");
  }
  async function copyDraft() {
    if (!prepared) return;
    try { await navigator.clipboard.writeText(prepared.subject + "\n\n" + prepared.body); setCopyStatus("Message copied."); }
    catch { setCopyStatus("Copy the message from the preview below."); }
  }
  return <section id="contact" aria-labelledby={context === "about" ? "about-contact-h" : "home-contact-h"} className="scroll-mt-24 overflow-hidden rounded-2xl border bg-card shadow-sm">
    <div className="grid md:grid-cols-[0.85fr_1.5fr]">
      <div className="bg-navy p-6 text-navy-foreground sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-widest opacity-80">Get in Touch</p>
        <h2 id={context === "about" ? "about-contact-h" : "home-contact-h"} className="mt-3 text-3xl">Send Moshe a Message</h2>
        <p className="mt-4 leading-relaxed opacity-90">Questions about airport transfers, private journeys or planning your visit to Israel? Share a few details and Moshe Barak can reply personally.</p>
        <p className="mt-6 text-sm opacity-85">For travel enquiries and private-transport requests. A message is not a confirmed booking.</p>
      </div>
      <div className="p-5 sm:p-8">
        <p className="text-sm text-muted-foreground">Complete the form to prepare an email. Review and send it from your email app. Nothing is transmitted until you send it.</p>
        <form onSubmit={prepare} noValidate className="mt-6 space-y-5" aria-label={context === "about" ? "Contact Moshe Barak" : "Homepage contact message"}>
          {error && <p role="alert" className="rounded-lg border border-destructive p-3 text-sm text-destructive">{error}</p>}
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="text-sm font-medium">Your name *<Input name="name" autoComplete="name" required maxLength={120} value={name} onChange={e => update(setName, e.target.value)} className="mt-2 h-11 bg-background" /></label>
            <label className="text-sm font-medium">Email address *<Input name="email" type="email" autoComplete="email" required maxLength={254} value={email} onChange={e => update(setEmail, e.target.value)} className="mt-2 h-11 bg-background" /></label>
          </div>
          <label className="block text-sm font-medium">Subject *<Input name="subject" required maxLength={160} value={subject} onChange={e => update(setSubject, e.target.value)} placeholder="What would you like to ask?" className="mt-2 h-11 bg-background" /></label>
          <label className="block text-sm font-medium">Your message *<Textarea name="message" required maxLength={4000} rows={5} value={message} onChange={e => update(setMessage, e.target.value)} placeholder="Tell us how we can help…" className="mt-2 bg-background" /></label>
          <label className="flex items-start gap-3 text-sm leading-relaxed"><input type="checkbox" name="consent" checked={consent} onChange={e => { setConsent(e.target.checked); setPrepared(null); }} required className="mt-1 size-4 shrink-0 accent-primary" /><span>I agree to share these details with Moshe Barak to respond to my enquiry. <a href={airportTransferContact.privacyUrl} target="_blank" rel="noopener noreferrer" className="underline">Privacy policy</a>.</span></label>
          <button className="btn btn-primary" type="submit">Prepare my message</button>
          <p className="text-xs text-muted-foreground">Preparing a message does not send it. You must open your email app and press Send.</p>
        </form>
        {prepared && <div role="status" className="mt-6 rounded-xl border border-primary/30 bg-secondary/50 p-5">
          <h3 className="text-xl">Your Message Is Ready</h3>
          <p className="mt-2 text-sm">Send it to {airportTransferContact.email} from your email app.</p>
          <div className="mt-4 flex flex-wrap gap-3"><a className="btn btn-primary" href={prepared.url}>Open email app</a><button type="button" onClick={copyDraft} className="btn btn-outline">Copy message</button></div>
          {copyStatus && <p className="mt-3 text-sm">{copyStatus}</p>}
          <details className="mt-4"><summary className="cursor-pointer text-sm font-semibold">Review prepared message</summary><Textarea aria-label="Prepared message" readOnly rows={8} value={prepared.subject + "\n\n" + prepared.body} className="mt-3 bg-background" /></details>
        </div>}
      </div>
    </div>
  </section>;
}
