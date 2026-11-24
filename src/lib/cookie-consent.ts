export const COOKIE_CONSENT_KEY = "ith:cookie-consent:v1";
export const COOKIE_SETTINGS_EVENT = "ith:cookie-settings";
export const COOKIE_CONSENT_EVENT = "ith:cookie-consent-change";
export const CONSENT_LIFETIME = 180 * 24 * 60 * 60 * 1000;
export type OptionalCookieCategory = "analytics" | "external" | "marketing";
export type CookieCategories = Record<OptionalCookieCategory, boolean>;
export type CookieConsent = { version: 1; categories: CookieCategories; expiresAt: number };
export const NECESSARY_ONLY: CookieCategories = { analytics: false, external: false, marketing: false };
export const ALL_CATEGORIES: CookieCategories = { analytics: true, external: true, marketing: true };
export const COOKIE_CATEGORIES = [
  { id: "analytics", title: "Analytics", description: "Google Analytics and local interaction records help me understand how visitors use my site." },
  { id: "external", title: "External content", description: "Interactive maps from Google Maps and map providers load content from outside this website." },
  { id: "marketing", title: "Booking & marketing", description: "Travelpayouts widgets for Booking.com, Agoda, GetYourGuide and DiscoverCars can use cookies and referral tracking." },
] as const;

export function readStoredConsent(storage: Pick<Storage, "getItem">, now = Date.now()): CookieConsent | null {
  try {
    const value = JSON.parse(storage.getItem(COOKIE_CONSENT_KEY) || "null");
    if (value?.version !== 1 || !Number.isFinite(value.expiresAt) || value.expiresAt <= now ||
      value.expiresAt > now + CONSENT_LIFETIME + 60000 ||
      !["analytics", "external", "marketing"].every(key => typeof value.categories?.[key] === "boolean")) return null;
    return value;
  } catch { return null; }
}

let cached: CookieConsent | null = null;
let cachedValue = "";
let memoryOnly: CookieConsent | null | undefined;
const listeners = new Set<() => void>();
export function getCookieConsent(): CookieConsent | null {
  if (typeof window === "undefined") return null;
  if (memoryOnly !== undefined) return memoryOnly && memoryOnly.expiresAt > Date.now() ? memoryOnly : null;
  let next: CookieConsent | null = null;
  try { next = readStoredConsent(window.localStorage); } catch { /* Storage access can be blocked. */ }
  const serialized = JSON.stringify(next);
  if (serialized !== cachedValue) { cachedValue = serialized; cached = next; }
  return cached;
}
export function hasCookieConsent(category: OptionalCookieCategory) {
  return getCookieConsent()?.categories[category] === true;
}
function clearOptionalRecords() {
  if (typeof window === "undefined" || hasCookieConsent("analytics")) return;
  try {
    window.localStorage.removeItem("itt_outbound_clicks_v1");
    window.localStorage.removeItem("ith:google-analytics-consent:v1");
    for (const name of document.cookie.split(";").map(part => part.trim().split("=")[0])) {
      if (!/^_ga(?:_|$)|^_gid$|^_gat/.test(name ?? "")) continue;
      for (const domain of ["", window.location.hostname, "." + window.location.hostname.replace(/^www\./, "")]) {
        document.cookie = name + "=; Max-Age=0; Path=/; SameSite=Lax" + (domain ? "; Domain=" + domain : "");
      }
    }
  } catch { /* Browser storage restrictions do not prevent using the website. */ }
}
function notify() {
  clearOptionalRecords();
  listeners.forEach(listener => listener());
  window.dispatchEvent(new Event(COOKIE_CONSENT_EVENT));
}
export function saveCookieConsent(categories: CookieCategories) {
  const next: CookieConsent = { version: 1, categories: { analytics: categories.analytics === true, external: categories.external === true, marketing: categories.marketing === true }, expiresAt: Date.now() + CONSENT_LIFETIME };
  try { window.localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(next)); memoryOnly = undefined; }
  catch {
    memoryOnly = next;
    try { window.localStorage.removeItem(COOKIE_CONSENT_KEY); } catch { /* Use the explicit choice for this document only. */ }
  }
  notify();
}
function refresh(event?: StorageEvent) {
  if (event && event.key !== null && event.key !== COOKIE_CONSENT_KEY) return;
  memoryOnly = undefined;
  notify();
}
export function subscribeCookieConsent(listener: () => void) {
  listeners.add(listener);
  if (listeners.size === 1 && typeof window !== "undefined") {
    window.addEventListener("storage", refresh);
    window.addEventListener("focus", refreshOnFocus);
  }
  const timer = window.setInterval(() => { if (!getCookieConsent()) notify(); }, 60000);
  return () => {
    listeners.delete(listener);
    window.clearInterval(timer);
    if (!listeners.size) {
      window.removeEventListener("storage", refresh);
      window.removeEventListener("focus", refreshOnFocus);
    }
  };
}
function refreshOnFocus() { if (memoryOnly === undefined) notify(); }
export function openCookieSettings() { window.dispatchEvent(new Event(COOKIE_SETTINGS_EVENT)); }
