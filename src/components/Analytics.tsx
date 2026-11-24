import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { refreshAnalyticsChoice, trackPageView } from "@/lib/analytics";
import { useCookieConsent } from "@/hooks/use-cookie-consent";
import {
  ALL_CATEGORIES, NECESSARY_ONLY, COOKIE_CATEGORIES, COOKIE_SETTINGS_EVENT,
  getCookieConsent, openCookieSettings, saveCookieConsent, type CookieCategories,
} from "@/lib/cookie-consent";

/** One navigation owner for GA4; the global preference applies to every optional provider. */
export function Analytics() {
  const path = useRouterState({ select: state => state.resolvedLocation?.pathname ?? state.location.pathname });
  const consent = useCookieConsent();
  const [ready, setReady] = useState(false);
  const [opened, setOpened] = useState(false);
  const [customize, setCustomize] = useState(false);
  const [selection, setSelection] = useState<CookieCategories>({ ...NECESSARY_ONLY });

  useEffect(() => {
    setReady(true);
    const show = () => {
      setSelection({ ...(getCookieConsent()?.categories ?? NECESSARY_ONLY) });
      setCustomize(true);
      setOpened(true);
    };
    window.addEventListener(COOKIE_SETTINGS_EVENT, show);
    if (window.location.hash === "#cookie-settings") show();
    return () => window.removeEventListener(COOKIE_SETTINGS_EVENT, show);
  }, []);

  useEffect(() => {
    refreshAnalyticsChoice();
    trackPageView(path, document.title);
  }, [path, consent]);

  function choose(categories: CookieCategories) {
    saveCookieConsent(categories);
    setOpened(false);
    setCustomize(false);
  }
  if (!ready || (consent && !opened)) return null;
  const buttonClass = "rounded-lg border border-primary bg-card px-3 py-2.5 text-sm font-semibold text-primary hover:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-2";
  return <section role="dialog" aria-labelledby="cookie-preferences-title" aria-describedby="cookie-preferences-description"
    className="fixed inset-x-3 bottom-3 z-[80] max-h-[85dvh] overflow-y-auto rounded-2xl border-2 border-primary bg-card p-5 text-card-foreground shadow-xl sm:left-5 sm:right-auto sm:w-[32rem] sm:max-w-[calc(100vw-2.5rem)]">
    <h2 id="cookie-preferences-title" className="text-lg font-semibold">Cookie preferences</h2>
    <p id="cookie-preferences-description" className="mt-2 text-sm leading-relaxed">This website uses cookies and similar technologies to improve your experience, analyze traffic and support marketing.{" "}<Link to="/privacy-policy/" hash="analytics-advertising" className="font-semibold text-primary underline">Privacy policy</Link></p>
    <div className="mt-4 grid gap-2 sm:grid-cols-3">
      <button type="button" onClick={() => choose(ALL_CATEGORIES)} className={buttonClass}>Accept all</button>
      <button type="button" onClick={() => choose(NECESSARY_ONLY)} className={buttonClass}>Reject all</button>
      <button type="button" aria-expanded={customize} aria-controls="cookie-categories" onClick={() => { setSelection({ ...(consent?.categories ?? NECESSARY_ONLY) }); setCustomize(true); }} className={buttonClass}>Customize</button>
    </div>
    {customize && <div id="cookie-categories" className="mt-4 space-y-3 border-t pt-4">
      <div className="rounded-lg border p-3 text-sm"><p className="font-semibold">Necessary <span className="font-normal text-muted-foreground">— Always on</span></p><p className="mt-1 text-muted-foreground">Required for site functionality, security and saving your preferences.</p></div>
      {COOKIE_CATEGORIES.map(category => <label key={category.id} className="flex cursor-pointer items-start gap-3 rounded-lg border p-3 text-sm">
        <input type="checkbox" className="mt-1 h-4 w-4 shrink-0 accent-primary" checked={selection[category.id]} onChange={event => setSelection(current => ({ ...current, [category.id]: event.target.checked }))} />
        <span><span className="block font-semibold">{category.title}</span><span className="mt-1 block text-muted-foreground">{category.description}</span></span>
      </label>)}
      <button type="button" onClick={() => choose(selection)} className={buttonClass + " w-full"}>Save preferences</button>
    </div>}
    {opened && consent && <button type="button" onClick={() => setOpened(false)} className="mt-3 text-sm underline">Cancel</button>}
  </section>;
}

export function AnalyticsPreferencesLink() {
  return <li><button type="button" onClick={openCookieSettings} className="underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4">Cookie settings</button></li>;
}
