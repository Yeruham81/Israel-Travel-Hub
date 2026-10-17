import { Link } from "@tanstack/react-router";
import type { AccommodationDestinationCard } from "@/data/content";
import { relFor } from "@/lib/outbound";

export function AccommodationCard({ destination: d }: { destination: AccommodationDestinationCard }) {
  const isExternal = "href" in d;
  const className = "group flex h-full flex-col overflow-hidden rounded-2xl border bg-card transition-colors hover:border-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary";
  const content = <>
    <div className="overflow-hidden bg-muted">
      <img src={d.photo.src} alt={d.photo.alt} width={755} height={503} loading="lazy" decoding="async" className="aspect-[3/2] w-full object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-[1.03]" />
    </div>
    <div className="flex flex-1 flex-col p-5 sm:p-6">
      <h3 className="text-2xl">{d.title}</h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{d.text}</p>
      <span className="mt-5 font-semibold text-primary">{d.cta}</span>
      {isExternal && <span className="sr-only"> (opens in a new tab)</span>}
    </div>
  </>;

  return isExternal
    ? <a href={d.href} target="_blank" rel={relFor(false)} className={className} data-testid="accommodation-destination-card">{content}</a>
    : <Link to={d.to} {...(d.hash ? { hash: d.hash } : {})} className={className} data-testid="accommodation-destination-card">{content}</Link>;
}
