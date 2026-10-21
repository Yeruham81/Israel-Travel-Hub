# Brevo transactional form email · 21 October 2026

## Current implementation

All ten existing contact/quote form pages retain their direct Send action, field validation and shared same-origin `POST /api/quote-request/`. No form layout, route, booking behavior or publication setting was changed. Filling fields does not transmit them.

The shared service validates input, consent, source title/path and Reply-To, and generates the subject and complete plain-text message, including all fields, source page/title, UTC submission time and request reference. Clients cannot set sender or recipient.

The server-only transport calls `POST https://api.brevo.com/v3/smtp/email` using global fetch with `api-key`, `accept: application/json` and `content-type: application/json` headers. Sender is **Israel Travel Hub <reservations@israel-taxi.com>**, recipient is **reservations@israel-taxi.com**, and Reply-To is the validated visitor email. No marketing contact list or visitor confirmation email is created.

Only **HTTP 201 with a nonempty messageId** counts as Brevo acceptance. The provider reference/body is not returned or logged. Acceptance is not proof of inbox placement or a booking. The existing confirmation remains an accepted-for-email-delivery message with the website request reference.

## Runtime secrets and preview testing

- `BREVO_API_KEY`: already listed in Lovable project Secrets. This uses the owner's explicitly requested direct API credential, not a connector gateway key. It is read only server-side at request time. Never use a VITE prefix, commit it, or paste it into chat.
- `QUOTE_DELIVERY_ENABLED`: also listed in project Secrets. Its value must be the literal string `true`. A name listing does not verify its value. If readiness is false, open **Project Settings → Secrets**, set/update **QUOTE_DELIVERY_ENABLED** to **true**, and retain the existing Brevo key.
- `SMTP_PASSWORD` is absent and no longer used; Nodemailer and its type dependency have been removed.

Open `/api/quote-request/` in the current Lovable preview. The response contains only `available`; true requires both the enabled switch and a present Brevo key. This checks configuration only, not credential validity, sender verification, quota or delivery. Nothing was published or changed on the custom domain.

Before the owner sends a controlled request, confirm Brevo permits **reservations@israel-taxi.com** as a transactional sender, verify the sender/domain as required in Brevo, and ensure transactional sending and account quota are available. Sender/domain/account status has not been checked by this migration.

Then the owner may submit one form with their own details, check Brevo's transactional logs and the reservations inbox (including Spam), confirm every field/source heading arrived and Reply-To targets the visitor. No real message was sent by the implementation tests. Preview uses the current changes; a later production update requires a separate explicit publication decision.

## Preserved safeguards and diagnostics

- 20,000-byte actual body cap, strict schema, same-origin JSON POST, required consent and honeypot remain unchanged.
- Per-instance ten-minute idempotency and hashed contact/IP limits, five attempts per window, two concurrent sends and bounded maps remain unchanged. These are not distributed quotas or guaranteed exactly-once delivery. Identical retries share the previous result; changed details require a new reference. No provider retries occur.
- AbortController cancels after 20 seconds, including response processing. Network/timeouts can be ambiguous; fields remain and the user is told to confirm before resending. The browser's existing timeout and duplicate prevention are unchanged.
- Sanitized logs contain only `quote-delivery.failed`, website request UUID, allowlisted delivery code and optional numeric provider HTTP status. No key, response body, provider error message, visitor fields or provider messageId is logged.
- Codes: `BREVO_UNAUTHORIZED` (401), `BREVO_FORBIDDEN` (403), `BREVO_SENDER` (400 sender validation), `BREVO_RATE_LIMIT` (429), `BREVO_REJECTED` (other non-201 rejection), `BREVO_PROVIDER` (5xx or unknown service exception), `BREVO_RESPONSE` (invalid 201 acknowledgement), `BREVO_TIMEOUT`, `BREVO_NETWORK`. Existing origin/endpoint/browser HTTP and request codes remain separate. Sender-specific classification examines only 400 validation privately; unsupported error formats remain generic rejection.
- The application does not add enquiry storage or new backend infrastructure. Brevo and hosting/mailbox providers process/retain their own records; the privacy notice now identifies Brevo. Transient guard maps retain hashes/references/results, not message bodies.

## References

- [Brevo transactional email API](https://developers.brevo.com/reference/sendtransacemail)
- [Lovable secrets](https://docs.lovable.dev/features/secrets)

Automated migration results are recorded in BUILD_STATUS.md. Mock acceptance is not live end-to-end delivery verification.