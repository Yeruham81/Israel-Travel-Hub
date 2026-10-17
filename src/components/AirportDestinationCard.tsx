import { Link } from "@tanstack/react-router";
import { airportTransferRoutes, type AirportTransferRate } from "@/data/registry";
import type { StayGuidePhoto } from "@/data/content";

export function AirportDestinationCard({ id, destination, price, photo, onChoose, testId = "airport-destination-card" }: {
  id: string; destination: string; price?: AirportTransferRate["price"]; photo: StayGuidePhoto;
  onChoose?: (id: string) => void; testId?: string;
}) {
  const route = airportTransferRoutes.find((item) => item.id === id);
  const details = <>
    <img src={photo.src} alt={photo.alt} width={360} height={240} loading="lazy" decoding="async" className="aspect-[3/2] w-full object-cover" />
    <div className="flex flex-1 flex-col p-3 sm:p-5">
      <p className="text-[0.65rem] font-semibold uppercase tracking-wide text-muted-foreground">Ben Gurion Airport to</p>
      <h3 className="mt-1 min-h-12 text-xl leading-tight sm:text-2xl">{destination}</h3>
      <div className="mt-3 flex-1">{price ? <><p className="text-xs text-muted-foreground">From</p><p className="text-2xl font-semibold tabular-nums"><span className="text-sm font-medium">ILS </span>{price.amount.toLocaleString("en-US")}</p><p className="mt-1 text-xs text-muted-foreground">Per vehicle · up to 4</p></> : <p className="text-lg font-semibold">Ask for a quote</p>}</div>
      {route && <span className="mt-4 text-sm font-semibold text-primary underline underline-offset-4">View transfer details</span>}
    </div>
  </>;
  const quoteClass = "mx-3 mb-3 block rounded-lg bg-secondary px-2 py-2 text-center text-sm font-semibold text-primary hover:bg-primary hover:text-primary-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:mx-5 sm:mb-5";
  return <article className="flex h-full flex-col overflow-hidden rounded-2xl border bg-card" data-testid={testId} data-destination={id}>
    {route ? <Link to={route.path} className="flex flex-1 flex-col hover:bg-secondary/20 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-primary">{details}</Link> : <div className="flex flex-1 flex-col">{details}</div>}
    {onChoose ? <a href="#request-quote" onClick={() => onChoose(id)} className={quoteClass}>Request a quote</a> : route ? <Link to={route.path} hash="request-quote" className={quoteClass}>Request a quote</Link> : <Link to="/transfers/ben-gurion-airport/" search={{ destination: id }} hash="request-quote" className={quoteClass}>Request a quote</Link>}
  </article>;
}
