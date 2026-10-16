import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

export type HeroSlide = { src: string; srcSm: string; alt: string; caption: string; pos?: string };

const INTERVAL = 6000;

type Waiter = { resolve: () => void; reject: () => void };

export function HeroCarousel({ slides, children }: { slides: HeroSlide[]; children: ReactNode }) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true); // user intent
  const [reduced, setReduced] = useState(false);
  const [userChosePlay, setUserChosePlay] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [hidden, setHidden] = useState(false);
  // Slides whose <img> has been requested (mounted, hidden until shown). Accumulates; cached photos stay mounted.
  const [mounted, setMounted] = useState<Set<number>>(() => new Set([0]));
  const [tick, setTick] = useState(0); // resets timer on navigation attempts
  const rootRef = useRef<HTMLDivElement>(null);
  // Slides whose mounted <img> has actually loaded and decoded. Slide 0 is the server-rendered first frame.
  const ready = useRef(new Set<number>([0]));
  const waiters = useRef(new Map<number, Waiter[]>());
  const requestId = useRef(0);
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

  /** Resolves once slide i's displayed image is loaded + decoded; rejects if it fails. */
  const ensure = useCallback((i: number): Promise<void> => {
    if (ready.current.has(i)) return Promise.resolve();
    return new Promise<void>((resolve, reject) => {
      const list = waiters.current.get(i) ?? [];
      list.push({ resolve, reject });
      waiters.current.set(i, list);
      setMounted((prev) => (prev.has(i) ? prev : new Set(prev).add(i)));
    });
  }, []);

  const onImgLoad = (i: number, img: HTMLImageElement) => {
    (img.decode ? img.decode().catch(() => undefined) : Promise.resolve()).then(() => {
      ready.current.add(i);
      waiters.current.get(i)?.forEach((w) => w.resolve());
      waiters.current.delete(i);
    });
  };
  const onImgError = (i: number) => {
    waiters.current.get(i)?.forEach((w) => w.reject());
    waiters.current.delete(i);
    if (i !== index) setMounted((prev) => { const s = new Set(prev); s.delete(i); return s; }); // allow a later retry
  };

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
      className="relative overflow-hidden bg-navy"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(e) => { if (!rootRef.current?.contains(e.relatedTarget as Node)) setFocused(false); }}
    >
      <div className="absolute inset-0">
        {slides.map((s, i) => (
          <div key={s.caption} role="group" aria-roledescription="slide" aria-label={`${i + 1} of ${n}: ${s.caption}`} aria-hidden={i !== index} className={`absolute inset-0 ${fade} ${i === index ? "opacity-100" : "opacity-0"}`}>
            {(mounted.has(i) || i === index) && (
              <picture>
                <source media="(max-width: 767px)" srcSet={s.srcSm} />
                <img src={s.src} alt={s.alt} width={1920} height={872} fetchPriority={i === 0 ? "high" : "auto"} decoding="async" onLoad={(e) => onImgLoad(i, e.currentTarget)} onError={() => onImgError(i)} className="h-full w-full object-cover" style={{ objectPosition: s.pos ?? "center" }} />
              </picture>
            )}
          </div>
        ))}
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/60 to-navy/10 max-md:bg-gradient-to-t max-md:from-navy/95 max-md:via-navy/65 max-md:to-navy/25" aria-hidden />
      <div className="relative mx-auto max-w-[90rem]">{children}</div>
      <div className="relative mx-auto flex max-w-[90rem] flex-wrap items-center justify-between gap-3 px-6 pb-14 md:px-12 md:pb-16">
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
