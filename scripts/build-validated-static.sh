#!/usr/bin/env bash
# Fail closed if prerender renders a broken route, even if the bundler exits 0.
# Used by validation, the static-export check, and Hostinger deployment.
set -euo pipefail

if [[ "${HOSTINGER_STATIC_BUILD:-}" != "true" ]]; then
  echo "::error::Validated static build requires HOSTINGER_STATIC_BUILD=true"
  exit 1
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
