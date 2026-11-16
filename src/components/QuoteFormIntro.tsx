import { airportTransferPhotos } from "@/data/airportTransfers";

type QuoteFormIntroProps = {
  headingId: string;
  eyebrow: string;
  title: string;
  description: string;
};

/** Compact full-width introduction for detailed inquiry forms. */
export function QuoteFormIntro({ headingId, eyebrow, title, description }: QuoteFormIntroProps) {
  const photo = airportTransferPhotos["moshe"]!;
  return (
    <div data-testid="quote-form-intro" className="flex items-start gap-4 border-b bg-navy px-5 py-5 text-navy-foreground sm:items-center sm:gap-5 sm:px-7 sm:py-6">
      <img src={photo.src} alt={photo.alt} width={150} height={200} loading="lazy" decoding="async" className="h-20 w-16 shrink-0 rounded-lg object-cover object-top sm:h-24 sm:w-20" />
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-widest text-navy-foreground/80">{eyebrow}</p>
        <h2 id={headingId} className="mt-1 text-xl font-semibold leading-tight sm:text-2xl">{title}</h2>
        <p className="mt-1 max-w-3xl text-sm leading-relaxed text-navy-foreground/90 sm:text-base">{description}</p>
      </div>
    </div>
  );
}
