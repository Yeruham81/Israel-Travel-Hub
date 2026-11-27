# Full site editorial review

Baseline: 72ab55bf70ecbcc28eab1712bcd2020cab5c9b80

Every canonical page belongs to exactly one group in tracker.json. Group 13 tracks shared components and interactive states separately. Privacy and terms are in group 12; preserve legal meaning. No page is reviewed merely because it was extracted. Record the reviewed corpus hash, meaningful changes, notes and verification per page. Status: pending, reviewed-no-change, edited, verified. Recheck changes to the baseline before marking verified. Do not change facts, prices, links, safety guidance, legal meaning, SEO or layout in a copy-only pass. Keep genuine distinctions and avoid rewriting for style alone.

The read-only corpus workflow builds the Hostinger static export and extracts numbered text blocks and user-facing attributes. It fails on missing or duplicate URLs, missing H1/main, or empty content. The artifact includes hashes and counts; it is not deployed. Static HTML does not cover all hydration-only controls, error/success states, or third-party widgets: check those separately in group 13. Responsive and collapsible text is retained intentionally. Shared static navigation/footer is extracted once. Do not add corpus output to the public directory or commit generated snapshots.

Before merge: compare current main, preserve parallel edits, run full regression + editorial static checks, review all changed inline-link phrases, and repeat corpus extraction for final verification.
