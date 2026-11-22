import { Clock3, ExternalLink, Star } from "lucide-react";
import { tourBookingOffers, tourProducts } from "@/data/registry";
import { recordOutboundClick, relFor } from "@/lib/outbound";

/** Consistent editorial layout; only published and attributable figures may be shown. */
export function CuratedPartnerTourCard({
  title, description, platform, location, duration, image, alt, href, productId, offerId, pageId, editorialRating, editorialPrice,
}: {
  title: string;
  description: string;
  platform: "Viator" | "GetYourGuide";
  location?: string;
  duration?: string;
  image: string;
  alt: string;
  href: string;
  productId: string;
  offerId: string;
  pageId: string;
  /** Manually checked product-page figures when a tour has not entered the central registry. */
  editorialRating?: { value: number; count: number };
  editorialPrice?: { amount: number; currency: "USD" | "EUR"; basis: "per_person" | "per_group"; approximate?: boolean };
}) {
  const product = tourProducts.find((tour) => tour.id === productId);
  const offer = tourBookingOffers.find((entry) => entry.productId === productId && entry.partnerId === (platform === "Viator" ? "viator" : "getyourguide"));
  const price = editorialPrice ?? offer?.listedPrice;
  const rating = editorialRating ?? product?.rating;
  const pricePrefix = price?.currency === "EUR" ? "€" : "US$";
  return <article className="flex h-full min-w-0 flex-col overflow-hidden rounded-xl border bg-card shadow-sm">
    <img src={image} alt={alt} width={560} height={350} loading="lazy" decoding="async" className="aspect-[16/9] w-full object-cover" />
    <div className="flex flex-1 flex-col p-4">
      <p className="text-xs font-semibold text-primary">{platform}</p>
      <h3 className="mt-1.5 text-base font-semibold leading-snug">{title}</h3>
      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{description}</p>
      {(duration || location) && <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
        {duration && <span className="inline-flex items-center gap-1"><Clock3 className="h-3.5 w-3.5" aria-hidden="true" />{duration}</span>}
        {location && <span>{location}</span>}
      </div>}
      <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
        {rating ? <><Star className="h-3.5 w-3.5 fill-amber-400 text-amber-500" aria-hidden="true" /><span aria-label={rating.value.toFixed(1) + " out of 5 stars, " + rating.count + " reviews"}>{rating.value.toFixed(1)} ({rating.count.toLocaleString("en-US")} reviews)</span></> : <span>Check recent reviews with the provider</span>}
      </p>
      <div className="mt-auto flex flex-wrap items-end justify-between gap-3 border-t pt-4 text-sm">
        <span>{price
          ? <><span className="block text-xs text-muted-foreground">{editorialPrice?.approximate ? "From approx." : "From"}</span><strong>{pricePrefix + price.amount.toFixed(price.amount % 1 ? 2 : 0)}</strong><span className="block text-[11px] text-muted-foreground">{price.basis === "per_person" ? "Per person" : "Per group"}</span></>
          : <span className="text-xs text-muted-foreground">Check current price</span>}</span>
        <a href={href} target="_blank" rel={relFor(true)} onClick={() => recordOutboundClick({ pageId, productId, offerId })} className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-lg border border-primary/30 px-3 py-2 text-sm font-semibold text-primary hover:bg-secondary focus-visible:outline-2 focus-visible:outline-primary">
          View tour <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span>
        </a>
      </div>
    </div>
  </article>;
}
