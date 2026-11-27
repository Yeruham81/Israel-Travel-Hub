import { Check } from "lucide-react";

/** Consistent, lightly highlighted booking checklists across accommodation guides. */
export type StayBookingTip = string | { title: string; text: string };
export type StayBookingGroup = { title: string; items: StayBookingTip[] };

export function StayBookingChecklist({
  groups,
  testId,
}: {
  groups: StayBookingGroup[];
  testId?: string;
}) {
  return (
    <div className="mt-4 grid gap-4 sm:grid-cols-2" data-testid={testId}>
      {groups.map((group) => (
        <div
          key={group.title}
          className="min-w-0 rounded-2xl border border-border/80 bg-secondary/35 p-4 sm:p-5"
        >
          <h3 className="text-base font-semibold text-foreground">{group.title}</h3>
          <ul className="mt-3 space-y-3">
            {group.items.map((tip, index) => (
              <li
                key={typeof tip === "string" ? tip : `${tip.title}-${index}`}
                className="flex items-start gap-3"
              >
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-primary/10 text-primary">
                  <Check className="h-4 w-4" aria-hidden />
                </span>
                <span className="text-sm leading-relaxed text-muted-foreground">
                  {typeof tip === "string" ? (
                    tip
                  ) : (
                    <>
                      <strong className="font-semibold text-foreground">{tip.title}.</strong>{" "}
                      {tip.text}
                    </>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
