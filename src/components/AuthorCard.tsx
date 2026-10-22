import { Link } from "@tanstack/react-router";
import portrait from "@/assets/airport-transfers/moshe.webp";
import { mosheBarakAuthor } from "@/data/registry";

/** Compact site-wide author attribution. Tripadvisor is an independent review platform, not an endorsement. */
export function AuthorCard({ introduction = false }: { introduction?: boolean }) {
  const author = mosheBarakAuthor;
  return <aside aria-label={introduction ? "About Moshe Barak" : "About the author"} className="mt-3 flex min-w-0 flex-wrap items-center gap-x-3 gap-y-2 rounded-xl border border-primary/15 bg-secondary/40 px-3 py-2.5 sm:gap-x-4 sm:px-4" data-testid="author-card">
    <img src={portrait} alt="Moshe Barak" width={64} height={64} decoding="async" className="h-14 w-14 shrink-0 rounded-lg object-cover object-top sm:h-16 sm:w-16" />
    <div className="min-w-0 flex-1">
      <p className="text-sm font-semibold leading-snug">{introduction ? "About " : "Written by "}<Link to="/about-moshe-barak/" hash="moshe-barak" className="font-bold text-primary underline-offset-4 hover:underline">{author.name}</Link></p>
      <p className="mt-0.5 text-xs font-medium leading-snug text-muted-foreground">{author.role}</p>
      <p className="mt-1 text-xs leading-snug text-muted-foreground">{author.experience} {author.bio}</p>
    </div>
    <a href={author.reviewsUrl} target="_blank" rel="noopener noreferrer" aria-label="Read traveler reviews on Tripadvisor for Moshe Barak (opens in new tab)" className="ml-auto inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs font-semibold text-primary transition-colors hover:border-primary hover:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
      <img src="https://static.tacdn.com/img2/brand_refresh/Tripadvisor_logoset_solid_green.svg" alt="Tripadvisor" width={92} height={20} loading="lazy" decoding="async" className="h-5 w-auto max-w-[92px] object-contain" />
      <span className="whitespace-nowrap">Reviews</span>
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  </aside>;
}
