# DEPENDENCY_POLICY_V1.md

# =========================================================
# DEPENDENCY POLICY — V1
# Etología Clínica — Human Clinical Premium Platform
# =========================================================

## STATUS

OFFICIAL — ACTIVE

This document defines:
- dependency rules
- stack stability rules
- package management rules
- upgrade policies
- architecture safety rules
- and Codex restrictions

The goal is to maintain:
- stability
- compatibility
- maintainability
- scalability
- predictable builds
- and production reliability.

---

# =========================================================
# 1. OFFICIAL STACK V1
# =========================================================

| Area | Technology | Official Version |
|------|-------------|------------------|
| Framework | Next.js | 15.5.x |
| UI Runtime | React | 19.2.x |
| DOM Runtime | React DOM | 19.2.x |
| Styling | TailwindCSS | 3.4.x |
| CMS | Sanity | Stable compatible version |
| CMS Integration | next-sanity | Compatible with Next 15 |
| Language | TypeScript | 5.6.x |
| Animations | Framer Motion | 11.x |
| Hosting | Vercel | Official |
| Fonts | next/font/local ONLY | Required |

---

# =========================================================
# 2. PROJECT PRIORITIES
# =========================================================

The project prioritizes:

1. Stability
2. Compatibility
3. Production reliability
4. Predictable builds
5. Scalability
6. Maintainability
7. UX/UI consistency
8. Professional architecture

Latest versions are NOT automatically preferred.

---

# =========================================================
# 3. FORBIDDEN
# =========================================================

The following are STRICTLY FORBIDDEN:

- React RC versions
- Experimental React releases
- Unstable Next.js versions
- Automatic npm upgrades
- npm audit fix --force
- Unapproved dependency additions
- Google Fonts
- next/font/google
- Parallel architectures
- Legacy component recreation
- Architecture-changing packages
- Auto-generated speculative components
- Automatic package updates by Codex

---

# =========================================================
# 4. PACKAGE MANAGEMENT RULES
# =========================================================

## General Rules

- Never upgrade dependencies automatically.
- All dependency changes must be reviewed first.
- Major upgrades require compatibility audits.
- Lockfile changes must be intentional.
- Production dependencies must remain stable.
- Avoid unnecessary packages.
- Keep architecture lean and maintainable.

---

## Versioning Rules

Critical packages should remain frozen when stable:
- next
- react
- react-dom
- sanity
- next-sanity
- tailwindcss

Do NOT upgrade critical dependencies without:
1. Compatibility validation
2. Ecosystem validation
3. Build validation
4. Vercel validation

---

# =========================================================
# 5. BUILD RULES
# =========================================================

The project must ALWAYS maintain:

- successful npm run build
- stable Vercel deploys
- type-safe architecture
- lint compatibility
- App Router compatibility
- stable production output

Build stability has priority over:
- latest features
- experimental APIs
- trendy tooling

---

# =========================================================
# 6. FONT POLICY
# =========================================================

Fonts MUST use ONLY:

- next/font/local

The following are FORBIDDEN:
- Google Fonts
- next/font/google
- remote font providers

Reason:
- build stability
- predictable deploys
- performance consistency
- privacy
- architectural control

---

# =========================================================
# 7. ARCHITECTURE RULES
# =========================================================

## Official Architecture

- Hero exists ONLY inside app/page.tsx
- hero.tsx is permanently deprecated
- No duplicated sections
- No parallel UI systems
- No speculative components
- No unused architecture

---

## Forbidden Architecture Behaviors

DO NOT:
- recreate deleted files
- create alternate layout systems
- generate experimental architecture
- create duplicated sections
- create temporary visual systems

---

# =========================================================
# 8. CODEX RULES
# =========================================================

Codex MUST NEVER:

- modify package.json automatically
- modify package-lock.json automatically
- install dependencies automatically
- change Next.js versions
- change React versions
- recreate deleted files
- recreate hero.tsx
- add Google Fonts
- create parallel architectures
- generate speculative UI
- create unused files
- downgrade architecture quality

Codex must ALWAYS:
- preserve architecture consistency
- preserve build stability
- preserve stack compatibility
- preserve mobile-first structure
- preserve Human Clinical Premium direction

---

# =========================================================
# 9. UX/UI SYSTEM RULES
# =========================================================

Official UX/UI Direction:
# Human Clinical Premium

The interface must feel:
- professional
- human
- emotionally regulated
- clinically trustworthy
- elegant
- modern
- stable
- premium
- calm
- mobile-first

The interface must NOT feel:
- startup
- SaaS
- dashboard
- overly editorial
- trendy
- aggressively minimal
- experimental
- template-like

---

# =========================================================
# 10. DEPLOYMENT RULES
# =========================================================

Deployments must prioritize:
- reliability
- reproducibility
- compatibility
- production safety

Before deployment:
- npm run build must pass
- no dependency conflicts
- no peer dependency errors
- no unstable releases
- no experimental packages

---

# =========================================================
# 11. FUTURE UPGRADE POLICY
# =========================================================

Future upgrades must prioritize:

1. Stability
2. Compatibility
3. Ecosystem support
4. Production reliability
5. Long-term maintainability

New versions are NOT automatically better.

The project should only upgrade when:
- ecosystem compatibility is confirmed
- production reliability is validated
- dependencies are officially supported
- build consistency is guaranteed

---

# =========================================================
# 12. CURRENT PROJECT STATUS
# =========================================================

Current phase:
# Stabilization Phase

Goals:
- stabilize stack
- align dependencies
- freeze architecture
- define operational rules
- establish product consistency

UX/UI refinements are SECONDARY
until technical stabilization is complete.

---

# =========================================================
# END OF DOCUMENT
# =========================================================