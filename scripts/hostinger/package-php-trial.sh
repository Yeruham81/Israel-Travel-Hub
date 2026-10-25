#!/usr/bin/env bash
# Add PHP API entrypoints to an already built TanStack static-export directory.
# No credentials are packaged. Compile only on trusted GitHub Actions runners.
set -euo pipefail
test -f .output/public/index.html
test -f .output/hostinger-build-meta/options.json
mkdir -p .output/public/api/_internal .output/public/api/quote-request .output/public/api/exchange-rates
cp hostinger-php/shared.php .output/public/api/_internal/shared.php
cp hostinger-php/quote.php .output/public/api/_internal/quote.php
cp hostinger-php/fx.php .output/public/api/_internal/fx.php
cp .output/hostinger-build-meta/options.json .output/public/api/_internal/form-options.json
cp hostinger-php/internal.htaccess .output/public/api/_internal/.htaccess
cp hostinger-php/quote-entry.php .output/public/api/quote-request/index.php
cp hostinger-php/fx-entry.php .output/public/api/exchange-rates/index.php
cp hostinger-php/endpoint.htaccess .output/public/api/quote-request/.htaccess
cp hostinger-php/endpoint.htaccess .output/public/api/exchange-rates/.htaccess
# Config template is deliberately NOT copied: it must be installed by the
# site owner in a private directory OUTSIDE public_html.
echo "Packaged Hostinger PHP endpoint paths:"
find .output/public/api -maxdepth 3 -type f -print | sort
