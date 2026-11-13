import { useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";
import { tripadvisorProfileUrl, tripadvisorReviews } from "@/data/homeReviews";

const ROTATION_MS = 6000;
type TripadvisorReview = (typeof tripadvisorReviews)[number];

function ReviewCard({ review }: { review: TripadvisorReview }) {
  return (
    <article className="flex h-full flex-col rounded-xl border bg-background p-4 text-foreground">
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <span className="grid size-8 shrink-0 place-items-center rounded-full bg-secondary text-sm font-semibold text-foreground" aria-hidden>
            {review.author.slice(0, 1).toUpperCase()}
          </span>
          <div className="min-w-0">
            <p className="text-sm font-semibold leading-tight">{review.author}</p>
            <p className="text-xs text-muted-foreground">{review.period}</p>
          </div>
        </div>
        <span className="flex shrink-0 items-center gap-0.5" role="img" aria-label="5 out of 5 rating" data-testid="tripadvisor-rating-circles">
          {Array.from({ length: 5 }, (_, index) => (
            <span key={index} aria-hidden="true" className="size-2.5 rounded-full bg-[#00AA6C]" />
          ))}
        </span>
      </div>
      <blockquote cite={tripadvisorProfileUrl} className="mt-3 flex-1 text-[0.9375rem] leading-relaxed">“{review.excerpt}”</blockquote>
      <a href={tripadvisorProfileUrl} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1 self-start text-xs font-semibold text-primary underline-offset-4 hover:underline">
        Read on Tripadvisor <ExternalLink size={12} aria-hidden />
      </a>
    </article>
  );
}

/**
 * Three cards on desktop and one on mobile, with only compact selection dots.
 * Automatic rotation stops permanently after a dot is chosen, allowing visitors
 * to read their chosen review without an additional play/pause control.
 * It also pauses while focused, hovered or hidden and respects reduced motion.
 */
export function TripadvisorReviewCarousel() {
  const [index, setIndex] = useState(0);
  const [manuallySelected, setManuallySelected] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [visible, setVisible] = useState(true);
  const [interacting, setInteracting] = useState(false);
  const count = tripadvisorReviews.length;
  const rotating = !manuallySelected && !reducedMotion && visible && !interacting;

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(preference.matches);
    const updateVisibility = () => setVisible(document.visibilityState !== "hidden");
    updatePreference();
    updateVisibility();
    preference.addEventListener("change", updatePreference);
    document.addEventListener("visibilitychange", updateVisibility);
    return () => {
      preference.removeEventListener("change", updatePreference);
      document.removeEventListener("visibilitychange", updateVisibility);
    };
  }, []);

  useEffect(() => {
    if (!rotating || count < 2) return;
    const timer = window.setTimeout(() => setIndex(previous => (previous + 1) % count), ROTATION_MS);
    return () => window.clearTimeout(timer);
  }, [rotating, index, count]);

  return (
    <section role="region" aria-roledescription="carousel" aria-label="Tripadvisor traveler reviews"
      onMouseEnter={() => setInteracting(true)}
      onMouseLeave={() => setInteracting(false)}
      onFocusCapture={() => setInteracting(true)}
      onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget as Node)) setInteracting(false); }}
    >
      <div className="grid gap-3 px-4 pb-2 pt-4 md:grid-cols-3 sm:px-6" data-testid="tripadvisor-review-cards" aria-live={rotating ? "off" : "polite"}>
        {[0, 1, 2].map(slot => {
          const review = tripadvisorReviews[(index + slot) % count]!;
          return <div key={review.author} className={slot === 0 ? "h-full min-w-0" : "hidden h-full min-w-0 md:block"}>
            <ReviewCard review={review} />
          </div>;
        })}
      </div>
      <div className="flex justify-center gap-1 px-4 pb-2" role="group" aria-label="Choose a Tripadvisor review">
        {tripadvisorReviews.map((review, i) => (
          <button key={review.author} type="button"
            onClick={() => { setIndex(i); setManuallySelected(true); }}
            aria-label={"Show Tripadvisor review from " + review.author}
            aria-pressed={index === i}
            className="grid size-8 place-items-center rounded-full focus-visible:ring-2 focus-visible:ring-ring"
          >
            <span aria-hidden="true" className={"h-2.5 rounded-full transition-all " + (index === i ? "w-6 bg-primary" : "w-2.5 bg-muted-foreground/40 group-hover:bg-primary/60")} />
          </button>
        ))}
      </div>
    </section>
  );
}
