import { Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen } from "lucide-react";
import telAvivNeighborhoodHero from "@/assets/guides/2026-11/where-to-stay-tel-aviv-drive.webp";

/** Matching neighborhood-comparison panel for Tel Aviv accommodation pages. */
export function TelAvivNeighborhoodGuideCallout({ id = "area-guide" }: { id?: string }) {
  return (
    <section id={id} aria-labelledby={`${id}-h`} className="mt-8 scroll-mt-28">
      <div className="grid overflow-hidden rounded-2xl border bg-secondary/30 sm:grid-cols-[minmax(0,1fr)_230px]">
        <div className="min-w-0 p-5 sm:p-6">
          <p className="eyebrow inline-flex items-center gap-2">
            <BookOpen className="h-4 w-4" aria-hidden /> Neighborhood guide
          </p>
          <h2 id={`${id}-h`} className="mt-2 text-xl font-semibold sm:text-2xl">
            Not sure where to stay in Tel Aviv?
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
            In my guide, I compare eight Tel Aviv areas, from the central beaches and lively city
            streets to Jaffa and quieter residential neighborhoods, with practical tips for choosing
            your base.
          </p>
          <Link
            to="/travel-blog/where-to-stay-in-tel-aviv/"
            className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-lg border border-primary/30 bg-card px-4 py-2.5 text-sm font-semibold text-primary transition-colors hover:border-primary/60 hover:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Compare neighborhoods <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
        <img
          src={telAvivNeighborhoodHero}
          alt="Tel Aviv cityscape and coastline"
          width={460}
          height={300}
          loading="lazy"
          decoding="async"
          className="aspect-[16/10] h-full w-full object-cover sm:aspect-auto"
        />
      </div>
    </section>
  );
}
