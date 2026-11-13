import type { ReactNode } from "react";

/**
 * The shared guide introduction: readable title and copy on the left, a small
 * photo on the right on desktop. On phones and tablets the photo stacks below
 * the text, without narrowing the heading.
 */
export function GuideHeroLayout({ children, image }: { children: ReactNode; image?: ReactNode }) {
  return (
    <div
      className="guide-hero-layout mt-6 grid min-w-0 items-start gap-5 lg:grid-cols-[minmax(0,1.85fr)_minmax(0,0.9fr)] lg:gap-7"
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
  caption?: string;
  fit?: "cover" | "contain";
  srcSet?: string;
  sizes?: string;
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
