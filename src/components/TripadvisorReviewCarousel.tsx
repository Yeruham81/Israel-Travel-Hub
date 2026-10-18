import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, ExternalLink, Pause, Play } from "lucide-react";
import { tripadvisorProfileUrl, tripadvisorReviews } from "@/data/homeReviews";

const ROTATION_MS = 6000;
type TripadvisorReview = (typeof tripadvisorReviews)[number];

function ReviewCard({ review }: { review: TripadvisorReview }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 text-slate-950 shadow-sm">
      <div className="flex items-center justify-between gap-2">
        <div className="grid size-11 place-items-center rounded-full bg-emerald-100 font-semibold text-emerald-900" aria-hidden>
          {review.author.slice(0, 1).toUpperCase()}
        </div>
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800">
          <img src="https://cdn.simpleicons.org/tripadvisor/00AA6C" alt="" width={20} height={20} loading="lazy" className="size-5" />
          Tripadvisor
        </span>
      </div>
      <div className="mt-4 flex items-center gap-1" role="img" aria-label="5 out of 5 rating" data-testid="tripadvisor-rating-circles">
        {Array.from({ length: 5 }, (_, index) => (
          <span key={index} aria-hidden="true" className="size-5 rounded-full border-2 border-white bg-[#00AA6C] shadow-[0_0_0_1px_#00AA6C]" />
        ))}
      </div>
      <blockquote cite={tripadvisorProfileUrl} className="mt-3 flex-1 text-[1.05rem] leading-relaxed text-slate-950">“{review.excerpt}”</blockquote>
      <div className="mt-5 border-t border-slate-200 pt-3">
        <p className="font-semibold text-slate-950">{review.author}</p>
        <p className="text-xs text-slate-600">{review.period}</p>
      </div>
      <a href={tripadvisorProfileUrl} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-emerald-800 underline underline-offset-4">
        See full review <ExternalLink size={13} aria-hidden />
      </a>
    </article>
  );
}

/**
 * The three-up review gallery changes one review every six seconds. On mobile
 * only the first card is visible. Do not rotate while the user is reading or
 * interacting; respect reduced-motion and document visibility.
 */
export function TripadvisorReviewCarousel() {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [explicitPlay, setExplicitPlay] = useState(false);
  const [visible, setVisible] = useState(true);
  const [interacting, setInteracting] = useState(false);
  const count = tripadvisorReviews.length;
  const rotate = (delta: number) => setIndex(previous => (previous + delta + count) % count);
  const motionAllowed = !reducedMotion || explicitPlay;
  const rotating = playing && motionAllowed && visible && !interacting;

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

  const togglePlay = () => {
    if (playing && motionAllowed) setPlaying(false);
    else { setPlaying(true); setExplicitPlay(true); }
  };

  return (
    <section role="region" aria-roledescription="carousel" aria-label="Tripadvisor traveler reviews"
      onMouseEnter={() => setInteracting(true)}
      onMouseLeave={() => setInteracting(false)}
      onFocusCapture={() => setInteracting(true)}
      onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget as Node)) setInteracting(false); }}
    >
      <div className="grid gap-4 px-6 py-8 md:grid-cols-3 sm:px-10" data-testid="tripadvisor-review-cards" aria-live={rotating ? "off" : "polite"}>
        {[0, 1, 2].map(slot => {
          const review = tripadvisorReviews[(index + slot) % count]!;
          return <div key={review.author} className={slot === 0 ? "h-full min-w-0" : "hidden h-full min-w-0 md:block"}>
            <ReviewCard review={review} />
          </div>;
        })}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 px-6 pb-5 sm:px-10">
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => rotate(-1)} aria-label="Previous Tripadvisor reviews" className="grid size-10 place-items-center rounded-full border bg-background hover:border-primary focus-visible:ring-2 focus-visible:ring-ring">
            <ChevronLeft size={18} aria-hidden />
          </button>
          <button type="button" onClick={() => rotate(1)} aria-label="Next Tripadvisor reviews" className="grid size-10 place-items-center rounded-full border bg-background hover:border-primary focus-visible:ring-2 focus-visible:ring-ring">
            <ChevronRight size={18} aria-hidden />
          </button>
          <button type="button" onClick={togglePlay} aria-label={playing && motionAllowed ? "Pause Tripadvisor reviews" : "Play Tripadvisor reviews"}
            className="grid size-10 place-items-center rounded-full border bg-background hover:border-primary focus-visible:ring-2 focus-visible:ring-ring">
            {playing && motionAllowed ? <Pause size={17} aria-hidden /> : <Play size={17} aria-hidden />}
          </button>
        </div>
        <div className="flex items-center gap-1" role="group" aria-label="Choose a Tripadvisor review">
          {tripadvisorReviews.map((review, i) => (
            <button key={review.author} type="button" onClick={() => setIndex(i)}
              aria-label={"Show Tripadvisor review from " + review.author} aria-pressed={index === i}
              className="grid size-7 place-items-center rounded-full focus-visible:ring-2 focus-visible:ring-ring">
              <span className={"h-2.5 rounded-full transition-all " + (index === i ? "w-6 bg-[#00AA6C]" : "w-2.5 bg-slate-300 hover:bg-emerald-500")} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
