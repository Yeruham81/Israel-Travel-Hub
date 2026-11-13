import { useLayoutEffect, useRef, type ReactNode } from "react";

export function introFitsFourLines(height: number, lineHeight: number): boolean {
  return Number.isFinite(height) && height > 0 &&
    Number.isFinite(lineHeight) && lineHeight > 0 &&
    height <= lineHeight * 4 + 1;
}

/**
 * The shared guide introduction: readable title and copy on the left, a small
 * photo on the right on desktop. On phones and tablets the photo stacks below
 * the text, without narrowing the heading.
 */
export function GuideHeroLayout({ children, image }: { children: ReactNode; image?: ReactNode }) {
  const layoutRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const layout = layoutRef.current;
    const intro = layout?.querySelector<HTMLElement>("[data-guide-intro]");
    if (!layout || !image || !intro) return;

    // A slightly wider photo is allowed only when the COMPLETE introduction
    // still fits into four lines. Do not truncate the text to make it fit.
    const measure = () => {
      const desktop = window.matchMedia?.("(min-width: 1024px)").matches ?? window.innerWidth >= 1024;
      if (!desktop) {
        layout.classList.remove("guide-hero-photo-expanded");
        return;
      }
      layout.classList.add("guide-hero-photo-expanded");
      const lineHeight = Number.parseFloat(window.getComputedStyle(intro).lineHeight);
      const introHeight = intro.getBoundingClientRect().height;
      layout.classList.toggle(
        "guide-hero-photo-expanded",
        introFitsFourLines(introHeight, lineHeight),
      );
    };

    measure();
    let lastWidth = -1;
    const observer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(([entry]) => {
      const width = entry?.contentRect.width ?? 0;
      if (Math.abs(width - lastWidth) < 1) return;
      lastWidth = width;
      measure();
    });
    observer?.observe(layout);
    window.addEventListener("resize", measure);
    let mounted = true;
    document.fonts?.ready.then(() => { if (mounted) measure(); });
    return () => {
      mounted = false;
      observer?.disconnect();
      window.removeEventListener("resize", measure);
      layout.classList.remove("guide-hero-photo-expanded");
    };
  });

  return (
    <div
      ref={layoutRef}
      className={`guide-hero-layout mt-6 grid min-w-0 items-start gap-5 ${image ? "lg:grid-cols-[minmax(0,1.85fr)_minmax(0,0.9fr)] lg:gap-7" : ""}`}
      data-testid="guide-hero-layout"
    >
      <div className="min-w-0">{children}</div>
      {image && <div className="min-w-0">{image}</div>}
    </div>
  );
}

/**
 * Shared small editorial cover photo.
 * Maintain a predictable height across guides rather than using large,
 * full-page image banners. Contain is used for significant landmark details.
 */
export function GuideHeroMedia({
  src,
  alt,
  children,
  caption,
  fit = "cover",
  srcSet,
  sizes,
  width = 1200,
  height = 675,
}: {
  src: string;
  alt: string;
  children?: ReactNode;
  caption?: string | undefined;
  fit?: "cover" | "contain";
  srcSet?: string | undefined;
  sizes?: string | undefined;
  width?: number;
  height?: number;
}) {
  return (
    <figure className="w-full max-w-2xl lg:max-w-none" data-testid="guide-hero-media">
      <img
        src={src}
        srcSet={srcSet}
        sizes={sizes}
        alt={alt}
        width={width}
        height={height}
        fetchPriority="high"
        decoding="async"
        className={`block aspect-[16/9] max-h-[300px] w-full rounded-2xl lg:aspect-[4/3] lg:max-h-[260px] ${fit === "contain" ? "bg-secondary/30 object-contain" : "object-cover"}`}
      />
      {caption && <figcaption className="mt-2 text-xs leading-relaxed text-muted-foreground">{caption}</figcaption>}
      {children}
    </figure>
  );
}
