import { useState } from "react";
import { ChevronLeft, ChevronRight, ExternalLink, Star } from "lucide-react";
import { customerTestimonials, tripadvisorProfileUrl, tripadvisorSnapshot } from "@/data/homeReviews";
import { TripadvisorReviewCarousel } from "@/components/TripadvisorReviewCarousel";

export function TripadvisorReviewsSection({ personal = false }: { personal?: boolean } = {}) {
  return <section aria-labelledby="reviews-h" className="mx-auto mt-8 max-w-6xl px-4 sm:mt-10">
    <div className="overflow-hidden rounded-2xl border bg-card shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3 px-4 pt-5 sm:px-6 sm:pt-6">
        <div className="min-w-0">
          <p className="eyebrow">{personal ? "From Travelers I've Helped" : "Real Traveler Experiences"}</p>
          <h2 id="reviews-h" className="mt-1 text-2xl leading-tight sm:text-[1.625rem]">{personal ? "What Travelers Say About Their Journeys" : "What Travelers Say"}</h2>
        </div>
        <a
          href={tripadvisorProfileUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={personal ? "Tripadvisor reviews of my transport service, rated five out of five" : "Tripadvisor reviews for Moshe Barak, rated five out of five"}
          className="inline-flex flex-wrap items-center gap-x-2 gap-y-1 rounded-lg border bg-background px-3 py-2 text-sm transition-colors hover:border-primary focus-visible:ring-2 focus-visible:ring-ring"
        >
          <img src="/images/tripadvisor.svg" alt="" width={20} height={20} loading="lazy" className="size-5" />
          <span className="font-semibold">Tripadvisor</span>
          <span className="flex items-center gap-0.5 text-[#00AA6C]" aria-hidden="true">
            {Array.from({ length: 5 }, (_, i) => <Star key={i} size={13} fill="currentColor" />)}
          </span>
          <span className="font-semibold tabular-nums">{tripadvisorSnapshot.rating.toFixed(1)} / 5</span>
          <ExternalLink size={13} className="text-muted-foreground" aria-hidden />
        </a>
      </div>
      <TripadvisorReviewCarousel />
      <div className="flex justify-center px-4 pb-4 sm:px-6">
        <a href={tripadvisorProfileUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-ring">
          {personal ? "Read all my Tripadvisor reviews" : "Read all Tripadvisor reviews"} <ExternalLink size={13} aria-hidden />
        </a>
      </div>
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
