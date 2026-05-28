# STABILIZATION_EXECUTION_PLAN_V1.md

# =========================================================
# STABILIZATION EXECUTION PLAN — V1
# Etología Clínica — Human Clinical Premium Platform
# =========================================================

## STATUS

OFFICIAL — ACTIVE

This document defines:
- the technical stabilization process
- dependency alignment procedures
- architecture freeze validation
- build validation workflow
- deployment validation workflow
- and recovery procedures

The objective is to transform the project from:
- partially aligned

to:
- fully stable
- production-ready
- maintainable
- scalable
- and operationally consistent.

---

# =========================================================
# 1. CURRENT PROJECT STATUS
# =========================================================

## Current Technical Situation

The project currently contains:
- dependency misalignment
- React RC legacy versions
- unstable package compatibility
- peer dependency conflicts
- inconsistent stack references
- mixed ecosystem support

The architecture itself is considered:
- recoverable
- scalable
- and professionally structured

The stabilization process focuses on:
- stack alignment
- dependency normalization
- build consistency
- production reliability
- architecture protection

---

# =========================================================
# 2. STABILIZATION OBJECTIVES
# =========================================================

The stabilization process must achieve:

- stable dependency ecosystem
- official compatibility support
- successful production builds
- stable Vercel deployments
- predictable developer experience
- architecture consistency
- frozen technical baseline
- safe future scalability

---

# =========================================================
# 3. OFFICIAL TARGET STACK
# =========================================================

| Area | Official Version |
|------|------------------|
| Next.js | 15.5.x |
| React | 19.2.x |
| React DOM | 19.2.x |
| TailwindCSS | 3.4.x |
| TypeScript | 5.6.x |
| next-sanity | Compatible with Next 15 |
| sanity | Stable compatible version |
| Framer Motion | 11.x |

---

# =========================================================
# 4. PHASE 1 — BACKUP & FREEZE
# =========================================================

## Objective

Protect the current project state before executing modifications.

---

## Required Actions

### Create backup branch

```bash
git checkout -b stabilization-backup
```

---

### Save current state

```bash
git add .
git commit -m "backup before stabilization"
```

---

## Freeze Rules

During stabilization:
- no UI redesign
- no UX refinements
- no new features
- no new dependencies
- no architecture changes

ONLY:
- stabilization
- alignment
- validation
- cleanup

---

# =========================================================
# 5. PHASE 2 — DEPENDENCY ALIGNMENT
# =========================================================

## Objective

Normalize the dependency ecosystem.

---

## Required Corrections

### Replace React RC

REMOVE:
- experimental React RC versions

REPLACE WITH:
- stable React 19.2.x

---

### Downgrade Next.js

REMOVE:
- Next.js 16.x

REPLACE WITH:
- stable Next.js 15.5.x

Reason:
- ecosystem compatibility
- next-sanity compatibility
- production stability

---

### Align ESLint

eslint-config-next MUST match:
- official Next.js version

---

### Align React Types

@types/react
@types/react-dom

MUST align with:
- React 19

---

### Freeze Critical Versions

Critical packages must use:
- explicit stable versions

Avoid unstable dependency drift.

---

# =========================================================
# 6. PHASE 3 — CLEAN REINSTALL
# =========================================================

## Objective

Rebuild dependency integrity from zero.

---

## Required Actions

### Remove old dependencies

#### Windows PowerShell

```powershell
Remove-Item -Recurse -Force node_modules
```

#### macOS / Linux

```bash
rm -rf node_modules
```

---

### Remove lockfile

#### Windows PowerShell

```powershell
Remove-Item package-lock.json
```

#### macOS / Linux

```bash
rm package-lock.json
```

---

### Install clean ecosystem

```bash
npm install
```

---

## Important

DO NOT:
- use npm audit fix --force
- use automatic upgrade tools
- use unstable package versions

---

# =========================================================
# 7. PHASE 4 — BUILD VALIDATION
# =========================================================

## Objective

Validate production stability.

---

## Required Validations

### Type validation

```bash
npm run typecheck
```

Must pass with:
- zero critical errors

---

### Lint validation

```bash
npm run lint
```

Must pass with:
- stable configuration
- no architecture violations

---

### Production build validation

```bash
npm run build
```

Must pass with:
- successful build
- stable bundle generation
- no dependency conflicts
- no peer dependency issues

---

# =========================================================
# 8. PHASE 5 — VERCEL VALIDATION
# =========================================================

## Objective

Validate production deployment consistency.

---

## Required Checks

Deployment must:
- compile successfully
- complete without dependency conflicts
- complete without React RC warnings
- complete without Next.js compatibility warnings

---

## Production Requirements

The deployment must maintain:
- stable build output
- consistent rendering
- image optimization
- CMS compatibility
- App Router compatibility

---

# =========================================================
# 9. PHASE 6 — ARCHITECTURE FREEZE VALIDATION
# =========================================================

## Objective

Prevent future architectural drift.

---

## Required Validation

Confirm:
- no recreated legacy files
- no duplicate systems
- no parallel architecture
- no speculative components
- no Google Fonts
- no next/font/google usage

---

## Mandatory Rules

Hero must remain:
- ONLY inside app/page.tsx

hero.tsx:
- permanently deprecated

---

# =========================================================
# 10. RECOVERY STRATEGY
# =========================================================

## If stabilization fails

DO NOT:
- force install packages
- force dependency overrides
- bypass peer dependency issues

Instead:
1. restore backup branch
2. identify incompatibility source
3. re-align manually
4. retry stabilization safely

---

# =========================================================
# 11. SUCCESS CONDITIONS
# =========================================================

The stabilization process is considered complete ONLY when:

- npm install succeeds cleanly
- npm run build succeeds
- npm run lint succeeds
- npm run typecheck succeeds
- Vercel deploy succeeds
- no React RC remains
- no dependency conflicts remain
- no architecture violations remain

---

# =========================================================
# 12. POST-STABILIZATION RULES
# =========================================================

After stabilization:
- architecture becomes frozen
- dependency changes require review
- upgrades require compatibility audit
- UX/UI work resumes ONLY after stabilization approval

---

# =========================================================
# 13. NEXT PHASE
# =========================================================

After stabilization completes successfully:

NEXT DOCUMENT:
# PROJECT_RULES.md

Then:
# PRODUCT_BLUEPRINT_V1.md

Then:
# UX/UI convergence phase

---

# =========================================================
# END OF DOCUMENT
# =========================================================
