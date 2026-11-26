# CI/CD policy — November 2026

Routine site changes: Full Project Validation on PR/main; successful main push validation triggers Hostinger deployment. Manual validation does not deploy. Keep the static export guard, canonical/robots/sitemap/SEO checks, PHP/SSH and rsync safeguards, backup and a small public HTTP smoke check.

Targeted checks: Travelpayouts source-only scan on relevant source paths, full Chromium crawl on manual dispatch; cookie/shore browser checks on relevant paths; Sanity integration on CMS-specific changes. Dependency and published security checks retain scheduled operation. FX refresh retains its existing schedule.

Manual: Airport transfer, ordinary tour catalog and Eilat standalone checks (the full suite already covers these); six former deployment-triggered guide audits; other detailed guide and visual audits; static export/preflight checks. Full Project Validation on manual dispatch includes the two layout-only suites and detailed static editorial checks (also available via node scripts/verify-hostinger-static-export.mjs --editorial after a suitable static build).

Historical: 19 one-off workflows moved unchanged to docs/ci-archive/. They are not active GitHub Actions workflows. Original scripts and assets remain. Restore a workflow deliberately if needed.

Deployment: completed one-time remote retirement commands removed after successful deployment run 45734826346; keep source-controlled URL safeguards and never use rsync --delete. Future removals need a separately reviewed, explicitly scoped server migration. Existing one-off content assertions removed from the deploy workflow; comprehensive editorial static checks available on demand. No changes to website content, generated assets or production credentials.

Reusable link and image generators with narrowly scoped triggers remain available; hotel affiliate generator is now manual to avoid broad script-triggered runs. Security and data maintenance schedules are unchanged.
