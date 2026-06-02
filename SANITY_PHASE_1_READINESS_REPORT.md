# SANITY_PHASE_1_READINESS_REPORT

## Audit Scope

This report determines whether the repository is ready to begin **Phase 1 — CMS Foundation & Studio**.

Inputs reviewed:

- `SANITY_CMS_AUDIT_V1.md`
- `SANITY_IMPLEMENTATION_BLUEPRINT_V1.md`
- current `package.json`
- current `package-lock.json`
- current Sanity files
- current App Router structure

This is an audit-only report. It does not modify files, generate code, or implement the Studio.

---

# READINESS SCORE

## Score

**54 / 100**

## Readiness Level

**READY WITH FIXES**

## Summary

The repository is **not ready to add the embedded Sanity Studio as the next direct action**, but it **is ready to begin Phase 1** if Phase 1 starts with dependency and environment stabilization.

The main reason is that the repository has the correct high-level foundation for a Studio route:

- App Router exists;
- `app/` structure is straightforward;
- `sanity/` directory exists;
- Sanity schemas exist;
- a Sanity read client exists;
- Sanity and Next/Sanity dependencies are present.

However, there are critical readiness issues that must be fixed before creating the Studio route:

- `package.json` and `package-lock.json` disagree on Next/React versions;
- the lockfile resolves Next 16.2.6 while `next-sanity` declares peer compatibility for Next 14/15, not Next 16;
- `styled-components` is not present as a top-level dependency even though Sanity Studio packages require it as a peer;
- `sanity/env.ts` defaults to `projectId = 'demo'`, which is not production safe;
- the current root layout wraps all pages in `PageShell`, so an `app/studio/[[...index]]` route would inherit the public site shell unless isolation is planned.

---

# DEPENDENCIES

## Files Inspected

- `package.json`
- `package-lock.json`

## Declared Dependency State In `package.json`

Current declared production dependencies include:

- `next`: `15.0.0`
- `react`: `^19.0.0-rc-65a56d0e-20241020`
- `react-dom`: `^19.0.0-rc-65a56d0e-20241020`
- `sanity`: `^3.57.4`
- `next-sanity`: `^9.2.0`

## Locked / Installed Dependency State In `package-lock.json`

The lockfile root dependency section currently indicates:

- `next`: `^16.2.6`
- `react`: `^19.2.6`
- `react-dom`: `^19.2.6`
- `sanity`: `^3.57.4`
- `next-sanity`: `^9.2.0`

The resolved packages include:

- `next`: `16.2.6`
- `react`: `19.2.6`
- `react-dom`: `19.2.6`
- `sanity`: `3.99.0`
- `next-sanity`: `9.12.3`
- `@sanity/client`: `7.22.0`
- `@sanity/ui`: `2.16.22`

## Compatibility Matrix

| Package / Relationship | Current State | Compatibility Determination | Required Action | Risk Level |
|---|---:|---|---|---|
| `package.json` vs `package-lock.json` | Declared Next 15 / React 19 RC vs lockfile Next 16 / React 19.2 | **Not compatible as a reliable implementation baseline** | Align manifest and lockfile before Studio work | **Critical** |
| `next` vs `next-sanity` | Lockfile resolves Next 16.2.6; `next-sanity` peer supports `^14.2 || ^15.0.0-0` | **Incompatible at locked install level** | Downgrade/align Next to supported 15.x target or upgrade only if `next-sanity` supports target | **Critical** |
| Prompt target Next.js 15.5.18 | `package.json` has 15.0.0; lockfile has 16.2.6 | **Upgrade required from package.json / downgrade required from lockfile** | Align both to target if project standard is 15.5.18 | **Critical** |
| React / React DOM | `package.json` uses React 19 RC; lockfile uses 19.2.6 | **Mismatch** | Align React/React DOM versions with chosen Next version and Sanity peer requirements | **High** |
| `sanity` vs `next-sanity` | Lockfile resolves `sanity@3.99.0`; `next-sanity@9.12.3` peers require `sanity ^3.99.0` | **Compatible in lockfile** | Keep aligned; ensure package manifest does not allow unexpected lower install | **Medium** |
| `@sanity/client` | Installed transitively as `7.22.0` | **Compatible with `next-sanity` peer requirement `^7.6.0`** | No immediate blocker | **Low** |
| `@sanity/ui` | Installed transitively as `2.16.22` | **Compatible with `next-sanity` peer requirement `^2.16.7`** | No immediate blocker | **Low** |
| `styled-components` | Not present as a top-level dependency | **Missing peer for Studio/Sanity UI stack** | Add/align as explicit dependency during Phase 1 dependency stabilization | **Critical** |
| Type packages | `@types/react` and `@types/react-dom` are v18 while React runtime is v19 | **Risky / not aligned** | Align type packages with React 19 implementation target | **Medium** |

## Dependency Readiness Conclusion

Dependencies are **not ready for direct Studio creation**.

The repository should not create `sanity.config.ts` or `app/studio/[[...index]]/page.tsx` until dependency alignment is completed. The main blocker is not that Sanity cannot work with the intended stack; it is that the repository currently has inconsistent dependency truth between `package.json`, `package-lock.json`, and the installed tree.

---

# EXISTING ENVIRONMENT

## File Inspected

- `sanity/env.ts`

## Current State

`sanity/env.ts` currently defines:

- `apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-01-01'`
- `dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'`
- `projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'demo'`

## Production Safety

**Not production safe as-is**

## Missing Variables / Missing Validation

Required variables are conceptually present but not enforced:

- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `NEXT_PUBLIC_SANITY_API_VERSION`

Missing future Phase 1/preview variables:

- server-only Sanity read/preview token, if preview is implemented later;
- preview secret, if draft preview is implemented later;
- Studio/project variables that should be shared by `sanity.config.ts` and `sanity.cli.ts`.

## Blocking Issues

### 1. Unsafe `projectId = 'demo'` Fallback

The `demo` fallback can mask missing production configuration and route CMS reads toward an invalid or unintended project.

Status: **Critical blocker before production-safe Studio/CMS setup**

### 2. No Required Environment Validation

The repository does not currently fail clearly when required Sanity configuration is missing.

Status: **Critical blocker before production readiness**

### 3. No Server-Only Preview Configuration

This is not required for the first Studio foundation commit, but it must be accounted for in the Phase 1 architecture so public values and private preview credentials do not get mixed.

Status: **Not a Phase 1 start blocker, but a preview-readiness blocker**

## Environment Readiness Conclusion

The environment layer must be stabilized before or alongside Studio configuration. Phase 1 can begin, but its first work package must include production-safe environment rules.

---

# APP ROUTER COMPATIBILITY

## Files / Structure Inspected

- `app/layout.tsx`
- `app/page.tsx`
- `app/blog/page.tsx`
- `app/blog/[slug]/page.tsx`
- `app/about/page.tsx`
- `app/contact/page.tsx`
- `app/en/page.tsx`
- `app/sitemap.ts`
- `app/robots.ts`
- `next.config.ts`
- `tsconfig.json`

## Current App Router Shape

The repository uses a straightforward App Router structure:

- root layout at `app/layout.tsx`;
- public pages under `app/`;
- blog listing and dynamic blog detail route under `app/blog`;
- no existing `app/studio` route;
- no existing route conflict with `app/studio/[[...index]]`.

## Can `app/studio/[[...index]]` Be Added Safely?

**Yes, with layout isolation planning.**

There is no route conflict preventing `app/studio/[[...index]]/page.tsx` from being added. However, the current root layout wraps all pages with `PageShell`. That means a Studio route added under `app/studio` would inherit the public site shell unless the implementation intentionally isolates the Studio experience.

## App Router Risks

### 1. Root `PageShell` Inheritance

`app/layout.tsx` wraps all children in `PageShell`. If the Studio route is added without route-level planning, the embedded Studio may appear inside the public site shell.

Risk level: **High**

### 2. Client Boundary Requirements

Embedded Sanity Studio typically requires client-side Studio rendering. The route must be structured so it satisfies App Router server/client boundaries.

Risk level: **Medium / High**

### 3. Public Site Coupling

The Studio route should not inherit marketing page behaviors, headers, footers, CTAs, or public-page layout constraints.

Risk level: **Medium / High**

### 4. `next.config.ts` Image Remote Pattern

The repository already allows `cdn.sanity.io` for Next images. This is favorable for later CMS media integration.

Risk level: **Low**

## App Router Readiness Conclusion

The App Router can support an embedded Studio route, but the implementation must include a Studio isolation decision before creating the route. This is not a routing blocker, but it is a structural readiness requirement.

---

# STUDIO INTEGRATION READINESS

## Required Phase 1 Files

The repository should support the following files after blockers are addressed:

1. `sanity.config.ts`
2. `sanity.cli.ts`
3. `app/studio/[[...index]]/page.tsx`
4. updated `sanity/env.ts`
5. dependency manifest/lockfile stabilization if needed

## Can The Repository Safely Support `sanity.config.ts`?

**Yes, after dependency/environment alignment.**

The repository already has:

- `sanity/schema.ts`;
- `sanity/schemas/index.ts`;
- schema definitions under `sanity/schemas/*`.

The future config can reference the existing schema registry. The missing requirement is production-safe environment configuration and dependency stability.

## Can The Repository Safely Support `sanity.cli.ts`?

**Yes, after environment alignment.**

The CLI config should use the same project and dataset assumptions as the Studio config. It should not rely on the current `demo` fallback.

## Can The Repository Safely Support Embedded Studio?

**Yes, with fixes.**

The route can be added from a routing perspective, but the implementation must solve:

- dependency mismatch;
- missing `styled-components` peer;
- production-safe Sanity environment variables;
- root layout / `PageShell` inheritance;
- Sanity project CORS / allowed origins during deployment;
- authentication/editor access expectations.

## Breaking Production Risk

Adding Studio can be safe if it is isolated and dependency alignment is completed first. The main production-breaking risk is not the route itself; it is dependency churn or lockfile inconsistency introduced while adding Studio support.

---

# BLOCKERS

Critical blockers only.

## 1. Package Manifest / Lockfile Mismatch

`package.json` and `package-lock.json` disagree on the core runtime stack. `package.json` declares Next 15.0.0 and React 19 RC, while the lockfile resolves Next 16.2.6 and React 19.2.6.

Why critical:

- implementation cannot reliably target Next.js 15.5.18 while the lockfile resolves Next 16;
- local, CI, and production installs may differ;
- Studio compatibility cannot be trusted until dependency truth is aligned.

## 2. Locked Next Version Is Outside `next-sanity` Peer Range

The lockfile resolves `next@16.2.6`, while `next-sanity@9.12.3` declares peer compatibility with Next `^14.2 || ^15.0.0-0`.

Why critical:

- the resolved install is outside the declared supported range for `next-sanity`;
- Studio/App Router integration may fail or behave unpredictably;
- the target prompt expects Next.js 15.5.18, not Next 16.

## 3. `styled-components` Peer Dependency Is Missing

Sanity Studio and Sanity UI require `styled-components` as a peer dependency, but it is not present as a top-level dependency.

Why critical:

- embedded Studio is likely to fail or produce peer/install/runtime issues without it;
- Phase 1 Studio setup should explicitly satisfy Studio peer requirements.

## 4. Sanity Environment Defaults Are Not Production Safe

`sanity/env.ts` falls back to `projectId = 'demo'` and does not validate required configuration.

Why critical:

- missing environment variables may go unnoticed;
- the app may connect to the wrong project or fail silently;
- Studio/CLI config must not inherit unsafe defaults.

## 5. Studio Route Layout Isolation Is Not Yet Planned

The current root layout wraps all routes in `PageShell`. A Studio route added directly under `app/studio` will inherit that shell unless implementation accounts for it.

Why critical:

- Studio should not be embedded inside the public marketing layout;
- editor UX and Studio rendering can be compromised;
- the route should be isolated intentionally before implementation.

---

# PHASE 1 IMPLEMENTATION ORDER

This order assumes Phase 1 means **CMS Foundation & Studio** only.

## Step 1 — Dependency Truth Alignment

### Files

1. `package.json`
2. `package-lock.json`

### Objective

Align the project to the intended Next.js / React / Sanity / next-sanity compatibility target before any Studio files are introduced.

### Required Decision

Choose and enforce the intended stack target:

- Next.js 15.5.18 with React 19, as requested in the blueprint prompt; or
- another explicitly approved target if project governance changes.

### Expected Outcome

- `package.json` and `package-lock.json` agree;
- `next-sanity` peer range is satisfied;
- `sanity`, `@sanity/client`, `@sanity/ui`, and `styled-components` peer requirements are satisfied;
- install behavior is deterministic.

## Step 2 — Environment Safety Pass

### Files

1. `sanity/env.ts`
2. environment variable documentation location, if the project maintains one

### Objective

Remove unsafe CMS defaults and enforce required Sanity configuration.

### Expected Outcome

- no `projectId = 'demo'` fallback;
- required Sanity public variables are explicit;
- future server-only preview variables are conceptually separated from public variables;
- Studio config and CLI config can share safe project/dataset values.

## Step 3 — Studio Config Creation

### Files

1. `sanity.config.ts`

### Objective

Create the Sanity Studio project configuration and connect it to the existing schema registry.

### Expected Outcome

- Studio config exists;
- schema registration is centralized;
- project/dataset values are sourced from the safe environment layer;
- config is ready for embedded Studio rendering.

## Step 4 — CLI Config Creation

### Files

1. `sanity.cli.ts`

### Objective

Create CLI-level project and dataset configuration aligned with `sanity.config.ts`.

### Expected Outcome

- CLI config exists;
- CLI operations target the correct project/dataset;
- Studio and CLI assumptions match.

## Step 5 — Studio Route Isolation Decision

### Files

Potentially one of the following, depending on chosen architecture:

1. `app/layout.tsx`
2. route group layout files
3. `app/studio/[[...index]]/page.tsx`

### Objective

Decide how the Studio route avoids inheriting public `PageShell` behavior.

### Expected Outcome

- Studio route layout behavior is explicitly controlled;
- public routes remain unaffected;
- no accidental public header/footer/CTA wrapping around Studio.

## Step 6 — Embedded Studio Route Creation

### Files

1. `app/studio/[[...index]]/page.tsx`

### Objective

Add the embedded Studio route after dependencies, environment, and layout isolation are ready.

### Expected Outcome

- editor-facing Studio route exists;
- route uses `sanity.config.ts`;
- Studio can load without breaking public production routes.

## Step 7 — Phase 1 Verification

### Files / Commands To Validate In Future Implementation

No file creation. Verification should cover:

- install determinism;
- typecheck;
- build;
- local Studio route loading;
- production build compatibility;
- environment failure behavior when variables are missing.

### Expected Outcome

Phase 1 foundation is complete and ready for Phase 2 schema productionization.

---

# FINAL VERDICT

## Verdict

**READY WITH FIXES**

## Explanation

The repository is ready to begin Phase 1 planning and stabilization, but it is not ready to immediately add the embedded Studio route.

The App Router structure can support `app/studio/[[...index]]`, and the existing `sanity/` directory provides a usable schema/client starting point. However, Phase 1 must begin with dependency alignment and environment safety before Studio files are created.

## Required Before Studio Route Creation

The following must be resolved before creating `app/studio/[[...index]]/page.tsx`:

1. align `package.json` and `package-lock.json`;
2. ensure the chosen Next.js version satisfies `next-sanity` peer compatibility;
3. add/align required Studio peer dependencies such as `styled-components`;
4. remove unsafe Sanity environment fallbacks;
5. decide how the Studio route will avoid public `PageShell` inheritance.

## Final Readiness Statement

The repository should proceed with Phase 1 only in this order:

> dependency alignment → environment safety → Studio config → CLI config → route isolation decision → embedded Studio route → verification.

If this order is followed, the repository can begin CMS Foundation & Studio work safely without creating architecture drift, production instability, or an editor-facing Studio route that is coupled to the public site shell.
