import { Link, type LinkProps } from "@tanstack/react-router";
import { ArrowRight, BookOpen } from "lucide-react";
import type { AccommodationDestinationCard } from "@/data/content";
import { relFor } from "@/lib/outbound";

type GuideLink = { to: LinkProps["to"]; label: string };

export function AccommodationCard({
  destination: d, guideLink, comingSoon = false,
}: {
  destination: AccommodationDestinationCard;
  guideLink?: GuideLink;
  comingSoon?: boolean;
}) {
  const isExternal = "href" in d;
  const primaryClass = "group flex min-w-0 flex-1 flex-col overflow-hidden lg:flex-row focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
  const content = <>
    <span className="block aspect-[16/10] w-full shrink-0 overflow-hidden bg-muted lg:aspect-auto lg:w-40 xl:w-44">
      <img
        src={d.photo.src} alt={d.photo.alt}
        width={755} height={503} loading="lazy" decoding="async"
        className="h-full w-full object-cover motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:scale-[1.03]"
      />
    </span>
    <div className="flex min-w-0 flex-1 flex-col p-2.5 sm:p-4">
      <h3 className="text-sm font-semibold leading-snug sm:text-lg">{d.title}</h3>
      <p className="mt-1.5 flex-1 text-xs leading-relaxed text-muted-foreground line-clamp-3 sm:line-clamp-none sm:text-sm">
        {comingSoon
          ? "Red Sea resorts, beach hotels and desert getaways. A dedicated Eilat hotel guide is coming soon."
          : d.text}
      </p>
      {comingSoon
        ? <span className="mt-3 text-xs font-semibold text-muted-foreground sm:text-sm">Coming soon</span>
        : <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary group-hover:underline sm:text-sm">
            {d.cta}<ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
          </span>}
      {isExternal && !comingSoon && <span className="sr-only"> (opens in a new tab)</span>}
    </div>
  </>;

  return <article className="flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border bg-card transition-colors hover:border-primary/50" data-testid="hotel-destination-card">
    {comingSoon
      ? <div className="flex min-w-0 flex-1 flex-col overflow-hidden lg:flex-row" data-testid="accommodation-coming-soon-card" aria-label="Hotels in Eilat — coming soon">{content}</div>
      : isExternal
        ? <a href={d.href} target="_blank" rel={relFor(false)} className={primaryClass} data-testid="accommodation-destination-card">{content}</a>
        : <Link to={d.to} {...(d.hash ? { hash: d.hash } : {})} className={primaryClass} data-testid="accommodation-destination-card">{content}</Link>}
    {guideLink && !comingSoon && <div className="border-t px-2.5 py-1 sm:px-4">
      <Link to={guideLink.to} className="inline-flex min-h-11 items-center gap-1.5 text-[11px] font-semibold leading-snug text-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:gap-2 sm:text-sm">
        <BookOpen className="h-4 w-4 shrink-0" aria-hidden /> {guideLink.label}
      </Link>
    </div>}
  </article>;
}
