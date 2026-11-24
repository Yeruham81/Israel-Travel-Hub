import { Link } from "@tanstack/react-router";
import portrait from "@/assets/airport-transfers/moshe.webp";
import { mosheBarakAuthor } from "@/data/site-identity";
import { TripadvisorReviewsButton } from "@/components/TripadvisorReviewsButton";

/** Compact site-wide author attribution. Tripadvisor is an independent review platform, not an endorsement. */
export function AuthorCard({ introduction = false }: { introduction?: boolean }) {
  const author = mosheBarakAuthor;
  return <aside aria-label={introduction ? "About Moshe Barak" : "About the author"} className="mt-3 grid min-w-0 grid-cols-[3.5rem_minmax(0,1fr)] items-start gap-x-3 gap-y-2 rounded-xl border border-primary/15 bg-secondary/40 px-3 py-2.5 sm:grid-cols-[4rem_minmax(0,1fr)] sm:gap-x-4 sm:px-4 lg:grid-cols-[4rem_minmax(0,1fr)_auto] lg:items-center" data-testid="author-card">
    <img src={portrait} alt="Moshe Barak" data-photo-role="author-portrait" width={64} height={64} decoding="async" className="row-span-2 h-14 w-14 shrink-0 self-start rounded-lg object-cover object-top sm:h-16 sm:w-16 lg:row-span-1" />
    <div className="col-start-2 min-w-0">
      <p className="text-sm font-semibold leading-snug">{introduction ? "About " : "Written by "}<Link to="/about-me/" hash="moshe-barak" className="font-bold text-primary underline-offset-4 hover:underline">{author.name}</Link></p>
      <p className="mt-0.5 text-xs font-medium leading-snug text-muted-foreground">{author.role}</p>
      <p className="mt-1 text-xs leading-snug text-muted-foreground">{author.experience}{author.bio ? ` ${author.bio}` : ""}</p>
    </div>
    <TripadvisorReviewsButton className="col-start-2 mt-0.5 lg:col-start-3 lg:row-start-1 lg:mt-0" />
  </aside>;
}
