import { describe, expect, it } from "vitest";
import { ALL_CATEGORIES, NECESSARY_ONLY, type CookieConsent } from "@/lib/cookie-consent";
import {
  ADVERTISING_INTEGRATION, GOOGLE_AD_CONSENT_DENIED, resolveAdvertisingConsent,
  type AdvertisingProviderDecision,
} from "@/lib/advertising-consent";

const choice = (categories = ALL_CATEGORIES): CookieConsent => ({ version: 2, categories, expiresAt: Date.now() + 60000 });
const ready = { enabled: true, certifiedCmpConfigured: true };
const permitted: AdvertisingProviderDecision = { status: "ready", mayRequestAds: true,
  googleConsent: { ad_storage: "granted", ad_user_data: "granted", ad_personalization: "granted" } };
const blocked = { mayRequestAds: false, googleConsent: GOOGLE_AD_CONSENT_DENIED };

describe("future advertising integration", () => {
  it("keeps ads and all Google ad purposes disabled even after Accept all today", () => {
    expect(ADVERTISING_INTEGRATION).toEqual({ enabled: false, certifiedCmpConfigured: false });
    expect(resolveAdvertisingConsent(choice())).toEqual(blocked);
    expect(resolveAdvertisingConsent(choice(), permitted)).toEqual(blocked);
  });
  it("does not infer advertising permission from analytics, maps or booking widgets", () => {
    expect(resolveAdvertisingConsent(choice({ ...ALL_CATEGORIES, advertising: false }), permitted, ready)).toEqual(blocked);
    expect(resolveAdvertisingConsent(choice(NECESSARY_ONLY), permitted, ready)).toEqual(blocked);
    expect(resolveAdvertisingConsent(null, permitted, ready)).toEqual(blocked);
  });
  it("rejects expired, invalid or legacy consent snapshots at the ad-request boundary", () => {
    expect(resolveAdvertisingConsent({ ...choice(), expiresAt: Date.now() - 1 }, permitted, ready)).toEqual(blocked);
    expect(resolveAdvertisingConsent({ ...choice(), expiresAt: NaN }, permitted, ready)).toEqual(blocked);
    expect(resolveAdvertisingConsent({ ...choice(), version: 1 } as unknown as CookieConsent, permitted, ready)).toEqual(blocked);
  });
  it("requires a configured CMP and its explicit ready decision", () => {
    expect(resolveAdvertisingConsent(choice(), permitted, { ...ready, enabled: false })).toEqual(blocked);
    expect(resolveAdvertisingConsent(choice(), permitted, { ...ready, certifiedCmpConfigured: false })).toEqual(blocked);
    expect(resolveAdvertisingConsent(choice(), null, ready)).toEqual(blocked);
    for (const status of ["loading", "error"] as const) {
      expect(resolveAdvertisingConsent(choice(), { ...permitted, status }, ready)).toEqual(blocked);
    }
    expect(resolveAdvertisingConsent(choice(), { ...permitted, mayRequestAds: false }, ready)).toEqual(blocked);
    expect(resolveAdvertisingConsent(choice(), { ...permitted, googleConsent: undefined } as unknown as AdvertisingProviderDecision, ready)).toEqual(blocked);
  });
  it("keeps personalization independent of storage and provider eligibility", () => {
    const provider: AdvertisingProviderDecision = { ...permitted, googleConsent: {
      ad_storage: "granted", ad_user_data: "denied", ad_personalization: "denied",
    } };
    expect(resolveAdvertisingConsent(choice(), provider, ready)).toEqual({ mayRequestAds: true, googleConsent: provider.googleConsent });
    expect(resolveAdvertisingConsent(choice({ ...ALL_CATEGORIES, advertising: false }), provider, ready)).toEqual(blocked);
  });
});
