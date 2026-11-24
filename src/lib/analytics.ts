import { COOKIE_CONSENT_KEY, CONSENT_LIFETIME, NECESSARY_ONLY, readStoredConsent, getCookieConsent, saveCookieConsent } from "@/lib/cookie-consent";
import { GOOGLE_AD_CONSENT_DENIED } from "@/lib/advertising-consent";
import { PRODUCTION_CANONICAL_ORIGIN, SITE_CONFIG } from "@/lib/site";

export const GA4_MEASUREMENT_ID = "G-N5ZDWXDZ1P";
export const ANALYTICS_CONSENT_KEY = COOKIE_CONSENT_KEY;
export const ANALYTICS_PREFERENCES_EVENT = "ith:analytics-preferences";
const SCRIPT_ID = "ith-ga4";
export type AnalyticsChoice = "unknown" | "granted" | "denied";
type Gtag = (...args: unknown[]) => void;
type AnalyticsWindow = Window & { gtag?: Gtag; dataLayer?: unknown[] };
type LaunchConfig = { origin: string; indexable: boolean };

/** One controller per document: no tag, queue or Google request on a preview. */
export function createAnalytics(win: Window, config: LaunchConfig) {
  const browser = win as AnalyticsWindow;
  const eligible = config.indexable && config.origin === PRODUCTION_CANONICAL_ORIGIN
    && win.location.origin === PRODUCTION_CANONICAL_ORIGIN;
  let initialized = false;
  let currentPage: { path: string; title: string } | null = null;
  let lastPage: string | null = null;
  const leads = new Set<string>();
  // Preserve ordinary campaign attribution without forwarding arbitrary URL fields.
  const campaign: Record<string, string> = {};
  if (eligible) {
    const search = new URLSearchParams(win.location.search);
    for (const [query, field] of Object.entries({ utm_source: "campaign_source", utm_medium: "campaign_medium", utm_campaign: "campaign_name", utm_id: "campaign_id", utm_content: "campaign_content", utm_term: "campaign_term" })) {
      const value = search.get(query);
      if (value && /^[\p{L}\p{N} _./:+-]{1,120}$/u.test(value)) campaign[field] = value;
    }
  }

  function readChoice(): AnalyticsChoice {
    if (!eligible) return "unknown";
    try {
      const value = win === globalThis.window ? getCookieConsent() : readStoredConsent(win.localStorage);
      if (value) return value.categories.analytics ? "granted" : "denied";
    } catch { /* A storage restriction leaves optional analytics off. */ }
    return "unknown";
  }
  let choice = readChoice();

  function disable(value: boolean) {
    (win as unknown as Record<string, unknown>)[`ga-disable-${GA4_MEASUREMENT_ID}`] = value;
  }

  function cleanPath(path: string) {
    try {
      const url = new URL(path, PRODUCTION_CANONICAL_ORIGIN);
      return url.origin === PRODUCTION_CANONICAL_ORIGIN ? url.pathname : null;
    } catch { return null; }
  }

  function firstReferrer() {
    try { return new URL(win.document.referrer).origin; }
    catch { return ""; }
  }

  function initialize() {
    if (initialized || !eligible || choice !== "granted") return;
    initialized = true;
    disable(false);
    const layer = browser.dataLayer ??= [];
    // Keep the standard gtag arguments queue, but discard later optional events
    // after consent withdrawal, including existing contact/affiliate helpers.
    browser.gtag = function (...args: unknown[]) {
      if (choice === "granted" || args[0] === "consent") layer.push(arguments);
    };
    browser.gtag("consent", "default", {
      analytics_storage: "denied", ...GOOGLE_AD_CONSENT_DENIED,
    });
    browser.gtag("consent", "update", { analytics_storage: "granted", ...GOOGLE_AD_CONSENT_DENIED });
    browser.gtag("js", new Date());
    browser.gtag("config", GA4_MEASUREMENT_ID, {
      ...campaign,
      send_page_view: false,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      page_location: PRODUCTION_CANONICAL_ORIGIN + (currentPage?.path ?? win.location.pathname),
      page_referrer: firstReferrer(),
    });
    const script = win.document.createElement("script");
    script.id = SCRIPT_ID;
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`;
    win.document.head.appendChild(script);
  }

  function sendCurrentPage() {
    if (!eligible || choice !== "granted" || !currentPage || lastPage === currentPage.path) return;
    initialize();
    const details = {
      page_location: PRODUCTION_CANONICAL_ORIGIN + currentPage.path,
      page_title: currentPage.title,
      page_referrer: lastPage ? PRODUCTION_CANONICAL_ORIGIN + lastPage : firstReferrer(),
    };
    // Also sanitize location/referrer for Enhanced Measurement's other events.
    browser.gtag?.("set", details);
    browser.gtag?.("event", "page_view", { ...details, send_to: GA4_MEASUREMENT_ID });
    lastPage = currentPage.path;
  }

  function applyChoice(next: AnalyticsChoice) {
    choice = next;
    if (!eligible) return;
    disable(next !== "granted");
    if (initialized) browser.gtag?.("consent", "update", { analytics_storage: next === "granted" ? "granted" : "denied", ...GOOGLE_AD_CONSENT_DENIED });
    if (next === "granted") sendCurrentPage();
  }

  return {
    eligible,
    getChoice: () => choice,
    setChoice(next: "granted" | "denied") {
      if (!eligible) return;
      try {
        if (win === globalThis.window) saveCookieConsent({ ...(getCookieConsent()?.categories ?? NECESSARY_ONLY), analytics: next === "granted" });
        else win.localStorage.setItem(ANALYTICS_CONSENT_KEY, JSON.stringify({ version: 2, categories: { ...NECESSARY_ONLY, analytics: next === "granted" }, expiresAt: Date.now() + CONSENT_LIFETIME }));
      } catch {
        // A failed write must not leave an older grant active on the next visit.
        try { win.localStorage.removeItem(ANALYTICS_CONSENT_KEY); } catch { /* Storage is unavailable. */ }
      }
      applyChoice(next);
    },
    refreshChoice() { applyChoice(readChoice()); return choice; },
    page(path: string, title: string) {
      const safePath = cleanPath(path);
      if (!safePath) return;
      currentPage = { path: safePath, title };
      sendCurrentPage();
    },
    lead(kind: "transfer" | "driver" | "contact" | "shore", requestId: string) {
      if (!eligible || choice !== "granted" || leads.has(requestId)) return;
      initialize();
      leads.add(requestId);
      // The reference is used only for local deduplication, never sent to GA4.
      browser.gtag?.("event", "generate_lead", { send_to: GA4_MEASUREMENT_ID, form_type: kind });
    },
  };
}

let controller: ReturnType<typeof createAnalytics> | undefined;
function client() {
  if (typeof window === "undefined") return null;
  return controller ??= createAnalytics(window, SITE_CONFIG);
}
export const analyticsEligible = () => client()?.eligible ?? false;
export const getAnalyticsChoice = () => client()?.getChoice() ?? "unknown";
export const setAnalyticsChoice = (choice: "granted" | "denied") => client()?.setChoice(choice);
export const refreshAnalyticsChoice = () => client()?.refreshChoice() ?? "unknown";
export const trackPageView = (path: string, title: string) => { try { client()?.page(path, title); } catch { /* Measurement must not interrupt browsing. */ } };
export const trackAcceptedEnquiry = (kind: "transfer" | "driver" | "contact" | "shore", requestId: string) => {
  try { client()?.lead(kind, requestId); }
  catch { /* Analytics must never affect delivery or its success message. */ }
};
