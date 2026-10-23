#!/usr/bin/env bash
# Retain the exact dependency versions from bun.lock. Only retry transient
# package-registry failures (e.g. Lovable cache 429), never regenerate the lock.
set -euo pipefail
export BUN_CONFIG_HTTP_RETRY_BACKOFF=500

for attempt in 1 2 3 4; do
  echo "Installing locked dependencies (attempt ${attempt}/4)"
  if bun install --frozen-lockfile; then
    echo "Dependency installation completed."
    exit 0
  fi

  if (( attempt == 4 )); then
    echo "::error::Locked dependency installation failed after four attempts."
    exit 1
  fi

  case "$attempt" in
    1) delay=20 ;;
    2) delay=45 ;;
    3) delay=75 ;;
  esac
  echo "::warning::Package download failed; retrying in ${delay} seconds without changing the lockfile."
  sleep "$delay"
done
