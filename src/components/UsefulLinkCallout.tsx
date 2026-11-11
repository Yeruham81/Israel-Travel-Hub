import { Lightbulb } from "lucide-react";

/** A single contextual action link, without a repetitive "Useful link" heading. */
export function UsefulLinkCallout({ label, href, context }: { label: string; href: string; context: string }) {
  const external = /^https?:\/\//.test(href);
  return (
    <aside aria-label={label} data-testid="highlighted-useful-link" className="mt-5 flex items-start gap-3 rounded-xl border border-amber-300/60 bg-amber-50/60 p-4 dark:border-amber-700/40 dark:bg-amber-950/20">
      <Lightbulb aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 fill-amber-200/70 text-amber-600 dark:fill-amber-500/25 dark:text-amber-400" />
      <div className="min-w-0">
        <p className="text-sm leading-relaxed">
          <a href={href} className="font-semibold text-primary underline underline-offset-4 hover:text-primary/80 focus-visible:outline-2 focus-visible:outline-primary" {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
            {label}
            {external && <span className="sr-only"> (opens in a new tab)</span>}
          </a>
        </p>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{context}</p>
      </div>
    </aside>
  );
}
