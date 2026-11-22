import { ChevronDown } from "lucide-react";

/** Keep image attribution available in one collapsed block at the foot of a page. */
export type PagePhotoCredit = {
  label: string;
  credit?: string;
  sourceUrl?: string;
  licenseUrl?: string;
};

export function PhotoCreditsDisclosure({ entries }: { entries: PagePhotoCredit[] }) {
  const credits = entries.filter((entry) => entry.credit || entry.sourceUrl || entry.licenseUrl);
  if (!credits.length) return null;
  return <section aria-label="Photo credits and licences" className="mt-6">
    <details className="group/photo-credits rounded-xl border bg-card text-sm text-muted-foreground">
      <summary className="cursor-pointer list-none rounded-xl px-4 py-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary [&::-webkit-details-marker]:hidden">
        <span className="flex items-center justify-between gap-3 font-semibold text-foreground">
          Photo credits &amp; licences
          <ChevronDown className="h-4 w-4 shrink-0 transition-transform group-open/photo-credits:rotate-180" aria-hidden="true" />
        </span>
      </summary>
      <ul className="space-y-2 border-t px-4 py-4 text-xs leading-relaxed">
        {credits.map((entry, index) => <li key={entry.label + index}>
          <strong className="text-foreground">{entry.label}:</strong>{" "}
          {entry.credit || "See the original source"}
          {entry.sourceUrl && <> · <a href={entry.sourceUrl} target="_blank" rel="noopener noreferrer" className="font-medium text-primary underline underline-offset-2">Photo source</a></>}
          {entry.licenseUrl && <> · <a href={entry.licenseUrl} target="_blank" rel="noopener noreferrer" className="font-medium text-primary underline underline-offset-2">Licence</a></>}
        </li>)}
      </ul>
    </details>
  </section>;
}
