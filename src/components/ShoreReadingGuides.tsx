import { Link } from "@tanstack/react-router";
import type { ShoreReadingGuide } from "@/data/shoreReading";

export function RelatedGuideCards({ guides, title = "Useful guides for your day ashore", id, intro, eyebrow }: { guides: ShoreReadingGuide[]; title?: string; id?: string; intro?: string; eyebrow?: string }) {
  return <section id={id} aria-label={title} className="mt-14">
    {eyebrow && <p className="eyebrow mb-2">{eyebrow}</p>}
    <h2 className="text-3xl font-semibold">{title}</h2>
    {intro && <p className="mt-3 text-muted-foreground">{intro}</p>}
    <ul className="mt-5 grid gap-4 sm:grid-cols-2">
      {guides.map((guide) => <li key={guide.to} className="min-w-0">
        <article className="group flex h-full gap-4 rounded-2xl border bg-card p-4 transition-shadow hover:border-primary/40 hover:shadow-md">
          <div className="flex min-w-0 flex-1 flex-col items-start">
            <h3 className="text-xl font-semibold leading-tight text-foreground">{guide.title}</h3>
            <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{guide.description}</p>
            <Link to={guide.to} className="mt-auto pt-3 text-sm font-semibold text-primary underline-offset-4 hover:underline focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary" aria-label={`Read More about ${guide.title}`}>Read More</Link>
          </div>
          <img src={guide.photo.src} alt={guide.photo.alt} width={160} height={200} loading="lazy" decoding="async" className="h-32 w-20 shrink-0 rounded-xl object-cover sm:w-24" />
        </article>
      </li>)}
    </ul>
  </section>;
}

export const ShoreReadingGuides = RelatedGuideCards;
