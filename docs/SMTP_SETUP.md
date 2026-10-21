# Hostinger SMTP delivery · 21 October 2026

## What is implemented

Every contact and quote form sends directly in one action: the homepage and About Moshe Barak contact forms, airport transfers and its four destination pages, private driver, and Haifa/Ashdod shore excursions. The buttons read **Send message**, **Send quote request** or **Send excursion request**. After local validation, that action makes a same-origin `POST /api/quote-request/` with the entered fields. There is no preparation step, email-app launcher or copy-message step. Filling in fields does not transmit them. The server still requires the configured runtime password and explicit delivery switch.

The server checks the runtime input types, required consent, journey/contact validation and actual body size. It constructs the subject/body itself from the form-specific formatters, including all the filled fields. Contact messages support up to 4,000 characters, including multiline and non-English text. Every email begins with **Source page: [page name]** and **Page path: [path without query parameters or fragments]**, above the enquiry. The name is captured from the visible main heading at submission, with the document title as a fallback; older clients without a name retain the path. UTC submission time and request reference remain at the end. The visitor's address is used as Reply-To. SMTP sender, envelope and recipient are fixed server-side; the client cannot choose them.

| Setting | Confirmed value |
| --- | --- |
| SMTP server | `smtp.hostinger.com` |
| Port | `587` |
| Encryption | STARTTLS required; certificate validation enabled |
| SMTP username | `reservations@israel-taxi.com` |
| From / To | `reservations@israel-taxi.com` |
| From name | Israel Travel Hub |
| Reply-To | The validated visitor email |

Nodemailer is loaded only on the server when a configured send is attempted. `secure: false` is the correct initial setting for port 587; `requireTLS: true` requires the STARTTLS upgrade before credentials/message delivery. No SMTP password is committed, logged, returned to clients, or needed to build the site.

## Runtime secrets and activation

Delivery is **disabled by default**. Both of these runtime variables must be present:

| Name | Value |
| --- | --- |
| `SMTP_PASSWORD` | The real password of the existing reservations mailbox; enter only in the hosting platform's secure secret input. |
| `QUOTE_DELIVERY_ENABLED` | The literal string `true`, set only when ready for a controlled delivery test. |

Do not use `VITE_` prefixes, put the password in source/JSON/GitHub, or paste it into chat. GitHub Actions secrets do not automatically configure the running Lovable website. Local `.env*`, `.dev.vars` and `*.local` files are ignored; an actual production secret belongs in the runtime secret store.

Official Lovable documentation says newer TanStack Start apps can run server functions and use project secrets without enabling an additional Cloud backend. Open **More → Cloud → Secrets** (the location named in its documentation) and use the secure **Add secret** dialog. If this project does not offer that dialog, stop at this configuration step and inspect the available project settings; do not enable a different backend, put the password in a frontend variable, or assume GitHub settings are a substitute. Merely having a Cloudflare build target does not provide access to the managed hosting account.

After the updated code and runtime variables are applied, visit `/api/quote-request/` on the actual site. `{"available":true}` confirms that the running server can see the password and switch; it does **not** verify SMTP connectivity, authentication or inbox delivery. `false` means form submissions will show an unavailable error and retain their fields. The forms do not perform this readiness GET or switch to manual drafts. A published Lovable URL serves a snapshot: use the normal Publish changes control if it still serves the earlier version. No Lovable AI prompt is required for editing source or entering a secret.

Then submit **one** controlled request through the site, using contact information you own. Confirm:

1. The server accepts the SMTP connection/authentication and the page shows an accepted-for-email-delivery confirmation.
2. The message actually arrives at `reservations@israel-taxi.com` (check Spam as well), contains every field, and Reply addresses the test visitor email.
3. The homepage/About contact, airport, private-driver and shore formats all work, with the correct source page name at the top, before public activation is considered complete.

If a test fails, set `QUOTE_DELIVERY_ENABLED` to `false` and diagnose the actual runtime/SMTP result without publishing credentials. No real authenticated SMTP test or inbox-delivery verification can be completed before the password is configured in the running environment. Port support and successful compilation alone are not evidence of a delivered email.

## Sending and privacy behavior

- Typing and local validation do not make a delivery request. A valid Send action posts the fields directly; invalid or disabled requests do not contact Hostinger.
- Success is returned only after SMTP accepts the fixed recipient/message. Acceptance is not a booking confirmation or a guarantee of inbox placement.
- Buttons and the source form are disabled during a send. A request reference is reused for that attempt. Concurrent/repeated submissions with the same reference and payload share a result within one server instance for ten minutes; edited payloads cannot reuse the reference.
- Ambiguous SMTP/network failures are not automatically retried or described as definite non-delivery. Errors keep every entered field in the form and display the business email address. An explicit retry of unchanged details uses the same request reference; editing the details produces a new reference. An accepted, unchanged request cannot be submitted again from the same mounted form.
- Request bodies are capped at 20 KB, cross-origin POSTs and unexpected JSON fields are rejected, and a honeypot is checked. Per-instance guards limit contacts/IPs to five attempts per ten-minute window and two concurrent sends; bounded maps keep only references, hashes, counters and results. These are **not distributed, account-wide quotas or guaranteed exactly-once delivery**. Keep the host's abuse controls active and monitor the mailbox/Hostinger plan limits before launch.
- The application does not put enquiry fields in browser storage, analytics or a database. The privacy notice describes conditional Hostinger SMTP processing and the short-lived server-memory guards. Hosting/email providers can retain their own operational records under their policies.

## Domain change

The temporary Lovable URL can use the existing Hostinger SMTP mailbox now. Moving the website to `israel-taxi.com` later does not require changing the SMTP host, username or recipient. Requests use the same-origin relative API path, so no temporary website hostname is hardcoded into the mail endpoint. Keep the Hostinger mailbox subscription and its existing email DNS records active. The website's custom-domain and indexing launch configuration are separate changes.

## References

- [Hostinger email connection details](https://www.hostinger.com/support/1575756-how-to-get-email-account-configuration-details-for-hostinger-email/)
- [Nodemailer SMTP options](https://nodemailer.com/smtp)
- [Lovable direct integrations and TanStack Start secrets](https://docs.lovable.dev/integrations/any-api)
- [Lovable secrets management](https://docs.lovable.dev/features/secrets)
- [Lovable hosting and published snapshots](https://docs.lovable.dev/features/hosting)
- [Cloudflare TCP restrictions](https://developers.cloudflare.com/workers/runtime-apis/tcp-sockets/)

## Validation

Verification results are recorded in `docs/BUILD_STATUS.md`. No claim of live SMTP authentication, inbox delivery, or deployment is made without observing it in the actual hosting environment.

The one-step delivery update checks homepage/About form submissions through the actual server validator with a mocked SMTP transport, all airport destination forms, the private-driver and both shore forms. Coverage includes all entered fields, source names, consent, 4,000-character contact messages, double submits, acceptance-only success, unavailable service, failure retention, same-reference explicit retries and new references for edits. Production credentials are never needed for automated tests. No real SMTP email was attempted during these checks. The user has confirmed adding the runtime secrets; a hosted SMTP/inbox check remains to be observed.

TypeScript and the production build passed. A local production Worker audit returned HTTP 200 for all **101 sitemap pages** and verified direct-submit buttons on all **10 form pages**, no old preparation/app/copy flow, runtime-binding readiness, rejection of cross-origin and invalid requests, and the retired About route's unchanged 404. The Worker harness used compatibility date `2026-08-06`, the newest supported by its installed workerd binary; production configuration was not changed. A browser-bundle scan found no SMTP password variable, SMTP hostname or Nodemailer code. The preview URL required authentication (HTTP 401), so this audit does not claim actual hosted SMTP authentication or inbox delivery.
