import { formatCheckDate } from "@/data/registry";

/** Keep the precise machine-readable date while displaying only month and year. */
export function PageUpdated({ date }: { date: string }) {
  return <p className="mt-4 text-xs text-muted-foreground">Updated <time dateTime={date}>{formatCheckDate(date)}</time></p>;
}
