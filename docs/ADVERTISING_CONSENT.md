# Advertising consent foundation

Advertising is inactive. No publisher ID, AdSense SDK, ad slot, CMP script or
advertising request has been added. GA4 remains an independent, production-only
integration and its advertising consent signals remain denied.

## Current categories

| Stored key | Visitor label | Purpose |
| --- | --- | --- |
| analytics | Analytics | GA4 and optional local interaction records |
| external | External content | Interactive maps |
| marketing | Booking widgets | Travelpayouts booking widgets; legacy key retained |
| advertising | Advertising | Future ads, including Google AdSense |

The existing three top-level choices and footer Cookie settings remain in use.
The advertising preference is independent of the other three categories. It is
not an AdSense authorization or a substitute for vendor/purpose consent.

Records now use schema version 2 under the existing storage key. Reading a valid
version-1 record preserves its original categories and expiry and sets advertising
to false, including when all former categories were true. Version-1 read migration
does not write storage, extend expiry or infer approval of the new purpose.
The standalone map/widget loader accepts both valid schemas, but is limited to
external content and booking widgets; it cannot be used to load an ad tag.

## Connecting AdSense later

1. Configure the actual publisher account, approved site and placements. Keep ads
   disabled on preview hosts. Do not insert an ad tag as part of verification or
   load it automatically from an editorial widget or GA4 initializer.
2. Select a Google-certified CMP with IAB TCF support. Google's own European
   regulations message in AdSense Privacy & messaging is one option. Its consent
   mode settings can provide advertising and analytics signals. Google's current
   policy requires a certified TCF CMP for personalized ads in the EEA, UK and
   Switzerland; check the current regional requirements at activation.
3. Use the CMP's documented SDK and configured vendor/purpose controls to obtain
   both its ad-request eligibility and the separate ad_storage, ad_user_data and
   ad_personalization signals. Do not manufacture a TC string, use a Boolean as
   TCF consent, or infer ad personalization from the site category alone.
4. Implement a live adapter for AdvertisingProviderDecision. Only then change
   ADVERTISING_INTEGRATION and connect the adapter to resolveAdvertisingConsent.
   Request an ad only when mayRequestAds is true. Missing/invalid decisions,
   loading/errors, category rejection or an unconfigured CMP keep ads blocked.
   Consent Mode flags by themselves do not authorize an AdSense request.
5. Integrate the CMP into the existing consent flow and footer reopening control
   so visitors have one coherent settings flow. CMP choices and site categories
   must synchronize on grant, withdrawal, expiry and cross-tab changes. Withdrawing
   advertising permission must stop requests, dispose active ad components and
   update Google consent signals before any further event or navigation. Keep
   necessary-only browsing and ordinary outbound links available.
6. Identify the actual providers and purposes in the privacy notice and request
   fresh provider/purpose choices at activation. Do not reuse today's preference
   as blanket consent for subsequently enabled or unidentified ad vendors.
7. Verify real network behaviour before and after consent, ad loading on a permitted
   production host, withdrawal, expiry and regional CMP behavior. Keep GA4's single
   page-view owner and the preview exclusion intact. Enable no ad-personalization
   or Google signals simply because Analytics has been accepted.

Official references (checked 24 November 2026):

- https://support.google.com/adsense/answer/13554116?hl=en
- https://support.google.com/adsense/answer/16053245?hl=en
- https://developers.google.com/tag-platform/security/guides/consent
