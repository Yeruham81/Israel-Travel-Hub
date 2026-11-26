# Israel Taxi & Travel

English-language travel information, transport services, tours, attractions, accommodation guides and affiliate referrals for international visitors to Israel.

- Production: https://www.israel-taxi.com
- Repository: https://github.com/Yeruham81/Israel-Travel-Hub
- Hosting: Hostinger Premium; GitHub Actions publishes the validated static export.

## Development

Use Node.js 24 and Bun 1.4.4 (matching CI). Install the exact locked dependencies:

```sh
bun install --frozen-lockfile
bun run dev
bun run test
bun run build
bunx tsc --noEmit
```

The application uses React, TanStack Start/Router, Vite, Tailwind CSS and Nitro. Routes and head metadata are source-controlled. Build scripts generate the guide directory, sitemap and robots file. Never edit the generated route tree manually.

For a validated Hostinger static export in a non-indexable local environment:

```sh
HOSTINGER_STATIC_BUILD=true VITE_INDEXABLE=false VITE_CANONICAL_ORIGIN=https://saddlebrown-guanaco-454061.hostingersite.com bash scripts/build-validated-static.sh
VITE_INDEXABLE=false VITE_CANONICAL_ORIGIN=https://saddlebrown-guanaco-454061.hostingersite.com node scripts/verify-hostinger-static-export.mjs
```

Production indexing requires the exact permanent HTTPS www origin and an explicit indexability flag. Preserve published URLs, content, design and redirects.

## Contribution and deployment

Use GitHub branches, pull requests and GitHub Actions. Do not rewrite published history or merge/deploy changes without the owner's approval. The production deployment uploads only the validated `.output/public` output; server-managed PHP endpoints, `.htaccess` and other protected files remain untouched. Never commit secrets or expose server credentials through client environment variables.

See [AGENTS.md](AGENTS.md) for project and editorial rules, [deployment documentation](docs/HOSTINGER_AUTOMATIC_DEPLOYMENT.md) for the operational procedure, [guide layout](docs/GUIDE_LAYOUT_SYSTEM.md) for design, and [Brevo setup](docs/BREVO_SETUP.md) for form delivery. Historical development records remain in [BUILD_STATUS](docs/BUILD_STATUS.md) and Git history.
