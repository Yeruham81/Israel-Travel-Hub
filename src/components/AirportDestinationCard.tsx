import { Link } from "@tanstack/react-router";
import { airportTransferRoutes, type AirportTransferRate } from "@/data/registry";
import type { StayGuidePhoto } from "@/data/content";
import { PriceDisplay } from "@/components/CurrencyRates";

export function AirportDestinationCard({ id, destination, price, photo, onChoose, layout = "featured", testId = "airport-destination-card" }: {
  id: string; destination: string; price?: AirportTransferRate["price"]; photo: Pick<StayGuidePhoto, "src" | "alt">;
  onChoose?: (id: string) => void; layout?: "featured" | "compact" | "hub-featured" | "hub-row"; testId?: string;
}) {
  const route = airportTransferRoutes.find((item) => item.id === id);
  // Hub-only variants keep destination discovery and quote requests compact without
  // changing the established layout of the four dedicated route pages.
  if (layout === "hub-featured") return <article className="flex h-full min-w-0 flex-col rounded-2xl border bg-card p-3 transition-colors hover:border-primary/40" data-testid={testId} data-destination={id}>
    {route && <Link to={route.path} className="group flex min-w-0 flex-1 items-center gap-3 rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:gap-4">
      <img src={photo.src} alt={photo.alt} width={160} height={106} loading="lazy" decoding="async" className="aspect-[3/2] w-28 shrink-0 rounded-xl object-cover sm:w-36" />
      <div className="min-w-0 flex-1">
        <h3 className="text-base font-semibold leading-snug sm:text-lg">{destination}</h3>
        <p className="mt-1 text-base font-semibold tabular-nums text-foreground sm:text-lg">From ₪{price?.amount.toLocaleString("en-US")}</p>
        <p className="mt-0.5 text-xs leading-snug text-muted-foreground">Weekday · One way · Up to 4 passengers</p>
        <span className="mt-2 inline-block text-sm font-semibold text-primary group-hover:underline">View transfer details</span>
      </div>
    </Link>}
    <a href="#request-quote" onClick={() => onChoose?.(id)} className="mt-1.5 self-end rounded-lg px-3 py-2 text-sm font-semibold text-primary underline-offset-4 hover:bg-secondary hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">Request a quote</a>
  </article>;
  if (layout === "hub-row") return <article className="flex h-full min-w-0 items-center gap-3 rounded-xl border bg-card p-2.5 transition-colors hover:border-primary/40 sm:p-3" data-testid={testId} data-destination={id}>
    <img src={photo.src} alt={photo.alt} width={112} height={72} loading="lazy" decoding="async" className="aspect-[3/2] w-20 shrink-0 rounded-lg object-cover sm:w-24" />
    <div className="min-w-0 flex-1">
      <h3 className="text-sm font-semibold leading-snug">{id === "other" ? "Another destination?" : destination}</h3>
      {price && <p className="mt-0.5 text-sm font-medium tabular-nums text-muted-foreground">From ₪{price.amount.toLocaleString("en-US")}</p>}
      <a href="#request-quote" onClick={() => onChoose?.(id)} className="mt-1 inline-flex min-h-9 items-center rounded-md py-1 text-xs font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:text-sm">Request a quote</a>
    </div>
  </article>;
  const compact = layout === "compact";
  const image = <img src={photo.src} alt={photo.alt} width={compact ? 80 : 360} height={compact ? 80 : 240} loading="lazy" decoding="async" className={compact ? "h-20 w-20 shrink-0 rounded-lg object-cover" : "aspect-[3/2] w-full object-cover"} />;
  const heading = <>
    <p className="text-[0.65rem] font-semibold uppercase tracking-wide text-muted-foreground">Airport transfer to</p>
    <h3 className={`mt-1 text-xl leading-tight ${compact ? "" : "min-h-12 sm:text-2xl"}`}>{destination}</h3>
  </>;
  const priceDetails = <>
    <div className="mt-3 flex-1">{price ? <><p className="text-xs text-muted-foreground">From</p><PriceDisplay amount={price.amount} size={compact ? "compact" : "card"} from={false} /><p className="mt-2 text-xs text-muted-foreground">Per vehicle · up to 4</p></> : <p className="text-lg font-semibold">Ask for a quote</p>}</div>
    {route && <span className="mt-4 text-sm font-semibold text-primary underline underline-offset-4">View transfer details</span>}
  </>;
  const details = compact ? <>
    <div className="flex items-center gap-3 px-4 pt-4">{image}<div className="min-w-0">{heading}</div></div>
    <div className="flex flex-1 flex-col px-4 pb-4">{priceDetails}</div>
  </> : <>
    {image}<div className="flex flex-1 flex-col p-3 sm:p-5">{heading}{priceDetails}</div>
  </>;
  const quoteClass = `block rounded-lg bg-secondary px-2 py-2 text-center text-sm font-semibold text-primary hover:bg-primary hover:text-primary-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${compact ? "mx-4 mb-4" : "mx-3 mb-3 sm:mx-5 sm:mb-5"}`;
  return <article className="flex h-full flex-col overflow-hidden rounded-2xl border bg-card" data-testid={testId} data-destination={id}>
    {route ? <Link to={route.path} className="flex flex-1 flex-col hover:bg-secondary/20 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-primary">{details}</Link> : <div className="flex flex-1 flex-col">{details}</div>}
    {onChoose ? <a href="#request-quote" onClick={() => onChoose(id)} className={quoteClass}>Request a quote</a> : route ? <Link to={route.path} hash="request-quote" className={quoteClass}>Request a quote</Link> : <Link to="/airport-transfers/" search={{ destination: id }} hash="request-quote" className={quoteClass}>Request a quote</Link>}
  </article>;
}
