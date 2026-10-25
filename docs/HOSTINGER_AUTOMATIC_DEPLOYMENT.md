# Hostinger Premium — automatic static deployment

This is the **free shared-hosting architecture** for Israel Taxi & Travel:

```text
Lovable editor  <->  GitHub (main)
                         |
                         +--> Full Project Validation (build + TS + tests)
                                   | SUCCESS ONLY
                                   v
                           Hostinger Premium deploy workflow
                                   |
                                   +--> static prerender, verify every sitemap URL
                                   +--> rsync over pinned-host-key SSH
                                   v
               saddlebrown-guanaco-454061.hostingersite.com
                  HTML / images / CSS / JS / sitemap / robots
                     existing Hostinger PHP APIs UNTOUCHED
```

**Do not use Hostinger's direct Git integration with the app source on main.**
Hostinger Premium is not the Node/SSR build server, and its Git deployment
would copy raw TypeScript source instead of compiled static pages. GitHub
Actions performs the build and deploys only `.output/public` assets.

## Safety controls

- All staging pages remain `noindex` and use canonical
  `https://saddlebrown-guanaco-454061.hostingersite.com` until you explicitly
  change the GitHub variables after DNS cutover.
- Automatic deployments require `HOSTINGER_AUTO_DEPLOY=true` **AND** a
  successful `Full Project Validation` run on the newest `main` commit.
- The upload never deletes remote files (`rsync` intentionally has no
  `--delete` argument).
- It never copies over `.htaccess`, `/api`, PHP code, or `.well-known`.
  Existing Brevo config, PHP forms, exchange rates, and their private cache
  are intentionally left untouched. Their code is **not automatically
  maintained** by this static-only pipeline.
- Deployment requires a marker file, a previously published `index.html`,
  and both working PHP endpoint files in the exact target directory.
- No credentials in Git, Lovable prompts, browser variables or build files.
- SSH checks the saved Hostinger host public key (no
  `StrictHostKeyChecking=no`). A trial run can use `dry_run=true`.

## One-time Hostinger hPanel setup

1. On the *temporary custom PHP/HTML website*, open **Websites → Dashboard
   → Advanced → SSH Access** and enable SSH. On Premium this is supported.
2. In SSH Access, copy the SSH **IP/host**, username and port (usually
   `65002`). Confirm the absolute webroot path using File Manager or SSH,
   e.g. `/home/u123456789/domains/saddlebrown-guanaco-454061.hostingersite.com/public_html`.
   **Do not use the current WordPress website's public_html.**
3. In the temporary website's `public_html` create an empty file:
   `.ith-static-deploy-ok`. In File Manager enable showing hidden files,
   or create it from SSH:
   `touch /home/USER/domains/TEMP_DOMAIN/public_html/.ith-static-deploy-ok`.
4. Generate a new **dedicated** SSH key pair on your personal computer:
   ```sh
   ssh-keygen -t ed25519 -a 100 -f ./hostinger-gh-deploy -C "github-actions-hostinger-trial"
   ```
   Add the text of `hostinger-gh-deploy.pub` to SSH Access → **Add SSH key**
   in hPanel. Never share the private key in chat or put it in Git.
5. Obtain a *verified* `known_hosts` entry for the same Hostinger IP/port:
   ```sh
   ssh-keyscan -p 65002 YOUR_HOSTINGER_SSH_IP
   ```
   Check the public host key fingerprint with a known/trusted first SSH
   connection or Hostinger support before storing it. Save the complete
   `[IP]:65002 ssh-ed25519 AAAA...` line, not merely the hash fingerprint.
   The runner will refuse unknown/changed host keys.

## GitHub repository setup

At `https://github.com/Yeruham81/Israel-Travel-Hub/settings/secrets/actions`,
add these **Repository secrets** (exact spellings):

| Secret name | Value |
|---|---|
| `HOSTINGER_SSH_HOST` | SSH IP/hostname from hPanel (not the temporary web URL) |
| `HOSTINGER_SSH_USER` | SSH/FTP username |
| `HOSTINGER_SSH_PRIVATE_KEY` | Full *private* dedicated SSH key (including BEGIN/END lines) |
| `HOSTINGER_SSH_KNOWN_HOSTS` | Verified `[IP]:65002 ssh-ed25519 ...` host-key line |
| `HOSTINGER_REMOTE_PATH` | **Absolute path to the temporary site's public_html**, NOT your WordPress path |

At `https://github.com/Yeruham81/Israel-Travel-Hub/settings/variables/actions`,
add these **Repository variables**:

| Variable | Initial value |
|---|---|
| `HOSTINGER_CANONICAL_ORIGIN` | `https://saddlebrown-guanaco-454061.hostingersite.com` |
| `HOSTINGER_INDEXABLE` | `false` |
| `HOSTINGER_AUTO_DEPLOY` | `false` (keep disabled until dry-run succeeds) |
| `HOSTINGER_SSH_PORT` | `65002` (optional; default is 65002) |

## First connection test

1. In GitHub Actions open **Deploy static website to Hostinger Premium**,
   choose **Run workflow** on main, leave **dry_run=true**.
2. Verify that the job builds every sitemap page, finds the marker and both
   PHP entrypoints, and prints a list of files to transfer, without changing
   anything on the server. Failed SSH, bad path or missing marker aborts.
3. Run a second time with **dry_run=false** to transfer only the built static
   assets. Review its GET-only smoke checks of /, /guides/, /api/quote-request/
   and /api/exchange-rates/. Do not submit a customer form during the test.
4. Once satisfied, set `HOSTINGER_AUTO_DEPLOY=true`. All new changes
   reaching GitHub `main` will publish **after** the full code validation
   workflow succeeds. Publishing via Lovable itself is unnecessary; its GitHub
   sync is the trigger.

## Later: connect israel-taxi.com

Do not switch the repository's canonical origin or indexing flag before
changing domains. At launch, after final redirects and 301s are in place,
update `HOSTINGER_CANONICAL_ORIGIN`, `HOSTINGER_REMOTE_PATH` (if the
website location changes), and `HOSTINGER_INDEXABLE=true`, and revise the
Hostinger webroot `.htaccess` to remove staging `X-Robots-Tag` and add
production security and redirects. First do a dry run and verify the target
marker. Do not point this trial deployment to WordPress's existing folder.

## Operational limits / maintenance

- Lovable edits and direct GitHub commits sync with each other when the
  Lovable project and GitHub use the same branch (`main`). Other branch
  commits need merging into main before deployment.
- Source file updates require a successful GitHub CI build; no local Node.js
  or paid Hostinger hosting upgrade is required.
- PHP logic is **deliberately excluded** from automatic updates to avoid
  overwriting your tested working Brevo/FX setup. Make these changes
  separately with explicit backups and functional verification.
- No automatic deletion means that renamed/removed old HTML pages may remain
  on Hostinger after deployment. Clean stale routes with a separate
  reviewed migration + 301 redirect task, never with a blind
  `rsync --delete`.
- Hostinger `.htaccess` cache, security policies and public site verification
  are host-managed. Keep the staging `noindex` rules until the launch.
- GitHub Actions may have usage quotas depending on the repository/account
  plan; do not assume unlimited build minutes.
