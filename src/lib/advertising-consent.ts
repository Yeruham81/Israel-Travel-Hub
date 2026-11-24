import type { CookieConsent } from "@/lib/cookie-consent";

export type GoogleAdvertisingConsent = Readonly<Record<"ad_storage" | "ad_user_data" | "ad_personalization", "granted" | "denied">>;
export const GOOGLE_AD_CONSENT_DENIED: GoogleAdvertisingConsent = Object.freeze({
  ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied",
});

/** AdSense account, publisher ID, certified CMP and ad placements are not configured. */
export const ADVERTISING_INTEGRATION = Object.freeze({ enabled: false, certifiedCmpConfigured: false });
export type AdvertisingIntegration = { enabled: boolean; certifiedCmpConfigured: boolean };

/** A future certified CMP adapter supplies this decision; the category checkbox
 * is not a TCF string, vendor permission, or a substitute for that adapter.
 * The adapter must use its SDK's ad-request eligibility and Consent Mode signals.
 */
export type AdvertisingProviderDecision = {
  status: "loading" | "ready" | "error";
  mayRequestAds: boolean;
  googleConsent: GoogleAdvertisingConsent;
};

export function resolveAdvertisingConsent(
  choice: CookieConsent | null,
  provider: AdvertisingProviderDecision | null = null,
  integration: AdvertisingIntegration = ADVERTISING_INTEGRATION,
): { mayRequestAds: boolean; googleConsent: GoogleAdvertisingConsent } {
  const signals = provider?.googleConsent;
  const validSignals = signals && [signals.ad_storage, signals.ad_user_data, signals.ad_personalization]
    .every(value => value === "granted" || value === "denied");
  if (!integration.enabled || !integration.certifiedCmpConfigured ||
    choice?.version !== 2 || !Number.isFinite(choice.expiresAt) || choice.expiresAt <= Date.now() ||
    choice.categories.advertising !== true || provider?.status !== "ready" || provider.mayRequestAds !== true || !validSignals) {
    return { mayRequestAds: false, googleConsent: GOOGLE_AD_CONSENT_DENIED };
  }
  return { mayRequestAds: true, googleConsent: {
    ad_storage: provider.googleConsent.ad_storage === "granted" ? "granted" : "denied",
    ad_user_data: provider.googleConsent.ad_user_data === "granted" ? "granted" : "denied",
    ad_personalization: provider.googleConsent.ad_personalization === "granted" ? "granted" : "denied",
  } };
}
