# Brevo transactional form email · 21 October 2026

## Current implementation

All ten contact/quote form pages use the shared same-origin `POST /api/quote-request/` and the server-only Brevo HTTPS API. The existing field validation, required consent, source capture and direct Send action remain. Filling fields does not transmit them. No Nodemailer, SMTP socket, marketing-list subscription, visitor acknowledgement email or Brevo website tracker is used.

The server builds both readable plain text and escaped HTML, with the source heading above the entered fields. The email starts with `Sent from page: [page heading]`; older clients without a heading use the path. Submission time follows Israel's daylight-saving rules. The subject is `Moshe Barak - Taxi & Travel in Israel / [visitor name]`, as requested. Message presentation and the current form labels are shared with the latest form updates.

| Setting | Current value |
| --- | --- |
| Endpoint | `https://api.brevo.com/v3/smtp/email` |
| From address / To | `reservations@israel-taxi.com`, fixed server-side |
| From display name | Sanitized name entered by the visitor |
| Reply-To | Validated visitor email |
| Sending domain | `israel-taxi.com` |
| Receiving mailbox | Existing Hostinger Email mailbox |

The server authenticates in the `api-key` request header. Only HTTP 201 with a nonempty `messageId` counts as provider acceptance. That does not guarantee inbox receipt or a booking. Provider bodies, messages, keys and message IDs are not logged or returned. Manual redirects prevent forwarding credentials or enquiry data to another URL and are compatible with Cloudflare Workers.

## Brevo account and domain

1. Under **Settings → Senders, Domains, IPs → Domains**, authenticate **israel-taxi.com**, matching the From address. The temporary website domain does not need authentication. A marketing subdomain is optional for a future separate use.
2. Add the exact account-specific Brevo-code and DKIM records to the authoritative DNS zone, then check authentication in Brevo. Under **Senders**, verify `reservations@israel-taxi.com`; complete any mailbox challenge requested by Brevo. Confirm transactional sending is active and quota is available. No campaign, mailing list, template or embedded form is required.
3. Under **Settings → SMTP & API → API Keys & MCP**, create a normal API key for this website. Use an API key rather than an SMTP key or MCP key. Store it only in the website's secure runtime Secrets dialog. Never commit it, prefix it with `VITE_`, or paste it into chat/screenshots.

### DNS verification

The owner added the records in QUIC.cloud. Public DNS on 21 October 2026 showed:

| Record | Observed value |
| --- | --- |
| NS | `jon.quicns.com`, `kevin.quicns.com` |
| Brevo-code TXT at root | Present |
| `brevo1._domainkey` CNAME | `b1.israel-taxi-com.dkim.brevo.com` |
| `brevo2._domainkey` CNAME | `b2.israel-taxi-com.dkim.brevo.com` |
| `_dmarc` TXT | `v=DMARC1; p=none` |
| MX | `5 mx1.hostinger.com`, `10 mx2.hostinger.com` |
| Existing SPF TXT | `v=spf1 include:_spf.mail.hostinger.com ~all` |

Both DKIM CNAME targets resolved to public keys. The latest resolver checks show the DMARC policy above without a reporting tag; if Brevo requests its `rua` reporting destination, merge the account-provided tag into that existing policy. Public DNS is not proof that the Brevo account's authentication check has completed. While those nameservers remain authoritative, edits belong in **QUIC.cloud → DNS Zones → israel-taxi.com**. Keep the Hostinger mailbox, MX and existing SPF. Ordinary Brevo shared-IP authentication does not require changing MX/SPF. Do not add a second SPF/DMARC policy or move website records/nameservers. Merge a requested reporting tag into the existing DMARC policy rather than replacing another configured policy.

## Runtime activation

| Secret | Value |
| --- | --- |
| `BREVO_API_KEY` | Normal Brevo API key, server-side only |
| `QUOTE_DELIVERY_ENABLED` | Exact string `true`; `false` pauses delivery |

Both secret names were previously listed in the project. A listing does not verify their values or validity. `SMTP_PASSWORD` is no longer used by this website. Repository/Actions secrets do not automatically configure managed website runtime secrets. No new backend, hosting migration or Lovable AI prompt is required for this integration.

`GET /api/quote-request/` returns only `available`. True means the running server can see the key and enabled switch; it does not check account activation, API authorization, sender/domain verification or quota. An authenticated preview may reject anonymous external requests. Public production can serve an older snapshot until the owner publishes updates through the normal deployment controls.

## The Authorized IP warning

IP blocking is an additional account-level security restriction: requests must have a valid API key and come from an approved source IP. The request originates at the website server, not the visitor's/home browser IP. There is no confirmed fixed egress IP for the current managed hosting, so **leave optional IP blocking inactive during setup**. Enabling it with an incomplete list can block genuine form delivery. Do not guess IP addresses or authorize broad shared networks.

Brevo documents an initial API learning phase. After 30 days without newly detected IPs, blocking can activate automatically; monitor its security notices and review the learned list. A strict allowlist is appropriate after all actual server egress addresses are confirmed, preferably fixed egress. The list is shared across API/SMTP keys, so account-wide changes can affect other integrations. Store/rotate the key securely and observe its expiry/inactivity policy.

## Controlled delivery and duplicate handling

Submit one request using contact details you own on the actual site. Confirm acceptance, then check the reservations inbox including Spam and **Brevo → Transactional → Logs**. Check every field, source heading, name/subject and Reply-To. Confirm the other form formats before launch. Neither a readiness response nor automated tests proves actual inbox delivery.

There are no automatic retries. Unchanged explicit retries keep their UUID; same-instance attempts share results for ten minutes. The UUID also goes to Brevo as `headers.idempotencyKey` and in `X-Mailin-custom` for correlation. Brevo documents a 30-minute deduplication window and a `duplicate_parameter` rejection for repeated keys. A duplicate rejection is not new success; check logs/mailbox before creating a new reference, especially after a timeout. These guards do not guarantee exactly-once delivery indefinitely.

The existing actual-body cap (20 KB), strict schema, origin check, honeypot, consent, hashed contact/IP limits (five attempts per ten minutes), two-send concurrency cap and bounded maps remain. They are per-instance controls rather than global quotas. Provider/hosting services can retain content and delivery records under their own policies/settings; review retention before launch. The Privacy Policy identifies both Brevo and the receiving mailbox provider.

## Diagnostics and verification

Safe codes distinguish authentication (`BREVO_UNAUTHORIZED`), permissions/IP restrictions (`BREVO_FORBIDDEN`), sender verification (`BREVO_SENDER`), rate limits, provider rejection/server failures, invalid acceptance, timeouts, DNS, TLS, connection, redirect/runtime and general network failures. Only the fixed code, website UUID and optional numeric provider status enter structured warnings. The site's HTTP 502 differs from the upstream provider status. Browser/origin/endpoint codes remain separate. Never paste keys or raw enquiry data when reporting errors.

The current verification results are in BUILD_STATUS.md. Tests use mocked Brevo responses and no real credentials or emails. Actual account/runtime/inbox state must be confirmed in the live account/site.

## References

- [Brevo transactional send](https://developers.brevo.com/reference/send-transac-email)
- [Brevo idempotency](https://developers.brevo.com/docs/heterogenous-versions-batch-emails)
- [Domain authentication](https://help.brevo.com/hc/en-us/articles/12163873383186-Authenticate-your-domain-with-Brevo-Brevo-code-DKIM-DMARC)
- [Create a sender](https://help.brevo.com/hc/en-us/articles/208836149-Create-a-new-sender-From-name-and-From-email)
- [API keys](https://help.brevo.com/hc/en-us/articles/209467485-Create-and-manage-your-API-keys)
- [Authorized IP security](https://help.brevo.com/hc/en-us/articles/5740111683858-Authorize-and-block-IP-addresses-for-API-and-SMTP-security)
- [QUIC.cloud DNS](https://docs.quic.cloud/cdn/dns/)
- [Lovable secrets](https://docs.lovable.dev/features/secrets)
