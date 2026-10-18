import { useState } from "react";
import { ChevronLeft, ChevronRight, ExternalLink, Quote, Star } from "lucide-react";
import { customerTestimonials, tripadvisorProfileUrl, tripadvisorReviews, tripadvisorSnapshot } from "@/data/homeReviews";

export function HomeTestimonials() {
  const [active, setActive] = useState(0);
  const current = customerTestimonials[active]!;
  const change = (delta: number) => setActive(index => (index + delta + customerTestimonials.length) % customerTestimonials.length);
  return <section aria-labelledby="reviews-h" className="mx-auto mt-20 max-w-6xl px-4">
    <div className="overflow-hidden rounded-3xl border bg-card shadow-sm">
      <div className="bg-navy px-6 py-9 text-navy-foreground sm:px-10">
        <p className="text-xs font-semibold uppercase tracking-widest opacity-80">Real traveler experiences</p>
        <h2 id="reviews-h" className="mt-2 text-3xl sm:text-4xl">Kind words from people I've helped</h2>
        <div className="mt-7 flex flex-wrap items-center gap-4 rounded-2xl border border-white/20 bg-white/10 p-5">
          <a href={tripadvisorProfileUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-xl font-bold tracking-tight text-white" aria-label="Tripadvisor reviews for Moshe Barak">
            <img src="https://cdn.simpleicons.org/tripadvisor/34E0A1" alt="" width={36} height={36} loading="lazy" className="size-9" />
            Tripadvisor <ExternalLink size={15} aria-hidden />
          </a>
          <span className="flex items-center gap-1 text-[#34e0a1]" aria-label="Five out of five stars">
            {Array.from({length: 5},(_,i)=><Star key={i} size={20} fill="currentColor" aria-hidden />)}
          </span>
          <span className="text-2xl font-semibold tabular-nums">{tripadvisorSnapshot.rating.toFixed(1)} / 5</span>
        </div>
      </div>
      <div className="grid gap-4 px-6 py-8 md:grid-cols-3 sm:px-10" data-testid="tripadvisor-review-cards">
        {tripadvisorReviews.map((review)=><article key={review.author} className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 text-slate-950 shadow-sm">
          <div className="flex items-center justify-between gap-2">
            <div className="grid size-11 place-items-center rounded-full bg-emerald-100 font-semibold text-emerald-900" aria-hidden>{review.author.slice(0,1).toUpperCase()}</div>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800"><img src="https://cdn.simpleicons.org/tripadvisor/00AA6C" alt="" width={20} height={20} loading="lazy" className="size-5" />Tripadvisor</span>
          </div>
          <Quote size={20} className="mt-4 text-emerald-700" aria-hidden />
          <blockquote className="mt-3 flex-1 text-[1.05rem] leading-relaxed text-slate-950">“{review.excerpt}…”</blockquote>
          <div className="mt-5 border-t border-slate-200 pt-3"><p className="font-semibold text-slate-950">{review.author}</p><p className="text-xs text-slate-600">{review.period}</p></div>
          <a href={tripadvisorProfileUrl} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-emerald-800 underline underline-offset-4">See full review <ExternalLink size={13} aria-hidden /></a>
        </article>)}
      </div>
      <div className="px-6 pb-8 sm:px-10"><a href={tripadvisorProfileUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Explore all Tripadvisor reviews <ExternalLink size={16} aria-hidden /></a></div>
      <div className="border-t bg-secondary/30 px-6 py-9 sm:px-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div><p className="eyebrow">More stories from my travelers</p><h3 className="mt-2 text-2xl sm:text-3xl">Personal messages from past clients</h3></div>
          <div className="flex gap-2"><button type="button" onClick={()=>change(-1)} aria-label="Previous testimonial" className="grid size-11 place-items-center rounded-full border bg-background hover:border-primary"><ChevronLeft aria-hidden /></button><button type="button" onClick={()=>change(1)} aria-label="Next testimonial" className="grid size-11 place-items-center rounded-full border bg-background hover:border-primary"><ChevronRight aria-hidden /></button></div>
        </div>
        <div className="mt-6 grid gap-6 rounded-2xl border bg-card p-6 shadow-sm md:grid-cols-[160px_minmax(0,1fr)] md:items-center sm:p-8" data-testid="original-testimonial-carousel" aria-live="polite">
          <div className="mx-auto grid size-32 place-items-center rounded-full border-4 border-primary/20 bg-secondary font-serif text-4xl text-primary" aria-label={current.author + " initials"}>{current.initials}</div>
          <figure>
            <Quote size={27} className="text-primary" aria-hidden />
            <blockquote className="mt-3 whitespace-pre-line font-serif text-lg leading-relaxed sm:text-xl">“{current.quote}”</blockquote>
            <figcaption className="mt-5 font-semibold">{current.author}<span className="ml-2 font-normal text-muted-foreground">· {current.location}</span></figcaption>
          </figure>
        </div>
        <div className="mt-4 flex justify-center gap-2" aria-label="Choose testimonial">
          {customerTestimonials.map((person,i)=><button key={person.author} type="button" aria-label={"Show testimonial from "+person.author} aria-pressed={i===active} onClick={()=>setActive(i)} className={"h-2.5 rounded-full transition-all "+(i===active?"w-9 bg-primary":"w-2.5 bg-muted-foreground/40 hover:bg-primary/60")} />)}
        </div>
      </div>
    </div>
  </section>;
}
