import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

export type HeroSlide = { src: string; srcSm: string; alt: string; caption: string; pos?: string };

const INTERVAL = 6000;

/** Fetch + decode the variant the <picture> would pick, so switching never shows an empty frame. */
function loadSlide(s: HeroSlide): Promise<void> {
  const url = window.matchMedia("(max-width: 767px)").matches ? s.srcSm : s.src;
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.decoding = "async";
    img.onload = () => { (img.decode ? img.decode().catch(() => undefined) : Promise.resolve()).then(() => resolve()); };
    img.onerror = () => reject(new Error("image failed"));
    img.src = url;
  });
}

export function HeroCarousel({ slides, children }: { slides: HeroSlide[]; children: ReactNode }) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true); // user intent
  const [reduced, setReduced] = useState(false);
  const [userChosePlay, setUserChosePlay] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [hidden, setHidden] = useState(false);
  // Slides whose image has loaded and decoded (slide 0 is rendered by the browser directly).
  const [ready, setReady] = useState<Set<number>>(() => new Set([0]));
  const [tick, setTick] = useState(0); // resets timer on navigation attempts
  const rootRef = useRef<HTMLDivElement>(null);
  const readyRef = useRef(ready);
  readyRef.current = ready;
  const requestId = useRef(0);
  const inflight = useRef(new Map<number, Promise<void>>());
  const n = slides.length;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    const vis = () => setHidden(document.visibilityState === "hidden");
    vis();
    document.addEventListener("visibilitychange", vis);
    return () => { mq.removeEventListener("change", apply); document.removeEventListener("visibilitychange", vis); };
  }, []);

  const ensure = useCallback((i: number): Promise<void> => {
    if (readyRef.current.has(i)) return Promise.resolve();
    let p = inflight.current.get(i);
    if (!p) {
      const slide = slides[i];
      if (!slide) return Promise.reject(new Error("no slide"));
      p = loadSlide(slide).then(
        () => { inflight.current.delete(i); setReady((prev) => (prev.has(i) ? prev : new Set(prev).add(i))); },
        (e) => { inflight.current.delete(i); throw e; },
      );
      inflight.current.set(i, p);
    }
    return p;
  }, [slides]);

  const autoplayOn = playing && (!reduced || userChosePlay);
  const running = autoplayOn && !hovered && !focused && !hidden;

  // Prefetch one slide ahead of the visible one.
  useEffect(() => { ensure((index + 1) % n).catch(() => undefined); }, [index, n, ensure]);

  /** Request a slide; the current photo/caption stay until the target is ready. Newest request wins. */
  const go = useCallback((i: number) => {
    const target = ((i % n) + n) % n;
    const id = ++requestId.current;
    setTick((t) => t + 1);
    ensure(target).then(
      () => { if (id === requestId.current) setIndex(target); },
      () => { if (id === requestId.current) setTick((t) => t + 1); }, // keep current slide; re-arm timer
    );
  }, [n, ensure]);

  useEffect(() => {
    if (!running) return;
    const t = window.setTimeout(() => go(index + 1), INTERVAL);
    return () => window.clearTimeout(t);
  }, [running, index, tick, n, go]);

  const togglePlay = () => {
    if (autoplayOn) setPlaying(false);
    else { setPlaying(true); if (reduced) setUserChosePlay(true); setTick((t) => t + 1); }
  };

  const fade = reduced && !userChosePlay ? "" : "transition-opacity duration-1000 ease-in-out";
  const btn = "grid h-9 w-9 place-items-center rounded-full bg-navy/70 text-navy-foreground hover:bg-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-foreground";

  return (
    <div
      ref={rootRef}
      role="region"
      aria-roledescription="carousel"
      aria-label="Places in Israel"
      className="relative overflow-hidden rounded-3xl bg-navy"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(e) => { if (!rootRef.current?.contains(e.relatedTarget as Node)) setFocused(false); }}
    >
      <div className="absolute inset-0">
        {slides.map((s, i) => (
          <div key={s.caption} role="group" aria-roledescription="slide" aria-label={`${i + 1} of ${n}: ${s.caption}`} aria-hidden={i !== index} className={`absolute inset-0 ${fade} ${i === index ? "opacity-100" : "opacity-0"}`}>
            {(ready.has(i) || i === index) && (
              <picture>
                <source media="(max-width: 767px)" srcSet={s.srcSm} />
                <img src={s.src} alt={s.alt} width={1920} height={872} fetchPriority={i === 0 ? "high" : "auto"} loading={i === 0 ? "eager" : "lazy"} decoding="async" className="h-full w-full object-cover" style={{ objectPosition: s.pos ?? "center" }} />
              </picture>
            )}
          </div>
        ))}
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/60 to-navy/10 max-md:bg-gradient-to-t max-md:from-navy/95 max-md:via-navy/65 max-md:to-navy/25" aria-hidden />
      <div className="relative">{children}</div>
      <div className="relative flex flex-wrap items-center justify-between gap-3 px-6 pb-14 md:px-12 md:pb-16">
        <p className="min-w-0 text-sm font-medium text-navy-foreground/90" aria-live={autoplayOn ? "off" : "polite"}>
          {slides[index]?.caption}
        </p>
        <div className="flex shrink-0 items-center gap-2">
          <button type="button" className={btn} onClick={() => go(index - 1)} aria-label="Previous place">‹</button>
          <div className="flex items-center gap-1" role="group" aria-label="Choose a place">
            {slides.map((s, i) => (
              <button key={s.caption} type="button" onClick={() => go(i)} aria-label={`Show ${s.caption}`} aria-current={i === index} className="grid h-7 w-5 place-items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-foreground rounded">
                <span className={`block h-2 rounded-full bg-navy-foreground transition-all ${i === index ? "w-5" : "w-2 opacity-50"}`} />
              </button>
            ))}
          </div>
          <button type="button" className={btn} onClick={() => go(index + 1)} aria-label="Next place">›</button>
          <button type="button" className={btn} onClick={togglePlay} aria-label={autoplayOn ? "Pause slideshow" : "Play slideshow"} aria-pressed={!autoplayOn}>
            {autoplayOn ? "❚❚" : "▶"}
          </button>
        </div>
      </div>
    </div>
  );
}
