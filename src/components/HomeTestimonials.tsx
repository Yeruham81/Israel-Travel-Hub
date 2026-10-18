import { ExternalLink, Quote } from "lucide-react";
import { reviewHighlights, tripadvisorProfileUrl, originalTestimonialsUrl } from "@/data/homeReviews";

export function HomeTestimonials() {
  return (
    <section aria-labelledby="reviews-h" className="mx-auto mt-20 max-w-6xl px-4">
      <div className="rounded-2xl border bg-card p-5 sm:p-8">
        <p className="eyebrow">Travelers' experiences</p>
        <h2 id="reviews-h" className="mt-2 text-3xl md:text-4xl">What clients say about Moshe</h2>
        <p className="mt-3 max-w-3xl leading-relaxed text-muted-foreground">These comments concern Moshe Barak's own private transport and day-trip services, not the other hotels, tour operators or travel providers on this site. The notes below are one-time editorial summaries of reviews, not verbatim testimonials or a live feed.</p>
        <h3 className="mt-9 border-t pt-6 text-2xl">On Tripadvisor</h3>
        <div className="mt-5 grid gap-4 md:grid-cols-3" data-testid="tripadvisor-review-cards">
          {reviewHighlights.filter(r => r.source === "Tripadvisor").map(r => <article key={r.author} className="flex flex-col rounded-xl border bg-background p-5"><Quote size={22} aria-hidden className="text-primary"/><p className="mt-3 flex-1 leading-relaxed">{r.summary}</p><p className="mt-5 border-t pt-3 text-sm font-semibold">{r.author} <span className="font-normal text-muted-foreground">· {r.period}</span></p><a href={tripadvisorProfileUrl} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary underline">Read reviews on Tripadvisor <ExternalLink size={13} aria-hidden/></a></article>)}
        </div>
        <a href={tripadvisorProfileUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-5">See all reviews on Tripadvisor <ExternalLink size={16} aria-hidden/></a>
        <h3 className="mt-10 border-t pt-7 text-2xl">Messages from previous customers</h3>
        <p className="mt-2 text-sm text-muted-foreground">Summaries of customer messages previously published by Israel Taxi Service.</p>
        <div className="mt-5 grid gap-4 md:grid-cols-3" data-testid="original-testimonial-cards">
          {reviewHighlights.filter(r => r.source === "Israel Taxi Service").map(r => <article key={r.author} className="flex flex-col rounded-xl bg-secondary/50 p-5"><Quote size={22} aria-hidden className="text-primary"/><p className="mt-3 flex-1 leading-relaxed">{r.summary}</p><p className="mt-5 border-t pt-3 text-sm font-semibold">{r.author} <span className="font-normal text-muted-foreground">· {r.period}</span></p></article>)}
        </div>
        <a href={originalTestimonialsUrl} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary underline">Visit the original Israel Taxi Service website <ExternalLink size={13} aria-hidden/></a>
      </div>
    </section>
  );
}
