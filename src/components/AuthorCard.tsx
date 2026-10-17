import { Link } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import portrait from "@/assets/airport-transfers/moshe.webp";
import { mosheBarakAuthor } from "@/data/registry";

/** One shared, independent author introduction; reviews concern Moshe's own service. */
export function AuthorCard({ introduction = false }: { introduction?: boolean }) {
  const author = mosheBarakAuthor;
  return <aside aria-label={introduction ? "Meet Moshe Barak" : "About the author"} className="mt-6 flex items-start gap-4 rounded-2xl border border-primary/20 bg-secondary/50 p-4 sm:items-center sm:gap-5 sm:p-5" data-testid="author-card">
    <img src={portrait} alt="Moshe Barak" width={80} height={100} decoding="async" className="h-20 w-16 shrink-0 rounded-xl object-cover object-top sm:h-25 sm:w-20" />
    <div className="min-w-0 flex-1">
      <p className="text-lg font-semibold leading-tight">{introduction ? "Meet " : "Written by "}<Link to="/about/" hash="moshe-barak" className="font-bold text-primary underline-offset-4 hover:underline">{author.name}</Link></p>
      <p className="mt-1 text-xs font-medium text-muted-foreground">{author.role}</p>
      <p className="mt-2 text-sm leading-relaxed"><strong className="font-semibold">{author.experience}</strong> {author.bio}</p>
      <a href={author.reviewsUrl} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary underline underline-offset-4">Read traveler reviews on Tripadvisor<ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden /><span className="sr-only"> (opens in a new tab)</span></a>
    </div>
  </aside>;
}
