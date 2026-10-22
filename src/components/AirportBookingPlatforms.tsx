import { linksForPage, partners } from "@/data/registry";
import { recordOutboundClick, relFor } from "@/lib/outbound";

const bannerStyles: Record<string, string> = {
  kiwitaxi: "border-emerald-200 bg-emerald-50 text-emerald-950",
  welcome: "border-amber-200 bg-amber-50 text-amber-950",
  intui: "border-sky-200 bg-sky-50 text-sky-950",
  gettransfer: "border-indigo-200 bg-indigo-50 text-indigo-950",
};

/** One consistent set of booking-platform cards on the airport hub and route pages. */
export function AirportBookingPlatforms({ pageId = "airport-private-transfers", destination }: { pageId?: string; destination?: string }) {
  const platforms = linksForPage(pageId);
  return <section id="booking-platforms" aria-labelledby="platforms-h" className="mt-16 rounded-2xl border p-5 sm:p-8">
    <p className="eyebrow">More ways to arrange your ride</p>
    <h2 id="platforms-h" className="mt-2 text-3xl">Prefer to book through a platform?</h2>
    <p className="mt-3 leading-relaxed text-muted-foreground">Explore these booking sites for your airport pickup{destination ? ` to ${destination}` : ""}. The starting prices above belong to Moshe's service; each platform supplies its own offers and terms. Enter your exact route and trip details there.</p>
    {platforms.some((platform) => platform.isAffiliate) && <p className="mt-3 text-sm">Links marked “Sponsored link” may earn me a commission at no extra cost to you.</p>}
    <div className="mt-6 grid gap-4 sm:grid-cols-2">{platforms.map((platform) => {
      const logo = partners.find((partner) => partner.id === platform.partnerId)?.logo;
      return <a key={platform.id} href={platform.url} target="_blank" rel={relFor(platform.isAffiliate)} onClick={() => recordOutboundClick({ pageId, productId: platform.id, offerId: platform.id })} className={`flex h-full min-w-0 flex-col rounded-xl border p-5 transition-shadow hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary ${bannerStyles[platform.partnerId!] || "bg-secondary"}`} data-testid="airport-platform-banner">
        {logo && <div className="mb-5 flex h-24 shrink-0 items-center justify-center rounded-lg bg-white px-4 py-4 ring-1 ring-black/5">
          <img src={logo.src} alt={`${platform.providerName} logo`} width={logo.width} height={logo.height} loading="lazy" decoding="async" className="h-16 w-full max-w-56 object-contain" />
        </div>}
        <p className="text-xs font-semibold uppercase tracking-widest opacity-70">Private transfer booking</p>
        <h3 className="mt-2 font-sans text-2xl font-bold tracking-tight">{platform.providerName}</h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed">{platform.summary}</p>
        {platform.isAffiliate && <p className="mt-3 text-xs font-semibold">Sponsored link</p>}
        <span className="mt-5 text-sm font-semibold underline underline-offset-4">{platform.ctaLabel}</span><span className="sr-only"> (opens in a new tab)</span>
      </a>;
    })}</div>
  </section>;
}
