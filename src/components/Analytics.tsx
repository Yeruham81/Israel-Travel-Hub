import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ANALYTICS_CONSENT_KEY, ANALYTICS_PREFERENCES_EVENT, analyticsEligible,
  getAnalyticsChoice, refreshAnalyticsChoice, setAnalyticsChoice, trackPageView,
  type AnalyticsChoice,
} from "@/lib/analytics";

/** Resolves after navigation; rerenders, anchors and query-only changes add no view. */
export function Analytics() {
  const path = useRouterState({ select: state => state.resolvedLocation?.pathname ?? state.location.pathname });
  const [enabled, setEnabled] = useState(false);
  const [choice, setChoice] = useState<AnalyticsChoice>("unknown");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!analyticsEligible()) return;
    setEnabled(true);
    const stored = getAnalyticsChoice();
    setChoice(stored);
    setOpen(stored === "unknown");
    const show = () => setOpen(true);
    const sync = (event: StorageEvent) => {
      if (event.key !== ANALYTICS_CONSENT_KEY && event.key !== null) return;
      const next = refreshAnalyticsChoice();
      setChoice(next);
      setOpen(next === "unknown");
    };
    window.addEventListener(ANALYTICS_PREFERENCES_EVENT, show);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(ANALYTICS_PREFERENCES_EVENT, show);
      window.removeEventListener("storage", sync);
    };
  }, []);

  useEffect(() => { trackPageView(path, document.title); }, [path, choice]);

  function choose(next: "granted" | "denied") {
    setAnalyticsChoice(next);
    setChoice(next);
    setOpen(false);
  }

  if (!enabled || !open) return null;
  return <section role="dialog" aria-labelledby="analytics-preferences-title" aria-describedby="analytics-preferences-description"
    className="fixed inset-x-4 bottom-4 z-[60] rounded-2xl border bg-card p-5 text-card-foreground shadow-xl sm:left-5 sm:right-auto sm:max-w-md">
    <h2 id="analytics-preferences-title" className="text-lg font-semibold">Google Analytics preferences</h2>
    <p id="analytics-preferences-description" className="mt-2 text-sm leading-relaxed">I use Google Analytics to understand how visitors use my site. You can choose whether to allow Google Analytics cookies.</p>
    <p className="mt-2 text-sm"><Link to="/privacy-policy/" hash="analytics-advertising" className="font-semibold text-primary underline">Privacy policy</Link></p>
    <div className="mt-4 grid grid-cols-2 gap-3">
      <button type="button" onClick={() => choose("granted")} className="rounded-lg border border-primary bg-card px-3 py-2.5 text-sm font-semibold text-primary hover:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-2">Allow analytics</button>
      <button type="button" onClick={() => choose("denied")} className="rounded-lg border border-primary bg-card px-3 py-2.5 text-sm font-semibold text-primary hover:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-2">Decline analytics</button>
    </div>
  </section>;
}

export function AnalyticsPreferencesLink() {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => { setEnabled(analyticsEligible()); }, []);
  if (!enabled) return null;
  return <li><button type="button" onClick={() => window.dispatchEvent(new Event(ANALYTICS_PREFERENCES_EVENT))}
    className="underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4">Analytics preferences</button></li>;
}
