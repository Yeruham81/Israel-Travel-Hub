# Historical SMTP implementation — superseded

The original SMTP transport was replaced by the Brevo transactional HTTPS API on 21 October 2026. SMTP_PASSWORD and Nodemailer are no longer used by this website. Do not follow the former SMTP activation steps or add obsolete runtime credentials.

For the current delivery model, configuration, controlled testing and diagnostic guidance see [BREVO_SETUP.md](BREVO_SETUP.md). The production website uses the separately maintained Hostinger PHP endpoint at /api/quote-request/; the static deployment deliberately does not replace it.

The historical implementation details and validation record remain available in Git history and [BUILD_STATUS.md](BUILD_STATUS.md). The archived SMTP verification was not proof of actual authenticated inbox delivery. Preserve current server-side secrets, consent, validation, duplicate protection and mail delivery behavior.
