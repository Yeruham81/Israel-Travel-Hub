import { mosheBarakAuthor } from "@/data/site-identity";

/** The same approved reviews link and visual treatment across the site. */
export function TripadvisorReviewsButton({ className = "" }: { className?: string }) {
  return <a
    href={mosheBarakAuthor.reviewsUrl}
    target="_blank"
    rel="noopener noreferrer"
    className={`inline-flex w-fit max-w-full min-w-0 items-center gap-2.5 rounded-lg border border-[#25996c] bg-[#34E0A1] px-3 py-2 text-xs font-semibold text-[#123a2a] transition-colors hover:border-[#217c59] hover:bg-[#2dd795] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${className}`}
  >
    <span aria-hidden="true" className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-[#34E0A1]">
      <img src="/images/tripadvisor-owl-black.svg" alt="" width={28} height={28} loading="lazy" decoding="async" className="h-7 w-7 object-contain" />
    </span>
    <span className="flex flex-col items-start whitespace-nowrap leading-tight">
      <span>Read Reviews on</span>{" "}
      <span className="text-sm font-bold">TripAdvisor</span>
    </span>
    <span className="sr-only"> for Moshe Barak (opens in a new tab)</span>
  </a>;
}
