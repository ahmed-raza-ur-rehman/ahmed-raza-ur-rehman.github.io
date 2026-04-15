# Engineering Workflow

## Why This Repo Stays Static-First

This site is deployed on GitHub Pages. A static-first architecture gives:

- zero server maintenance
- predictable fast load times
- low operational risk
- easy preview from any branch

Frameworks are still valid choices when needed:

- Next.js: if you want ISR/SSR and richer routing at scale
- Django/FastAPI: if you need heavy backend logic, auth, and admin workflows

For this portfolio, the current architecture is optimized for GitHub Pages reliability while leaving Firebase integration seams in place.

## SDLC Model (Agile + GitHub)

### Sprint cadence

- 1-week sprint
- Planning: Monday
- Mid-sprint review: Wednesday
- Demo + retro: Friday

### Work item flow

1. Open issue with acceptance criteria
2. Create branch from main
3. Ship small commits tied to issue
4. Open PR with screenshots and test notes
5. CI must pass before merge
6. Merge squash to keep history clean

## Git Strategy

### Branch naming

- feat/short-description
- fix/short-description
- chore/short-description
- docs/short-description

### Commit style

Use Conventional Commits:

- feat: add skill galaxy zoom mode
- fix: prevent camera lab crash on denied permission
- chore: update CI link-check settings

### Pull request checklist

- [ ] scope is focused
- [ ] no console errors
- [ ] responsive behavior checked
- [ ] accessibility pass done (keyboard + focus)
- [ ] CI green

## GitHub Actions in This Repo

### Site CI

Workflow: .github/workflows/site-ci.yml

Runs on push and pull request:

- structural validation via scripts/validate_site.py
- required file checks
- link checks with Lychee

### Deploy to Pages

Workflow: .github/workflows/pages-deploy.yml

Deploys when Site CI succeeds on main (or manually via workflow dispatch).

## GitHub Repository Settings (Recommended)

Set these once in repository settings:

- Branch protection on main:
  - require PR before merge
  - require status checks: Site CI
  - require conversation resolution
- Pages source: GitHub Actions
- Merge method: squash only
- Auto-delete head branches after merge

## Release Discipline

- Tag releases with semantic versioning (v1.0.0, v1.1.0)
- Add release notes that summarize:
  - added features
  - fixes
  - breaking changes
