import { useState } from "react";
import { ChevronLeft, ChevronRight, ExternalLink, Star } from "lucide-react";
import { customerTestimonials, tripadvisorProfileUrl, tripadvisorSnapshot } from "@/data/homeReviews";
import { TripadvisorReviewCarousel } from "@/components/TripadvisorReviewCarousel";

export function TripadvisorReviewsSection() {
  return <section aria-labelledby="reviews-h" className="mx-auto mt-16 max-w-6xl px-4">
    <div className="overflow-hidden rounded-3xl border bg-card shadow-sm">
      <div className="bg-navy px-6 py-9 text-navy-foreground sm:px-10">
        <p className="text-xs font-semibold uppercase tracking-widest opacity-80">Real Traveler Experiences</p>
        <h2 id="reviews-h" className="mt-2 text-3xl sm:text-4xl">Kind Words from Satisfied Travelers</h2>
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
      <TripadvisorReviewCarousel />
      <div className="flex justify-center px-6 pb-8 sm:px-10"><a href={tripadvisorProfileUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Explore all Tripadvisor reviews <ExternalLink size={16} aria-hidden /></a></div>
    </div>
  </section>;
}

export function PersonalTestimonialsSection() {
  const [active, setActive] = useState(0);
  const current = customerTestimonials[active]!;
  const change = (delta: number) => setActive(index => (index + delta + customerTestimonials.length) % customerTestimonials.length);
  return <section aria-labelledby="personal-reviews-h" className="mx-auto mt-20 max-w-6xl px-4">
    <div className="overflow-hidden rounded-3xl border bg-card shadow-sm">
      <div className="bg-secondary/30 px-6 py-9 sm:px-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div><p className="eyebrow">More Stories from My Travelers</p><h2 id="personal-reviews-h" className="mt-2 text-2xl sm:text-3xl">Personal Messages from Past Clients</h2></div>
          <div className="flex gap-2"><button type="button" onClick={()=>change(-1)} aria-label="Previous testimonial" className="grid size-11 place-items-center rounded-full border bg-background hover:border-primary"><ChevronLeft aria-hidden /></button><button type="button" onClick={()=>change(1)} aria-label="Next testimonial" className="grid size-11 place-items-center rounded-full border bg-background hover:border-primary"><ChevronRight aria-hidden /></button></div>
        </div>
        <div className="mt-6 grid gap-6 rounded-2xl border bg-card p-6 shadow-sm md:grid-cols-[minmax(150px,220px)_minmax(0,1fr)] md:items-center sm:p-8" data-testid="original-testimonial-carousel" aria-live="polite">
          <img src={current.photo} alt={"Photo featured alongside the testimonial from " + current.author} width={440} height={330} loading="lazy" decoding="async" className="mx-auto aspect-[4/3] w-full max-w-[220px] rounded-2xl border border-border object-cover shadow-md" />
          <figure>
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

/** Kept as a composed convenience component for other consumers. */
export function HomeTestimonials() {
  return <><TripadvisorReviewsSection /><PersonalTestimonialsSection /></>;
}
