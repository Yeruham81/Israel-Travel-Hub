import type { ReactNode } from "react";

/**
 * Shared editorial cover image for travel, transport, destination and stay guides.
 * A consistent 16:9 frame is capped in height so the first useful section
 * remains near the top of the page. Use contain for landmarks whose whole
 * composition must be visible rather than cropping them.
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
    <figure className="mt-7 w-full max-w-4xl" data-testid="guide-hero-media">
      <img
        src={src}
        srcSet={srcSet}
        sizes={sizes}
        alt={alt}
        width={width}
        height={height}
        fetchPriority="high"
        decoding="async"
        className={`block aspect-[16/9] max-h-[360px] w-full rounded-2xl ${fit === "contain" ? "bg-secondary/30 object-contain" : "object-cover"}`}
      />
      {caption && <figcaption className="mt-2 text-xs leading-relaxed text-muted-foreground">{caption}</figcaption>}
      {children}
    </figure>
  );
}
