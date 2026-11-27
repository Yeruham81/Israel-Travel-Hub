import { stage5PhotoSrcSet } from "@/lib/stage5-photo-variants";
import { Clock3, ExternalLink, Star } from "lucide-react";
import { relFor } from "@/lib/outbound";

/**
 * Single visual contract for independently operated Viator / GetYourGuide tours.
 * Prices and review totals are editorial snapshots, never live inventory.
 * A missing field stays missing; the booking platform supplies current figures.
 */
export type ExternalTourPrice = {
  amount: number;
  currency?: "USD" | "EUR" | "ILS" | undefined;
  basis: "per_person" | "per_group" | "per_vehicle";
  maxPartySize?: number | undefined;
  approximate?: boolean | undefined;
};
export type ExternalTourRating = { value: number; count: number };
export type ExternalProviderTourCardProps = {
  image: string;
  alt: string;
  platform: string;
  title: string;
  description: string;
  duration?: string | undefined;
  location?: string | undefined;
  rating?: ExternalTourRating | undefined;
  price?: ExternalTourPrice | undefined;
  href: string;
  onClick?: (() => void) | undefined;
  affiliate?: boolean | undefined;
  note?: string | undefined;
  testId?: string | undefined;
  className?: string | undefined;
  omitMissingDetails?: boolean | undefined;
};

export function ExternalProviderTourCard({
  image,
  alt,
  platform,
  title,
  description,
  duration,
  location,
  rating,
  price,
  href,
  onClick,
  affiliate = true,
  note,
  testId,
  className = "",
  omitMissingDetails = false,
}: ExternalProviderTourCardProps) {
  const amount =
    price && Number.isFinite(price.amount) && price.amount >= 0
      ? new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(price.amount)
      : undefined;
  const currency = price?.currency === "EUR" ? "€" : price?.currency === "ILS" ? "₪" : "US$";
  const priceBasis =
    price?.basis === "per_person"
      ? "per person"
      : price?.basis === "per_vehicle"
        ? "per vehicle"
        : price?.maxPartySize
          ? `per group (up to ${price.maxPartySize})`
          : "per group";
  const validRating = rating && rating.value > 0 && rating.value <= 5 && rating.count >= 0;
  return (
    <article
      data-testid={testId}
      className={`group flex h-full min-w-0 flex-col overflow-hidden rounded-xl border bg-card shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/70 hover:shadow-md ${className}`}
    >
      <img
        src={image}
        srcSet={stage5PhotoSrcSet(image)}
        sizes="(min-width: 1024px) 340px, (min-width: 768px) 50vw, calc(100vw - 34px)"
        alt={alt}
        width={720}
        height={405}
        loading="lazy"
        decoding="async"
        className="aspect-[16/9] w-full object-cover"
      />
      <div className="flex min-w-0 flex-1 flex-col p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-primary">
          <span className="sr-only">Booking platform: </span>
          {platform}
        </p>
        <h3 className="mt-1.5 text-base font-semibold leading-snug text-foreground">{title}</h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-muted-foreground">
          {(duration || !omitMissingDetails) && (
            <span className="inline-flex items-center gap-1">
              <Clock3 size={14} aria-hidden="true" />
              {duration || "Duration on provider"}
            </span>
          )}
          {location && <span>{location}</span>}
          {(validRating || !omitMissingDetails) && (
            <span
              className="inline-flex items-center gap-1"
              aria-label={
                validRating
                  ? `Rated ${rating.value.toFixed(1)} out of 5 from ${rating.count} reviews`
                  : undefined
              }
            >
              {validRating ? (
                <>
                  <Star size={14} className="fill-amber-400 text-amber-500" aria-hidden="true" />
                  <strong className="text-foreground">{rating.value.toFixed(1)}</strong> (
                  {rating.count.toLocaleString("en-US")} reviews)
                </>
              ) : (
                "Check reviews on provider"
              )}
            </span>
          )}
        </div>
        {note && <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{note}</p>}
        <div className="mt-auto flex flex-wrap items-end justify-between gap-3 border-t pt-4 text-sm">
          <div>
            {amount !== undefined ? (
              <>
                <span className="block text-xs text-muted-foreground">
                  {price?.approximate ? "From approx. " : "From "}
                </span>
                <strong className="text-base text-foreground">
                  {currency}
                  {amount}
                </strong>
                <span className="block text-xs text-muted-foreground">{priceBasis}</span>
              </>
            ) : omitMissingDetails ? null : (
              <span className="text-xs font-medium text-muted-foreground">Check current price</span>
            )}
          </div>
          <a
            href={href}
            target="_blank"
            rel={relFor(affiliate)}
            onClick={onClick}
            className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            aria-label={`View tour: ${title} on ${platform} (opens in a new tab)`}
          >
            View tour <ExternalLink size={14} aria-hidden="true" />
          </a>
        </div>
      </div>
    </article>
  );
}
