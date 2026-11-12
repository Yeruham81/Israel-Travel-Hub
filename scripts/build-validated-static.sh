#!/usr/bin/env bash
# Fail closed if prerender renders a broken route, even if the bundler exits 0.
# Used by validation, the static-export check, and Hostinger deployment.
set -euo pipefail

if [[ "${HOSTINGER_STATIC_BUILD:-}" != "true" ]]; then
  echo "::error::Validated static build requires HOSTINGER_STATIC_BUILD=true"
  exit 1
fi

# Only on explicit opt-in does this read the selected Sanity perspective and
# generate a local, typed snapshot. No browser API calls or Sanity writes.
# An absent or invalid approved document fails closed instead of deploying
# stale/mixed content after SANITY_UBER_SOURCE was requested.
if [[ -n "${SANITY_UBER_SOURCE:-}" ]]; then
  node scripts/sanity/fetch-uber.mjs
fi

log="$(mktemp)"
trap 'rm -f "$log"' EXIT

if bun run build 2>&1 | tee "$log"; then
  :
else
  echo "::error::Hostinger static build failed; no files may be deployed."
  exit 1
fi

# Defense in depth: older prerender versions can log React rendering errors
# while returning exit code 0. Never treat that as a successful build.
if grep -E 'Error in renderToReadableStream:|Error while prerendering|\[prerender\].*(ERROR|Error|Failed|failed)' "$log"; then
  echo "::error::React/prerender errors detected in the static build log. No files may be deployed."
  exit 1
fi

echo "Hostinger static build completed without detected render errors."
