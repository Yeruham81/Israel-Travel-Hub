# GA4 readiness — 24 November 2026

The existing stream is **Moshe Barak GA4**, URL `https://www.israel-taxi.com`,
stream ID `5291869065`, measurement ID `G-N5ZDWXDZ1P`. The owner supplied
screenshots confirming these values. Keep this existing property and history.

## Account setting required before activation

Enhanced measurement → Page views → Advanced settings → **Page changes based
on browser history events must stay OFF**. Save if changed. The supplied
screenshot shows the checkbox unchecked; a screenshot alone cannot confirm
that an edited setting was saved.

The page-load checkbox can stay selected. The one code-owned tag config uses
`send_page_view: false` on every full document load. The shared router component
owns the manual `page_view` on first eligible view and resolved pathname changes.
Same-path rerenders, hydration, query strings and anchors do not create views;
back/forward visits to a different path do. Do not install a second GA snippet,
GTM container or automatic history-view handler for this stream.

## Activation and consent

Analytics and its preference control are enabled only when the build is
production/indexable **and** the browser is on the exact permanent www HTTPS
origin. The Hostinger temporary site, local development and Lovable previews
remain untracked, even if a stored preference is present.

The initial preference is unknown. Basic consent mode keeps the Google script
unloaded until explicit approval. Allow and Decline have equal button styling.
The footer reopens preferences; the choice expires after 180 days. A withdrawal
sets `ga-disable-G-N5ZDWXDZ1P`, denies analytics storage, and discards later custom
events. Changes/clearing in another tab update the current tab's choice.
Advertising consent remains denied; Google signals/personalisation are disabled.
The preference concerns GA4 only, not independent affiliate widgets.

Custom page views omit query strings/fragments, use static page titles and
record the previous clean page address (or the original referrer's origin).
Standard UTM campaign fields are retained separately, with bounded plain-text
values; arbitrary contact/query fields and URL fragments are not forwarded.
The shared form hook emits `generate_lead` only after matching server acceptance,
deduplicated locally by request reference. GA4 receives only `form_type`, never
the reference, the enquiry fields, email address, name or journey information.

## Cutover verification still required

This change does not switch DNS, publish to the old production webroot or enable
indexing. End-to-end collection into the real GA4 property is deliberately not
tested from staging. At cutover:

1. Verify the saved history-view setting above and the production build flags.
2. With browser consent granted, check Tag Assistant/network and DebugView:
   exactly one `page_view` on load and each path transition, including back and
   forward; zero extra views for rerenders or contact anchors.
3. Check one accepted enquiry emits one `generate_lead`, including when the same
   submission is clicked again. A rejected/ambiguous response emits none.
4. Verify Unknown/Decline load no GA script, and withdrawal stops later collection.
5. Review optional automatic Form interactions/Site search and existing event
   creation rules in GA4. The business lead event is `generate_lead`; automatic
   `form_submit` is not proof of accepted enquiry delivery. Mark the intended
   event as a key event in GA4 if enquiry conversion reporting is wanted.
6. Keep existing GSC DNS verification and inspect Bing verification separately.

Sources: Google's [manual pageview guidance](https://developers.google.com/analytics/devguides/collection/ga4/views),
[basic consent mode](https://developers.google.com/tag-platform/security/guides/consent?consentmode=basic)
and [privacy controls](https://developers.google.com/tag-platform/security/guides/privacy).
