import { airportTransferPhotos } from "@/data/airportTransfers";
import { TripadvisorReviewsButton } from "@/components/TripadvisorReviewsButton";

type QuoteFormIntroProps = {
  headingId: string;
  eyebrow: string;
  title: string;
  description: string;
  showTripadvisorReviews?: boolean;
};

/** Compact full-width introduction for detailed inquiry forms. */
export function QuoteFormIntro({ headingId, eyebrow, title, description, showTripadvisorReviews = false }: QuoteFormIntroProps) {
  const photo = airportTransferPhotos["moshe"]!;
  return (
    <div data-testid="quote-form-intro" className={`${showTripadvisorReviews ? "grid grid-cols-[auto_minmax(0,1fr)] gap-x-3 gap-y-3 sm:flex sm:flex-wrap sm:gap-5" : "flex flex-wrap gap-4 sm:gap-5"} items-start border-b bg-navy px-5 py-5 text-navy-foreground sm:items-center sm:px-7 sm:py-6`}>
      <div className={`${showTripadvisorReviews ? "contents sm:flex" : "flex"} min-w-0 flex-1 items-start gap-4 sm:items-center`}>
        <img src={photo.src} alt={photo.alt} width={150} height={200} loading="lazy" decoding="async" className={`${showTripadvisorReviews ? "col-start-1 row-start-1" : ""} h-20 w-16 shrink-0 rounded-lg object-cover object-top sm:h-24 sm:w-20`} />
        <div className={`${showTripadvisorReviews ? "col-span-2 row-start-2" : ""} min-w-0 flex-1`}>
          <p className="text-xs font-semibold uppercase tracking-widest text-navy-foreground/80">{eyebrow}</p>
          <h2 id={headingId} className="mt-1 text-xl font-semibold leading-tight sm:text-2xl">{title}</h2>
          <p className="mt-1 max-w-3xl text-sm leading-relaxed text-navy-foreground/90 sm:text-base">{description}</p>
        </div>
      </div>
      {showTripadvisorReviews && <div className="col-start-2 row-start-1 flex w-full justify-end sm:col-auto sm:row-auto lg:ml-auto lg:w-auto">
        <TripadvisorReviewsButton />
      </div>}
    </div>
  );
}
