import { Link, type LinkProps } from "@tanstack/react-router";
import type { LucideIcon } from "lucide-react";

export type IconTripPlanningLink = {
  title: string;
  description: string;
  to: LinkProps["to"];
  icon: LucideIcon;
};

/** Shared compact, icon-led trip-planning cards for hubs and travel guides. */
export function IconTripPlanningLinks({
  title, items, id = "trip-planning", className = "mt-9",
}: {
  title: string;
  items: readonly IconTripPlanningLink[];
  id?: string;
  className?: string;
}) {
  const headingId = `${id}-h`;
  return <section id={id} aria-labelledby={headingId} className={className} data-testid="icon-trip-planning-links">
    <h2 id={headingId} className="text-2xl font-semibold">{title}</h2>
    <ul className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-3">
      {items.map(item => {
        const Icon = item.icon;
        return <li key={String(item.to)}>
          <Link to={item.to} className="group flex h-full items-start gap-3 rounded-xl border bg-card p-3 transition-colors hover:border-primary/50 hover:bg-secondary/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
            <Icon aria-hidden className="mt-0.5 size-5 shrink-0 text-primary" />
            <span className="min-w-0">
              <span className="block text-sm font-semibold text-foreground group-hover:text-primary">{item.title}</span>
              <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">{item.description}</span>
            </span>
          </Link>
        </li>;
      })}
    </ul>
  </section>;
}
