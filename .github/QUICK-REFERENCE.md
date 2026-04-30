# CI/CD Quick Reference

## Status Badges

Add to your README.md:

```markdown
[![CI](https://github.com/[USERNAME]/simple-chat-app/actions/workflows/ci.yml/badge.svg)](https://github.com/[USERNAME]/simple-chat-app/actions)
[![Deploy](https://github.com/[USERNAME]/simple-chat-app/actions/workflows/deploy.yml/badge.svg)](https://github.com/[USERNAME]/simple-chat-app/actions)
```

---

## Workflow Status at a Glance

| Workflow | When | Status | Time |
|----------|------|--------|------|
| **CI** | Push/PR | Required ✅ | ~3-5 min |
| **Deploy** | Push main | Optional ⚡ | ~2-3 min |
| **Release** | Git tag | Optional 📦 | ~2-3 min |
| **Scheduled** | Daily/Weekly | Informational ℹ️ | Variable |

---

## Common Commands (Local Development)

```bash
# Backend checks
cd backend
npm ci
npx tsc --noEmit

# Frontend checks
cd frontend
npm ci
npm run lint
npm run build
npx tsc -b

# Before committing (run both)
npm run build && npm run lint
```

---

## Git Workflow

```bash
# Start feature
git checkout -b feature/my-feature

# Make changes and commit
git commit -m "feat: add feature"

# Push and create PR
git push origin feature/my-feature
# Open PR on GitHub

# After merge
git checkout develop
git pull origin develop
```

---

## Release Process

```bash
# Create version tag
git tag v0.0.2
git push origin v0.0.2

# Release workflow runs automatically
# Check: Actions → Release → Latest run
```

---

## Debug Workflow Issues

1. **Check logs:** Actions → [Workflow] → [Run] → [Job] → [Step]
2. **Common issues:**
   - Node version mismatch: Update `matrix.node-version`
   - npm cache: CI auto-caches, clear if needed
   - TypeScript errors: Run `npx tsc --noEmit` locally
   - Lint errors: Run `npm run lint` locally

---

## Key Files

| File | Edit When |
|------|-----------|
| `ci.yml` | Change CI checks |
| `deploy.yml` | Change deployment target |
| `CODEOWNERS` | Update team structure |
| `pull_request_template.md` | Update PR requirements |

---

## Access Levels

- 📖 View workflows: Public repo (anyone)
- ▶️ Run workflows: Push access (contributors)
- ⚙️ Configure workflows: Admin access (maintainers)
- 🔐 Use secrets: Admin access (maintainers)

---

## Workflow Permissions

```yaml
permissions:
  contents: read           # Read code
  pages: write             # Deploy to Pages
  id-token: write          # OIDC token
  checks: write            # Write checks
  pull-requests: write     # Comment on PRs
```

---

## Environment Variables

Add to specific job:
```yaml
env:
  NODE_ENV: production
```

Access in script:
```bash
echo $NODE_ENV
```

---

## Secrets Usage

Add in GitHub Settings:
1. **Settings** → **Secrets and variables** → **Actions**
2. **New repository secret**

Use in workflow:
```yaml
env:
  API_KEY: ${{ secrets.API_KEY }}
```

Access in script:
```bash
echo $API_KEY
```

---

## Caching

Auto-enabled for npm:
```yaml
uses: actions/setup-node@v4
with:
  node-version: '20.x'
  cache: 'npm'
  cache-dependency-path: frontend/package-lock.json
```

---

## Artifacts

Upload:
```yaml
- uses: actions/upload-artifact@v4
  with:
    name: my-artifact
    path: dist/
    retention-days: 7
```

Download: Go to workflow run → "Artifacts" section

---

## Status Check in PR

- ✅ Green: All checks passed, can merge
- 🟡 Yellow: Checks running
- ❌ Red: Checks failed, fix issues
- ⊘ Grey: Checks not required for this branch

---

## Parallel Jobs

All jobs in a workflow run in parallel unless specified:
```yaml
needs: [job1, job2]  # Wait for job1 and job2
```

---

## Retry Failed Jobs

1. Go to workflow run
2. Click "Re-run failed jobs"
3. Or "Re-run all jobs"

---

## Cancel Running Workflow

1. Go to Actions
2. Click running workflow
3. Click "Cancel workflow"

---

## Scheduled Jobs

View next run times:
```
"cron: '0 0 * * *'" = Daily at midnight UTC
"cron: '0 0 * * 0'" = Sundays at midnight UTC
```

Convert to your timezone at [crontab.guru](https://crontab.guru)

---

## Matrix Builds

Runs job across multiple configurations:
```yaml
matrix:
  node-version: [18.x, 20.x]
  os: [ubuntu-latest, windows-latest]
```

Creates 4 jobs (2 versions × 2 OS)

---

## Conditional Steps

```yaml
if: always()          # Run regardless
if: failure()         # Only if previous step failed
if: success()         # Only if previous step passed
if: github.event_name == 'push'  # Only on push
```

---

## Timeout

Default: 360 minutes (6 hours)

Set per job:
```yaml
timeout-minutes: 30
```

---

## Continue on Error

```yaml
continue-on-error: true  # Don't fail job if this step fails
```

---

## View Workflow File

1. Go to code
2. `.github/workflows/[name].yml`
3. Click the file

---

## Learn More

- Full docs: `.github/CI-CD-DOCS.md`
- Contributing guide: `.github/CONTRIBUTING.md`
- GitHub Actions: https://docs.github.com/actions

---

**Print this page as a handy reference!** 📋

Last Updated: April 2026
