import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

export type HeroSlide = {
  src: string;
  srcSm: string;
  srcMedium: string;
  alt: string;
  caption: string;
  pos?: string;
  width?: number;
  height?: number;
  highDensity?: boolean;
};

const INTERVAL = 6000;

type Waiter = { resolve: () => void; reject: () => void };

export function HeroCarousel({ slides, children }: { slides: HeroSlide[]; children: ReactNode }) {
  const [index, setIndex] = useState(0);
  const [reduced, setReduced] = useState(false);
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
    return () => {
      mq.removeEventListener("change", apply);
      document.removeEventListener("visibilitychange", vis);
    };
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
    if (i !== index)
      setMounted((prev) => {
        const s = new Set(prev);
        s.delete(i);
        return s;
      }); // allow a later retry
  };

  const running = !reduced && !hovered && !focused && !hidden;

  // Defer speculative loading of slide two until after the initial mobile
  // load window. Autoplay remains at six seconds and manual navigation can
  // still load an image on demand, showing the current slide until ready.
  // Other slide changes warm their next image sooner, but still off the
  // critical first-paint network path.
  useEffect(() => {
    const timeout = window.setTimeout(
      () => {
        ensure((index + 1) % n).catch(() => undefined);
      },
      index === 0 ? 4800 : 350,
    );
    return () => window.clearTimeout(timeout);
  }, [index, n, ensure]);

  /** Request a slide; the current photo/caption stay until the target is ready. Newest request wins. */
  const go = useCallback(
    (i: number) => {
      const target = ((i % n) + n) % n;
      const id = ++requestId.current;
      setTick((t) => t + 1);
      ensure(target).then(
        () => {
          if (id === requestId.current) setIndex(target);
        },
        () => {
          if (id === requestId.current) setTick((t) => t + 1);
        }, // keep current slide; re-arm timer
      );
    },
    [n, ensure],
  );

  useEffect(() => {
    if (!running) return;
    const t = window.setTimeout(() => go(index + 1), INTERVAL);
    return () => window.clearTimeout(t);
  }, [running, index, tick, n, go]);

  const fade = reduced ? "" : "transition-opacity duration-1000 ease-in-out";

  return (
    <div
      ref={rootRef}
      role="region"
      aria-roledescription="carousel"
      aria-label="Places in Israel"
      className="relative overflow-hidden bg-primary"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(e) => {
        if (!rootRef.current?.contains(e.relatedTarget as Node)) setFocused(false);
      }}
    >
      <div className="absolute inset-0">
        {slides.map((s, i) => (
          <div
            key={s.caption}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${n}: ${s.caption}`}
            aria-hidden={i !== index}
            className={`absolute inset-0 ${fade} ${i === index ? "opacity-100" : "opacity-0"}`}
          >
            {(mounted.has(i) || i === index) && (
              <picture className="absolute inset-0 block h-full w-full">
                <source media="(max-width: 767px)" srcSet={s.srcSm} />
                <source
                  media="(max-width: 1800px)"
                  srcSet={s.highDensity ? s.srcMedium + " 1x, " + s.src + " 2x" : s.srcMedium}
                />
                <img
                  src={s.src}
                  alt={s.alt}
                  width={s.width ?? 1920}
                  height={s.height ?? 872}
                  fetchPriority={i === 0 ? "high" : "auto"}
                  decoding="async"
                  onLoad={(e) => onImgLoad(i, e.currentTarget)}
                  onError={() => onImgError(i)}
                  className="absolute inset-0 h-full w-full object-cover"
                  style={{ objectPosition: s.pos ?? "center" }}
                />
              </picture>
            )}
          </div>
        ))}
      </div>
      <div
        className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-black/5 max-md:bg-gradient-to-t max-md:from-black/60 max-md:via-black/30 max-md:to-black/10"
        aria-hidden
      />
      <div className="relative mx-auto max-w-[90rem]">{children}</div>
      <div className="relative mx-auto mt-14 flex max-w-[90rem] flex-col items-center gap-1.5 px-4 pb-3 md:mt-20 md:px-8 md:pb-4">
        <p
          className="pointer-events-none w-full text-left text-xs font-medium leading-4 text-white/90 lg:absolute lg:bottom-4 lg:left-8 lg:w-auto lg:max-w-[calc(50%-150px)]"
          style={{ textShadow: "0 1px 3px rgba(0,0,0,0.95), 0 2px 8px rgba(0,0,0,0.75)" }}
          aria-live={running ? "off" : "polite"}
          aria-atomic="true"
        >
          {slides[index]?.caption}
        </p>
        <div
          className="flex items-center justify-center gap-0.5"
          role="group"
          aria-label="Choose a place"
        >
          {slides.map((s, i) => (
            <button
              key={s.caption}
              type="button"
              onClick={() => go(i)}
              aria-label={`Show ${s.caption}`}
              aria-current={i === index}
              className="grid h-7 w-7 place-items-center rounded-full focus-visible:outline-2 focus-visible:outline-white"
            >
              <span
                aria-hidden
                className={`block h-1.5 rounded-full bg-white/80 transition-all duration-200 md:h-2 ${i === index ? "w-3 opacity-90" : "w-1.5 opacity-45 md:w-2"}`}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
