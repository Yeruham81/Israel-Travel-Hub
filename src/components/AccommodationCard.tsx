import { Link, type LinkProps } from "@tanstack/react-router";
import { ArrowRight, BookOpen } from "lucide-react";
import type { AccommodationDestinationCard } from "@/data/content";
import { relFor } from "@/lib/outbound";

type GuideLink = { to: LinkProps["to"]; label: string };

export function AccommodationCard({
  destination: d, guideLink, featured = false,
}: {
  destination: AccommodationDestinationCard;
  guideLink?: GuideLink;
  featured?: boolean;
}) {
  const isExternal = "href" in d;
  const primaryClass = "group flex min-w-0 flex-1 flex-col overflow-hidden min-[480px]:flex-row focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
  const content = <>
    <span className={"block shrink-0 overflow-hidden bg-muted " + (featured ? "h-44 min-[480px]:h-auto min-[480px]:w-2/5" : "h-40 min-[480px]:h-auto min-[480px]:w-36 lg:w-40")}>
      <img
        src={d.photo.src} alt={d.photo.alt}
        width={755} height={503} loading="lazy" decoding="async"
        className={"w-full object-cover motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:scale-[1.03] " + (featured ? "h-44 min-[480px]:h-full min-[480px]:min-h-44" : "h-40 min-[480px]:h-full min-[480px]:min-h-40")}
      />
    </span>
    <span className={"flex min-w-0 flex-1 flex-col p-4 " + (featured ? "sm:p-5" : "")}>
      <h3 className="text-lg font-semibold leading-snug sm:text-xl">{d.title}</h3>
      <span className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{d.text}</span>
      <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:underline">
        {d.cta}<ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
      </span>
      {isExternal && <span className="sr-only"> (opens in a new tab)</span>}
    </span>
  </>;

  return <article className="flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border bg-card transition-colors hover:border-primary/50" data-testid="hotel-destination-card">
    {isExternal
      ? <a href={d.href} target="_blank" rel={relFor(false)} className={primaryClass} data-testid="accommodation-destination-card">{content}</a>
      : <Link to={d.to} {...(d.hash ? { hash: d.hash } : {})} className={primaryClass} data-testid="accommodation-destination-card">{content}</Link>}
    {guideLink && <div className="border-t px-4 py-1">
      <Link to={guideLink.to} className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
        <BookOpen className="h-4 w-4 shrink-0" aria-hidden /> {guideLink.label}
      </Link>
    </div>}
  </article>;
}
