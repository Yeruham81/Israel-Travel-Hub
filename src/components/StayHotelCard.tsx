import { useState } from "react";
import { Building2, ExternalLink } from "lucide-react";
import type { HotelIllustration } from "@/data/telAvivHotelPhotos";
import { getSource, isPublisherUrl, type HotelRecommendation, type ProviderLink } from "@/data/registry";
import { recordOutboundClick, relFor } from "@/lib/outbound";
import { activeHotelNotice } from "@/lib/hotel-notices";

export function StayHotelCard({ hotel, booking, pageId, editorial, compact = false, photo, fallbackPhoto }: { hotel: HotelRecommendation; booking: ProviderLink | undefined; pageId: string; editorial?: Pick<HotelRecommendation, "summary" | "bestFor" | "watch">; compact?: boolean; photo?: HotelIllustration; fallbackPhoto?: { src: string; alt: string } }) {
  const [imageFailed, setImageFailed] = useState(false);
  const notice = activeHotelNotice(hotel);
  const source = getSource(hotel.sourceId);
  if (compact) {
    return (
      <li id={`hotel-${hotel.id}`} className="flex min-w-0 scroll-mt-32 flex-col overflow-hidden rounded-2xl border bg-card transition-colors hover:border-primary/60" data-testid="hotel-recommendation">
        {photo && <div className="overflow-hidden bg-muted">
          <img src={imageFailed ? fallbackPhoto?.src || photo.src : photo.src} alt={imageFailed ? fallbackPhoto?.alt || photo.alt : photo.alt}
               loading="lazy" decoding="async" width={755} height={503}
               onError={() => { if (!imageFailed) setImageFailed(true); }}
               data-testid="hotel-illustration"
               className="aspect-[16/10] w-full bg-secondary object-cover" />
        </div>}
        <div className="flex flex-1 flex-col p-4 sm:p-5">
          <p className="text-xs font-medium text-primary">{hotel.style}</p>
          <h3 className="mt-1.5 text-xl font-semibold leading-snug">{hotel.name}</h3>
          <p className="mt-3 line-clamp-2 flex-1 text-sm leading-relaxed text-muted-foreground" data-testid="hotel-short-description">{editorial?.summary || hotel.summary}</p>
          <p className="mt-3 text-sm leading-snug" data-testid="hotel-best-for"><span className="font-semibold">Best for:</span> {editorial?.bestFor || hotel.bestFor}</p>
          {notice && <p className="mt-3 rounded-lg border border-primary/25 bg-secondary/70 p-3 text-xs leading-relaxed" data-testid="hotel-operating-notice">{notice.message}</p>}
        </div>
        {booking && <div className="border-t bg-secondary/40 p-3.5">
          <a href={booking.url} target="_blank" rel={relFor(booking.isAffiliate)}
             onClick={() => recordOutboundClick({ pageId, productId: hotel.id, offerId: booking.id })}
             className="btn btn-primary flex w-full items-center justify-center gap-2 text-center"
             aria-label={`${booking.ctaLabel} for ${hotel.name}`}>
            {booking.ctaLabel} <ExternalLink className="h-4 w-4 shrink-0" aria-hidden />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>}
      </li>
    );
  }
  return (
    <li id={`hotel-${hotel.id}`} className="scroll-mt-32 overflow-hidden rounded-2xl border bg-card" data-testid="hotel-recommendation">
      <div className="p-5 sm:p-7">
        <div className="flex items-start gap-4">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-secondary text-primary"><Building2 className="h-6 w-6" aria-hidden /></span>
          <div><p className="eyebrow">{hotel.style}</p><h3 className="mt-1 text-2xl sm:text-3xl">{hotel.name}</h3></div>
        </div>
        <p className="mt-4 leading-relaxed text-muted-foreground">{editorial?.summary || hotel.summary}</p>
        {notice && <p className="mt-4 rounded-xl border border-primary/25 bg-secondary p-4 text-sm leading-relaxed" data-testid="hotel-operating-notice">{notice.message}</p>}
        {!compact && <dl className="mt-5 grid gap-4 sm:grid-cols-2">
          <div><dt className="text-sm font-semibold">Who it suits</dt><dd className="mt-1 text-sm leading-relaxed text-muted-foreground">{editorial?.bestFor || hotel.bestFor}</dd></div>
          <div><dt className="text-sm font-semibold">Check before booking</dt><dd className="mt-1 text-sm leading-relaxed text-muted-foreground">{editorial?.watch || hotel.watch}</dd></div>
        </dl>}
        {!isPublisherUrl(source.url) && <a href={source.url} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-xs text-muted-foreground underline underline-offset-2">Hotel information source ↗<span className="sr-only"> (opens in a new tab)</span></a>}
      </div>
      {booking && <div className="flex flex-wrap items-center justify-between gap-4 border-t bg-secondary/50 px-5 py-4 sm:px-7">
        <div><p className="text-sm font-semibold">Check room options for your dates</p><p className="mt-1 text-xs text-muted-foreground">{booking.isAffiliate ? "Sponsored link · " : ""}{booking.providerName} · Price and availability on the booking site</p></div>
        <a href={booking.url} target="_blank" rel={relFor(booking.isAffiliate)} onClick={() => recordOutboundClick({ pageId, productId: hotel.id, offerId: booking.id })} className="btn btn-primary" aria-label={`${booking.ctaLabel} for ${hotel.name}`}>
          {booking.ctaLabel} <span aria-hidden>↗</span><span className="sr-only"> (opens in a new tab)</span>
        </a>
      </div>}
    </li>
  );
}

