import { useSyncExternalStore } from "react";
import { getCookieConsent, subscribeCookieConsent } from "@/lib/cookie-consent";
export function useCookieConsent() {
  return useSyncExternalStore(subscribeCookieConsent, getCookieConsent, () => null);
}
