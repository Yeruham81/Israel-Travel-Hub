import { ArrowRight, ExternalLink } from "lucide-react";
import { Link, type LinkProps } from "@tanstack/react-router";
import type { HotelCategoryGuide, StayGuidePhoto } from "@/data/content";
import { deadSeaHotelRecommendations, tiberiasHotelRecommendations, haifaHotelRecommendations, providerLinks, type ResortHotelFacts, type ProviderLink } from "@/data/registry";
import { recordOutboundClick, relFor } from "@/lib/outbound";

const resortHotels = [...deadSeaHotelRecommendations, ...tiberiasHotelRecommendations, ...haifaHotelRecommendations];
export const resortHotel = (id: string) => resortHotels.find((hotel) => hotel.id === id)!;
export const hotelBooking = (id: string) => providerLinks.find((link) => link.id === `hotel-${id}-expedia`);

export function StayComparison({ hotelIds, columns, caption }: { hotelIds: string[]; columns: { key: keyof ResortHotelFacts; label: string }[]; caption: string }) {
  return (
    <div className="mt-5 overflow-x-auto rounded-2xl border bg-card" role="region" aria-label={caption} tabIndex={0}>
      <table className="w-full min-w-[760px] text-left text-sm">
        <caption className="sr-only">{caption}</caption>
        <thead className="bg-secondary"><tr><th scope="col" className="px-4 py-3 font-semibold">Place to stay</th>{columns.map((column) => <th key={column.key} scope="col" className="px-4 py-3 font-semibold">{column.label}</th>)}</tr></thead>
        <tbody className="divide-y">{hotelIds.map((id) => {
          const hotel = resortHotel(id);
          return <tr key={id} data-testid="stay-comparison-row"><th scope="row" className="min-w-44 px-4 py-4"><a href={`#hotel-${id}`} className="font-semibold text-primary underline underline-offset-2">{hotel.name}</a><span className="mt-1 block text-xs font-normal text-muted-foreground">{hotel.style}</span></th>{columns.map((column) => <td key={column.key} className="min-w-40 px-4 py-4 align-top leading-relaxed text-muted-foreground">{hotel.resortFacts[column.key]}</td>)}</tr>;
        })}</tbody>
      </table>
    </div>
  );
}

export function StayCategoryCard({ guide }: { guide: HotelCategoryGuide }) {
  return (
    <Link to={guide.path as LinkProps["to"]} className="group flex h-full flex-col overflow-hidden rounded-2xl border bg-card transition-colors hover:border-primary" data-testid="stay-category-card">
      <img src={guide.photo.src} alt={guide.photo.alt} width={755} height={503} loading="lazy" decoding="async" className="aspect-[16/9] w-full object-cover" />
      <div className="flex flex-1 flex-col p-5 sm:p-6"><p className="eyebrow">A guide for your travel style</p><h3 className="mt-2 text-3xl">{guide.shortTitle}</h3><p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{guide.summary}</p><span className="mt-5 inline-flex items-center gap-2 font-semibold text-primary">Explore the comparison <ArrowRight className="h-4 w-4" aria-hidden /></span></div>
    </Link>
  );
}

export function StayBookingDisclosure() {
  return <div className="mt-5 rounded-xl border bg-secondary/60 p-4 text-sm leading-relaxed"><p>These editorial picks build on the publisher's original guide and the hotels' own information. They are selected for travel style and practical fit, and do not claim personal stays at every property.</p><p className="mt-2">Links marked “Sponsored link” may earn us a commission at no extra cost to you. Prices and availability are confirmed on the booking site; enter your dates and guests there before choosing a room.</p></div>;
}

export function StayBrowseLink({ link, pageId }: { link: ProviderLink | undefined; pageId: string }) {
  if (!link) return null;
  return <div className="mt-5 flex flex-wrap items-center gap-3"><a href={link.url} target="_blank" rel={relFor(link.isAffiliate)} onClick={() => recordOutboundClick({ pageId, productId: link.id, offerId: link.id })} className="btn btn-outline">{link.title} <ExternalLink className="h-4 w-4" aria-hidden /><span className="sr-only"> (opens in a new tab)</span></a><p className="text-xs text-muted-foreground">{link.isAffiliate ? "Sponsored link · " : ""}Enter dates on {link.providerName} and confirm the location.</p></div>;
}

export function StayPhotoCredits({ photos }: { photos: StayGuidePhoto[] }) {
  const unique = [...new Map(photos.map((photo) => [photo.sourceUrl, photo])).values()];
  return <details className="mt-10 rounded-xl border bg-card p-4 text-xs text-muted-foreground"><summary className="cursor-pointer font-semibold">Guide image sources</summary><p className="mt-3">Photographs reused from the publisher's original destination guide and optimized for this site. Location scenes illustrate the area; named property photographs are identified below.</p><ul className="mt-2 space-y-2">{unique.map((photo) => <li key={photo.sourceUrl}><a href={photo.sourceUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">{photo.label} ↗<span className="sr-only"> (opens in a new tab)</span></a></li>)}</ul></details>;
}
