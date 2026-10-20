import type { ReactNode } from "react";
import { ChevronDown } from "lucide-react";

/** Compact native disclosure keeps references available without filling the page. */
export function SourcesDisclosure({ children }: { children: ReactNode }) {
  return (
    <section id="sources" aria-labelledby="sources-h" className="mt-8 scroll-mt-28">
      <details className="group/sources rounded-xl border bg-card text-sm text-muted-foreground">
        <summary className="cursor-pointer list-none rounded-xl px-4 py-3 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary [&::-webkit-details-marker]:hidden">
          <h2 id="sources-h" className="flex items-center justify-between gap-3 font-sans text-sm font-semibold">
            Sources
            <ChevronDown aria-hidden className="h-4 w-4 shrink-0 transition-transform group-open/sources:rotate-180" />
          </h2>
        </summary>
        <div className="border-t px-4 pb-4 pt-3">{children}</div>
      </details>
    </section>
  );
}
