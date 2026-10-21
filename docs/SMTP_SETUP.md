# Hostinger SMTP delivery · 21 October 2026

## What is implemented

All three quote forms (airport transfers and destination pages, private driver, and Haifa/Ashdod shore excursions) use the shared request preview. Preparing a request keeps its fields in browser memory. The preview makes a read-only `GET /api/quote-request/` readiness check without transmitting enquiry fields. When direct delivery is enabled, a separate **Send request to Moshe** action submits the reviewed snapshot to the same-origin server endpoint. The existing email-app and copy alternatives remain available until a message is accepted.

The server checks the runtime input types, required consent, journey validation and actual body size. It constructs the subject/body itself from the existing form-specific formatters, including all the filled fields. Every email begins with **Source page: [page name]** and **Page path: [path without query parameters or fragments]**, above the enquiry. The name is captured from the visible main heading when the preview opens, with the document title as a fallback; older clients without a name retain the path. This same header appears in the reviewed text, email-app draft and copied request. UTC submission time and request reference remain at the end. The visitor's address is used as Reply-To. SMTP sender, envelope and recipient are fixed server-side; the client cannot choose them.

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

After the updated code and runtime variables are applied, visit `/api/quote-request/` on the actual site. `{"available":true}` confirms that the running server can see the password and switch; it does **not** verify SMTP connectivity, authentication or inbox delivery. `false` leaves the existing draft/email flow available. A published Lovable URL serves a snapshot: use the normal Publish changes control if it still serves the earlier version. No Lovable AI prompt is required for editing source or entering a secret.

Then submit **one** controlled request through the site, using contact information you own. Confirm:

1. The server accepts the SMTP connection/authentication and the page shows an accepted-for-email-delivery confirmation.
2. The message actually arrives at `reservations@israel-taxi.com` (check Spam as well), contains every field, and Reply addresses the test visitor email.
3. The airport, private-driver and shore formats all work before public activation is considered complete.

If a test fails, set `QUOTE_DELIVERY_ENABLED` to `false` and diagnose the actual runtime/SMTP result without publishing credentials. No real authenticated SMTP test or inbox-delivery verification can be completed before the password is configured in the running environment. Port support and successful compilation alone are not evidence of a delivered email.

## Sending and privacy behavior

- Readiness checks do not send form fields. Invalid or disabled requests do not contact Hostinger.
- Success is returned only after SMTP accepts the fixed recipient/message. Acceptance is not a booking confirmation or a guarantee of inbox placement.
- Buttons and the source form are disabled during a send. A request reference is reused for that attempt. Concurrent/repeated submissions with the same reference and payload share a result within one server instance for ten minutes; edited payloads cannot reuse the reference.
- Ambiguous SMTP/network failures are not automatically retried or described as definite non-delivery. The visitor retains their reviewed text and manual email alternatives.
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

The source-page email header update passed all **218 tests across 33 files**, TypeScript and the production build. Coverage checks the header before the enquiry for each form type, a destination page independent of the requested destination, email-app/copy/direct consistency, safe title validation, omission of query parameters/fragments and compatibility with older clients. No real SMTP email was attempted.
