# Hostinger Premium — automatic static deployment

Production: https://www.israel-taxi.com

```text
GitHub branch -> reviewed pull request -> main
                                           |
                                   Full Project Validation
                                           | SUCCESS ONLY
                                           v
                               Hostinger deployment workflow
                                           |
                               validated .output/public export
                                           |
                                   pinned-key SSH / rsync
                                           v
                                Hostinger production webroot
```

Hostinger Premium serves the compiled static output, not the Node/SSR source. GitHub Actions builds and deploys the website. The production PHP APIs are maintained separately.

## Safety and backup controls

- Automatic deployment requires a successful push-triggered Full Project Validation on main, HOSTINGER_AUTO_DEPLOY=true and no cutover freeze.
- The deployment validates the target directory, marker file, index.html, both PHP API entrypoints and absence of old WordPress files.
- Production publishing requires the exact HTTPS www origin, indexing enabled and explicit HOSTINGER_PRODUCTION_DEPLOY_APPROVED=true.
- Never use rsync --delete. Exclude .htaccess, PHP, /api/, .well-known and other protected host-managed files.
- Before overwriting files, maintain private per-attempt deployment backups outside public_html. Keep the three successful backups and use the existing storage-maintenance script to prune only verified obsolete generated assets.
- No credentials in Git, browser variables, logs or build outputs. Use dedicated deployment keys and strict SSH host-key verification.
- Non-production builds remain noindex. Do not change the live domain, DNS, canonical or indexing settings as part of ordinary edits.

## Repository secrets and variables

Configure these through GitHub Settings > Secrets and variables > Actions.

| Secret | Purpose |
| --- | --- |
| HOSTINGER_SSH_HOST | Verified SSH host |
| HOSTINGER_SSH_USER | SSH account |
| HOSTINGER_SSH_PRIVATE_KEY | Dedicated private deployment key |
| HOSTINGER_SSH_KNOWN_HOSTS | Verified host-key line |
| HOSTINGER_REMOTE_PATH | Exact approved production webroot |

| Variable | Production configuration / purpose |
| --- | --- |
| HOSTINGER_CANONICAL_ORIGIN | https://www.israel-taxi.com |
| HOSTINGER_INDEXABLE | true |
| HOSTINGER_AUTO_DEPLOY | true only after authorized setup |
| HOSTINGER_PRODUCTION_DEPLOY_APPROVED | true only for the approved production target |
| HOSTINGER_CUTOVER_FREEZE | true to suspend automatic publishing |
| HOSTINGER_SSH_PORT | SSH port, default 65002 |

These are intended settings, not a live account inspection. Keep the existing configured values unless the owner authorizes changes.

## Initial or changed target setup

1. On the approved Hostinger PHP/HTML website, open **Websites → Dashboard
   → Advanced → SSH Access** and enable SSH. On Premium this is supported.
2. In SSH Access, copy the SSH **IP/host**, username and port (usually
   `65002`). Confirm the absolute webroot path using File Manager or SSH,
   using the actual approved domain directory.
   **Do not target a legacy WordPress webroot.**
3. In the approved website's `public_html` create an empty file:
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



## Validation and publishing

1. Work on a separate branch and verify all relevant checks before requesting approval to merge.
2. For a changed deployment target, use the existing workflow on main with dry_run=true first. Confirm the exact path, marker, PHP files and transfer list.
3. After an authorized merge, inspect Full Project Validation and the dependent deployment workflow. A failed build must not publish.
4. Confirm GET-only smoke checks on the production home, hubs, robots.txt, sitemap.xml and both API endpoints. A controlled real enquiry requires separate authorization; do not submit live customer forms during routine CI.
5. Confirm the deployment-storage maintenance step and backup retention. Server-managed PHP, .htaccess, DNS, cache configuration and legacy redirects require separate reviewed changes.

See the actual workflows and scripts for executable behavior: [.github/workflows/deploy-hostinger-premium.yml](../.github/workflows/deploy-hostinger-premium.yml), [full-project-validation.yml](../.github/workflows/full-project-validation.yml), [build-validated-static.sh](../scripts/build-validated-static.sh), [maintain-deployment-storage.py](../scripts/maintain-deployment-storage.py). For the historical cutover procedure see [PRODUCTION_DOMAIN_CUTOVER.md](PRODUCTION_DOMAIN_CUTOVER.md).
