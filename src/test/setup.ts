import { saveCookieConsent, ALL_CATEGORIES } from "@/lib/cookie-consent";
import { beforeEach } from "vitest";
import "@testing-library/jest-dom/vitest";

if (typeof window !== "undefined") {
Object.defineProperty(window.HTMLElement.prototype, "scrollIntoView", {
  writable: true,
  value: () => {},
});
Object.defineProperty(window, "scrollTo", {
  writable: true,
  value: () => {},
});

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});
}

/** Existing editorial/layout tests represent the site after explicit permission.
 * Consent regressions reset this fixture and exercise unknown/necessary/selective choices.
 */
beforeEach(() => {
  if (typeof window !== "undefined") {
    saveCookieConsent(ALL_CATEGORIES);
    window.dispatchEvent(new StorageEvent("storage", { key: "ith:cookie-consent:v1" }));
  }
});
