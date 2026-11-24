export const COOKIE_CONSENT_KEY = "ith:cookie-consent:v1";
export const COOKIE_SETTINGS_EVENT = "ith:cookie-settings";
export const COOKIE_CONSENT_EVENT = "ith:cookie-consent-change";
export const CONSENT_LIFETIME = 180 * 24 * 60 * 60 * 1000;
export type OptionalCookieCategory = "analytics" | "external" | "marketing" | "advertising";
export type CookieCategories = Record<OptionalCookieCategory, boolean>;
export type CookieConsent = { version: 2; categories: CookieCategories; expiresAt: number };
export const NECESSARY_ONLY: CookieCategories = { analytics: false, external: false, marketing: false, advertising: false };
export const ALL_CATEGORIES: CookieCategories = { analytics: true, external: true, marketing: true, advertising: true };
export const COOKIE_CATEGORIES = [
  { id: "analytics", title: "Analytics", description: "Measures website traffic and visitor interactions." },
  { id: "external", title: "External content", description: "Enables embedded content and interactive features." },
  { id: "marketing", title: "Booking widgets", description: "Supports booking tools and referral tracking." },
  { id: "advertising", title: "Advertising", description: "Supports advertising, ad measurement and personalization." },
] as const;

export function readStoredConsent(storage: Pick<Storage, "getItem">, now = Date.now()): CookieConsent | null {
  try {
    const value = JSON.parse(storage.getItem(COOKIE_CONSENT_KEY) || "null");
    if (![1, 2].includes(value?.version) || !Number.isFinite(value.expiresAt) || value.expiresAt <= now ||
      value.expiresAt > now + CONSENT_LIFETIME + 60000 ||
      !["analytics", "external", "marketing"].every(key => typeof value.categories?.[key] === "boolean") ||
      (value.version === 2 && typeof value.categories.advertising !== "boolean")) return null;
    // An earlier Accept all covered maps, analytics and booking widgets only.
    // Preserve those choices and their original expiry, without granting ads.
    return { version: 2, expiresAt: value.expiresAt, categories: {
      analytics: value.categories.analytics,
      external: value.categories.external,
      marketing: value.categories.marketing,
      advertising: value.version === 2 && value.categories.advertising === true,
    } };
  } catch { return null; }
}

let cached: CookieConsent | null = null;
let cachedValue = "";
let memoryOnly: CookieConsent | null | undefined;
const listeners = new Set<() => void>();
let expiryTimer: ReturnType<typeof setTimeout> | undefined;
function scheduleExpiry() {
  clearTimeout(expiryTimer);
  const value = getCookieConsent();
  if (value && listeners.size) expiryTimer = setTimeout(notify, Math.min(2147483647, Math.max(1, value.expiresAt - Date.now() + 1)));
}
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
  scheduleExpiry();
  listeners.forEach(listener => listener());
  window.dispatchEvent(new Event(COOKIE_CONSENT_EVENT));
}
export function saveCookieConsent(categories: CookieCategories) {
  const next: CookieConsent = { version: 2, categories: { analytics: categories.analytics === true, external: categories.external === true, marketing: categories.marketing === true, advertising: categories.advertising === true }, expiresAt: Date.now() + CONSENT_LIFETIME };
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
  scheduleExpiry();
  return () => {
    listeners.delete(listener);
    if (!listeners.size) {
      clearTimeout(expiryTimer);
      window.removeEventListener("storage", refresh);
      window.removeEventListener("focus", refreshOnFocus);
    }
  };
}
function refreshOnFocus() { if (memoryOnly === undefined) notify(); }
export function openCookieSettings() { window.dispatchEvent(new Event(COOKIE_SETTINGS_EVENT)); }
