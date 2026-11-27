# Israel Taxi & Travel — secure administration

Status: CODE IN FEATURE BRANCH ONLY. Not deployed to the live website.

The public website is statically generated using TanStack Start. The admin runs
as a separate PHP 8.2+ / MySQL app on Hostinger, with server-side authentication.
Its intended address is https://www.israel-taxi.com/admin/ (Apache redirects
/admin to /admin/ when the directory exists).

## Deployment layout

Public entrypoints copied into the real webroot:
  <domain>/public_html/admin/index.php
  <domain>/public_html/admin/consent.php
  <domain>/public_html/admin/assets/admin.css
  <domain>/public_html/admin/.htaccess

Private, non-public files:
  <domain>/private-admin/src/
  <domain>/private-admin/schema.sql
  <domain>/private-admin/bin/install.php
  <domain>/private-admin/config.php  (CREATE ON SERVER; NEVER IN GIT)

No private credentials or PHP code are included in the static Vite build.

## Module readiness

* Dashboard: responsive UI and actual MySQL summary counts.
* Login: server-side password hashing, throttling, session rotation, CSRF,
  secure cookies, logout and server-enforced role permissions.
* User management: owner creates admin/editor/viewer accounts, changes roles,
  disables accounts, resets passwords and invalidates old sessions.
* Incoming messages: inbox, status, private notes and idempotent server-side
  recorder. CURRENTLY NOT CONNECTED to existing Hostinger PHP/Brevo service.
* Consent: event schema and same-origin POST endpoint, no plaintext IP logging.
  CURRENTLY NOT CONNECTED to the browser consent-saving flow.
* 301 rules: draft/approved registry with path validation, loop prevention,
  editing and authenticated JSON export. NOT LIVE APACHE RULES YET.
* SEO: editable per-page meta title, description, Open Graph, robots and
  draft/approved export. NOT APPLIED TO STATIC SITE HTML YET.
* Backups: read-only inventory of existing Hostinger deployment-backups
  directories. No create/restore/delete feature yet.
* Jobs: optional live GitHub Actions status using a private READ-ONLY API
  token; internal event list for later integrations.
* Audit: admin login/logout and management changes with timestamps.

These limitations are shown in the interface; it never invents operational data.

## Security controls

Passwords are stored only using PHP password_hash, not in GitHub.
All admin POST actions require session CSRF tokens.
Sessions are Secure, HttpOnly, SameSite=Strict and scoped to /admin/.
The admin requires HTTPS and sends noindex/no-store/security headers.
Owner access cannot be removed from the UI. Other users can be deactivated.
SEO and 301 approval is limited to owner/admin. User management is owner-only.
Prepared PDO queries prevent SQL injection. HTML output is escaped.
The consent endpoint limits payload size, validates Origin and boolean categories,
and rate-limits short-lived HMACs instead of saving source IP addresses.

## First-time Hostinger setup

1. Create a DEDICATED MySQL/MariaDB database and restricted database user.
2. Create a private config.php from private/config.example.php OUTSIDE public_html.
   Populate db_dsn, db_user, db_password and audit_hmac_secret. The HMAC secret
   must be 64 random hex characters. Do not share credentials in chat or GitHub.
3. The manual GitHub workflow named "Admin - Deploy isolated PHP dashboard to
   Hostinger" can upload the code after PR review and owner authorization.
   Its default mode is audit-only / no-write. Hostinger freeze controls apply.
4. Over SSH, execute:
   php /home/<user>/domains/<domain>/private-admin/bin/install.php
   and privately type the initial owner username and a unique 14+ character
   password. No default credentials exist.
5. Open /admin/ over HTTPS. Verify login, logout, errors, role restrictions,
   session expiry and the website's existing PHP endpoints.

This is the correct first-time server setup, not a step already completed.

## Connecting contact messages

The existing public forms POST to the verified Hostinger PHP quote endpoint,
which sends via Brevo. That PHP endpoint is not currently checked into this
repository. Do not add a duplicate client POST or interfere with acceptance.

AFTER the existing endpoint validates input and Brevo confirms acceptance,
it may call the private Ingestion.php method record_accepted_enquiry with the
already validated request, email subject and body. The unique requestId
deduplicates retries. A failed supplemental inbox write must not cause the
original accepted email to be resent. Historical emails are not auto-imported.

## Connecting consent choices

The public consent endpoint is /admin/consent.php. It accepts same-origin
application/json POST containing eventId (UUID), policyVersion, sourcePath
and four boolean flags: analytics, external, marketing, advertising.
It returns HTTP 202 only after storage. It does not require visitor login.

The cookie-consent client supports an explicit opt-in build variable
VITE_CONSENT_LEDGER_ENABLED=true. It is OFF by default, so no extra network
request is made until the admin server, privacy notice and receipt retention
are ready. Logging is asynchronous and never blocks a visitor's choice.

The private maintenance command is:
  php /home/<user>/domains/<domain>/private-admin/bin/retention.php
Configure a scheduled Hostinger cron task before enabling receipt collection.
It deletes consent receipts older than 365 days and authentication/rate-limit
fingerprints older than one day.

The current cookie-consent client is NOT POSTING BY DEFAULT to it. First update the
privacy policy to disclose this security/privacy log, decide retention, and
then connect saveCookieConsent to the endpoint. Avoid claiming identity-level
proof of consent from anonymous category events.

## SEO and 301 publication

Admin changes are PROPOSALS in MySQL. Download approved changes from
/admin/?export=seo or /admin/?export=redirects. A reviewed GitHub build/deploy
integration must apply those approved rules to the static meta tags or Apache
redirects, with route and loop tests. Admin PHP must not directly rewrite the
production .htaccess or generated page HTML.

## Job monitoring and backups

To enable live workflow status, add github_read_token to the PRIVATE server
config. Use a fine-grained GitHub token with Actions READ ONLY permission
for the specific private Yeruham81/Israel-Travel-Hub repository.
No GitHub token or request payload is sent to the browser.

Deployment backup folders are read from the private deployment-backups
directory beside public_html. A directory's presence does not imply a
restore test was successful. Creation and restoration must be implemented
separately with explicit safeguards and storage limits.

## Acceptance criteria before production use

- PHP lint, role validation and disposable MySQL integration CI all pass.
- Correct document root and Apache DirectoryIndex support verified.
- Admin config remains outside public_html and excluded from git.
- Owner account is bootstrapped privately; no hard-coded credentials.
- Unauthorized user, CSRF and HTTP login attempts are rejected.
- Existing site public routes, SEO, forms, CSS and APIs are unchanged.
- Real inbox receipt is verified only after server-side Brevo success.
- Consent-policy disclosure is updated before browser-side collection.
- GitHub runs and backup inventory are validated independently.
- Live SEO/301 publication is enabled only through a reviewed workflow.

This repository change provides the secure foundation and working management
screens, not yet every production data integration.
