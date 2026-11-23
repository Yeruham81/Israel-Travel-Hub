import { linksForPage, partners } from "@/data/registry";
import { recordOutboundClick, relFor } from "@/lib/outbound";

const bannerStyles: Record<string, string> = {
  kiwitaxi: "border-emerald-200 bg-emerald-50 text-emerald-950",
  welcome: "border-amber-200 bg-amber-50 text-amber-950",
  intui: "border-sky-200 bg-sky-50 text-sky-950",
  gettransfer: "border-indigo-200 bg-indigo-50 text-indigo-950",
};

/** CTAs pick up a stronger tone from their surrounding provider card, not a black fill. */
const platformButtonStyles: Record<string, string> = {
  kiwitaxi: "border-emerald-500/70 bg-emerald-200 text-emerald-950 group-hover:border-emerald-600 group-hover:bg-emerald-300",
  welcome: "border-amber-500/70 bg-amber-200 text-amber-950 group-hover:border-amber-600 group-hover:bg-amber-300",
  intui: "border-sky-500/70 bg-sky-200 text-sky-950 group-hover:border-sky-600 group-hover:bg-sky-300",
  gettransfer: "border-indigo-500/70 bg-indigo-200 text-indigo-950 group-hover:border-indigo-600 group-hover:bg-indigo-300",
};

/** Short marketing copy for the hub; route pages retain their existing descriptions. */
const hubOffers: Record<string, { description: string; action: string }> = {
  kiwitaxi: { description: "Start your trip with a pre-booked pickup and a vehicle that suits your group.", action: "Check prices" },
  welcome: { description: "Arrange a welcoming airport pickup and travel straight to your destination.", action: "Book your pickup" },
  intui: { description: "Find a comfortable transfer for your route, party and luggage.", action: "Explore transfers" },
  gettransfer: { description: "See available transfer offers and choose the ride that works for you.", action: "Compare offers" },
};

/** One consistent set of booking-platform cards on the airport hub and route pages. */
export function AirportBookingPlatforms({ pageId = "airport-private-transfers", destination, compact = false, title }: { pageId?: string; destination?: string; compact?: boolean; title?: string }) {
  const platforms = linksForPage(pageId);
  return <section id="booking-platforms" aria-labelledby="platforms-h" className={compact ? "mt-9" : "mt-16 rounded-2xl border p-5 sm:p-8"}>
    {!compact && <p className="eyebrow">More ways to arrange your ride</p>}
    <h2 id="platforms-h" className={compact ? "text-2xl font-semibold" : "mt-2 text-3xl"}>{title ?? (compact ? "Prefer to book online?" : "Prefer to book through a platform?")}</h2>
    <p className={compact ? "mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground" : "mt-3 leading-relaxed text-muted-foreground"}>{compact ? (destination ? "You can also search for a private transfer to " + destination + " on one of the booking websites below." : "You can also search for an airport transfer on one of the booking websites below.") : `Explore independent booking platforms for your airport pickup${destination ? ` to ${destination}` : ""}. The starting prices on this site are for my private transfer service; each platform sets its own prices, availability and terms. Enter your exact route and trip details there.`}</p>
    <div className={compact ? "mt-4 grid gap-3 sm:grid-cols-2" : "mt-6 grid gap-4 sm:grid-cols-2"}>{platforms.map((platform) => {
      const logo = partners.find((partner) => partner.id === platform.partnerId)?.logo;
      const hubOffer = hubOffers[platform.partnerId || ""];
      return <a key={platform.id} href={platform.url} target="_blank" rel={relFor(platform.isAffiliate)} onClick={() => recordOutboundClick({ pageId, productId: platform.id, offerId: platform.id })} className={`group flex h-full min-w-0 flex-col rounded-xl border transition-shadow hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary ${compact ? "p-3 sm:p-4" : "p-5"} ${bannerStyles[platform.partnerId!] || "bg-secondary"}`} data-testid="airport-platform-banner">
        {logo && <div className={compact ? "mb-2 flex h-12 shrink-0 items-center justify-center rounded-lg bg-white px-3 ring-1 ring-black/5" : "mb-5 flex h-24 shrink-0 items-center justify-center rounded-lg bg-white px-4 py-4 ring-1 ring-black/5"}>
          <img src={logo.src} alt={`${platform.providerName} logo`} width={logo.width} height={logo.height} loading="lazy" decoding="async" className={compact ? "h-9 w-full max-w-40 object-contain" : "h-16 w-full max-w-56 object-contain"} />
        </div>}
        {!compact && <p className="text-xs font-semibold uppercase tracking-widest opacity-70">Private transfer booking</p>}
        <h3 className={compact ? "mt-1 font-sans text-lg font-bold tracking-tight" : "mt-2 font-sans text-2xl font-bold tracking-tight"}>{platform.providerName}</h3>
        <p className={compact ? "mt-1 line-clamp-2 flex-1 text-sm leading-relaxed" : "mt-3 flex-1 text-sm leading-relaxed"}>{compact ? (hubOffer?.description ?? platform.summary) : platform.summary}</p>
        <span className={`${compact ? "mt-3" : "mt-5"} inline-flex min-h-11 w-fit self-center items-center justify-center rounded-lg border px-5 py-2.5 text-center text-sm font-semibold shadow-sm transition-[background-color,border-color,box-shadow] group-hover:shadow-md ${platformButtonStyles[platform.partnerId || ""] ?? "border-primary/40 bg-secondary text-foreground group-hover:bg-secondary/80"}`}>{compact ? (hubOffer?.action ?? "View options") : platform.ctaLabel}</span><span className="sr-only"> (opens in a new tab)</span>
      </a>;
    })}</div>
    {compact && <p className="mt-3 text-xs leading-relaxed text-muted-foreground" data-testid="airport-external-providers-note">These are external, independently operated booking websites. Each provider sets its own prices and terms. Please review all details carefully before booking.</p>}
  </section>;
}
