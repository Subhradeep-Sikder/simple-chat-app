# CI/CD Pipeline Documentation

## Overview

This project uses **GitHub Actions** for continuous integration and continuous deployment (CI/CD). The pipeline automatically runs checks and builds on every push and pull request.

---

## 📋 Workflow Files

### 1. **CI Pipeline** (`ci.yml`)
**Triggers:** Push to `main`/`develop`, Pull Requests to `main`/`develop`

#### Jobs:
- **Backend Tests & Checks**
  - Runs on Node.js 18.x and 20.x
  - TypeScript type checking (`tsc --noEmit`)
  - ESLint (if configured)
  - Dependency caching with npm

- **Frontend Tests & Checks**
  - Runs on Node.js 18.x and 20.x
  - TypeScript type checking and build verification
  - ESLint code quality checks
  - Full production build (`npm run build`)
  - Artifacts uploaded for verification

- **Security Scan**
  - `npm audit` for both backend and frontend
  - Checks for high-severity vulnerabilities
  - Non-blocking (continues even if issues found)

- **Code Quality & Documentation**
  - Validates presence of README.md
  - Checks .gitignore exists
  - Verifies package.json files

**Status:** ✅ Required for PR merge

---

### 2. **Deploy Frontend** (`deploy.yml`)
**Triggers:** Push to `main` branch (frontend/ changes), Manual dispatch

#### Jobs:
- **Build & Deploy**
  - Installs dependencies
  - TypeScript compilation check
  - ESLint validation
  - Production build
  - Uploads to GitHub Pages artifact

- **Deploy**
  - Deploys to GitHub Pages
  - Requires `pages: write` permission

- **Notification**
  - Posts deployment status

**Requirements:**
- Enable GitHub Pages in repository settings
- Set source to "GitHub Actions"

**Status:** 🟡 Optional (requires Pages setup)

---

### 3. **Release** (`release.yml`)
**Triggers:** Git tags matching `v*.*.*`, Manual dispatch

#### Jobs:
- **Create Release**
  - Verifies backend TypeScript
  - Builds frontend
  - Generates changelog from commits
  - Creates GitHub Release
  - Uploads artifacts

**Example Usage:**
```bash
git tag v0.0.2
git push origin v0.0.2
```

**Status:** ℹ️ Optional

---

### 4. **Scheduled Checks** (`scheduled-checks.yml`)
**Triggers:** 
- Daily at midnight UTC
- Weekly on Sunday at midnight UTC
- Manual dispatch

#### Jobs:
- **Security Audit**
  - Weekly/daily dependency security checks
  - Production dependencies only

- **Dependency Check**
  - Reports outdated packages

- **Full Build Test**
  - Tests across multiple Node versions
  - Ensures builds don't break

- **Code Coverage**
  - Placeholder for coverage reports
  - Requires test framework setup

**Status:** ℹ️ Informational

---

## 🔧 Configuration

### Node.js Versions
The CI pipeline tests against:
- Node.js 18.x (LTS)
- Node.js 20.x (Current LTS)

To modify, edit the `matrix.node-version` in workflow files.

### Caching
npm dependencies are cached per workflow run:
- **Backend:** `backend/package-lock.json`
- **Frontend:** `frontend/package-lock.json`

Ensure `package-lock.json` is committed to git.

### Environment Variables
Currently not used. To add:
```yaml
env:
  NODE_ENV: production
```

---

## 📊 Workflow Status

Check workflow status in your repository:
1. Go to **Actions** tab
2. Select workflow from left sidebar
3. View runs and logs

### Badge
Add to your README.md:
```markdown
[![CI](https://github.com/[USERNAME]/[REPO]/actions/workflows/ci.yml/badge.svg)](https://github.com/[USERNAME]/[REPO]/actions/workflows/ci.yml)
```

---

## 🚀 Getting Started

### Initial Setup
1. Push code to GitHub
2. Go to repository **Settings** → **Actions** → **General**
3. Enable Actions if disabled
4. Workflows will run automatically on next push

### Running Workflows Manually
1. Go to **Actions** tab
2. Select workflow
3. Click **Run workflow** dropdown
4. Select branch → **Run workflow**

### Viewing Logs
1. Click on a workflow run
2. Expand job to see steps
3. Expand step to see output

---

## 🔒 Security

### Secrets
To add secrets (API keys, tokens):
1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret**
3. Use in workflows:
```yaml
env:
  API_KEY: ${{ secrets.API_KEY }}
```

### Permissions
Workflows have minimal required permissions:
- `contents: read` - Read code
- `pages: write` - Deploy to Pages (deploy job only)
- `id-token: write` - OIDC token (Pages deployment)

---

## 🐛 Troubleshooting

### Build Fails
1. Check logs in Actions tab
2. Run locally: `npm ci && npm run build`
3. Verify Node version compatibility

### Artifacts Not Uploading
- Check `path` is correct
- Ensure step runs: `if: always()`
- Verify artifact retention settings

### Deploy to Pages Fails
- Enable GitHub Pages in Settings
- Set source to "GitHub Actions"
- Check branch permissions

### Security Audit Fails
- Run `npm audit` locally
- Update vulnerable packages: `npm update`
- Or audit specific package: `npm install package@latest`

---

## 📝 Adding More Workflows

### Template
```yaml
name: Custom Check

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  my-job:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20.x'
      - run: npm ci
        working-directory: frontend
      - run: npm run build
        working-directory: frontend
```

---

## 📚 Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Node.js Setup Action](https://github.com/actions/setup-node)
- [Artifact Upload Action](https://github.com/actions/upload-artifact)
- [GitHub Pages Deployment](https://github.com/actions/deploy-pages)

---

## ✅ Next Steps

1. **Add Tests**
   - Configure Jest for frontend
   - Add `npm test` to CI pipeline

2. **Code Coverage**
   - Set up coverage reporting
   - Add badges to README

3. **Notifications**
   - Slack integration on failures
   - Email notifications

4. **Deployment**
   - Deploy backend to cloud platform
   - Set up environment-specific workflows

---

**Last Updated:** April 2026
