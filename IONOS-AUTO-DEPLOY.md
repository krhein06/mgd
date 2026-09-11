# MGD IONOS Auto-Deployment

This repository is configured so every push to `main` can deploy the current site to IONOS over SFTP.

## 1. Create a dedicated IONOS SFTP account

In IONOS, open Hosting -> SFTP & SSH and create a dedicated SFTP account for the MGD website.

For safety, scope that account to the exact document-root directory used by `mgdskidloader.com` rather than the entire webspace whenever possible.

IONOS Linux web hosting normally uses SFTP on port 22.

## 2. Add GitHub Actions secrets

In GitHub open:

Settings -> Secrets and variables -> Actions -> New repository secret

Add these secrets:

- `IONOS_HOST` - IONOS SFTP hostname, for example `access123456789.webspace-data.io`
- `IONOS_USER` - IONOS SFTP username
- `IONOS_PASSWORD` - password for the dedicated SFTP account
- `IONOS_TARGET_DIR` - target folder relative to the SFTP account root. Use `.` if the account is already scoped directly to the MGD document root.
- `IONOS_PORT` - optional; use `22` for SFTP. If omitted, the workflow defaults to port 22.

Do not commit credentials to this repository.

## 3. Production behavior

The workflow `.github/workflows/deploy-ionos.yml` runs when:

- a commit is pushed to `main`, or
- it is manually started from GitHub Actions.

Before deployment it validates required site files, checks JavaScript syntax, and scans HTML files for missing local references.

The deploy step mirrors the repository site to the IONOS document root and removes stale remote site files that are no longer in the repository. `.well-known` is excluded from deletion.

After upload, the workflow runs a live smoke test against:

- `https://mgdskidloader.com/`
- `https://mgdskidloader.com/services/`
- `https://mgdskidloader.com/robots.txt`
- `https://mgdskidloader.com/sitemap.xml`

## 4. Important first-deployment precaution

Back up the existing WordPress installation and database before the first automated deployment.

Because the workflow uses a mirror with deletion enabled, the SFTP account must point to the correct MGD production document root. Do not use a shared parent directory containing other websites.

## 5. Normal workflow going forward

1. Make changes in GitHub/Codex.
2. Review/test the changes.
3. Merge or push to `main`.
4. GitHub Actions deploys the exact current repository version to IONOS.
5. The workflow verifies the live production site.

GitHub becomes the source of truth; manual ZIP uploads should no longer be used for normal site updates.
