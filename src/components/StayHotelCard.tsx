import { Building2 } from "lucide-react";
import { getSource, isPublisherUrl, type HotelRecommendation, type ProviderLink } from "@/data/registry";
import { recordOutboundClick, relFor } from "@/lib/outbound";
import { activeHotelNotice } from "@/lib/hotel-notices";

export function StayHotelCard({ hotel, booking, pageId, editorial, compact = false }: { hotel: HotelRecommendation; booking: ProviderLink | undefined; pageId: string; editorial?: Pick<HotelRecommendation, "summary" | "bestFor" | "watch">; compact?: boolean }) {
  const notice = activeHotelNotice(hotel);
  const source = getSource(hotel.sourceId);
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

