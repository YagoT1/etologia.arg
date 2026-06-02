# AUTHORITY_EXECUTION_SPRINT_1_V1

## Source and Scope Note

This document prepares Sprint 1 execution for **PHASE 1 — Authority Consolidation** only. It uses `AUTHORITY_IMPLEMENTATION_SPEC_V1.md`, `AUTHORITY_SPRINT_1_AUDIT_V1.md`, `AUTHORITY_IMPLEMENTATION_PLAN_V1.md`, `IMPLEMENTATION_ROADMAP_V1.md`, `UX_UI_SYSTEM_V1.md`, and direct review of the current codebase.

`PROJECT_RULES.md` was requested but was not present in the repository at generation time. This execution preparation therefore follows the available authority, roadmap, and UX/UI governance documents.

This is not an implementation task. It does not generate code, redesign the website, modify runtime behavior, optimize conversion, implement trust architecture, perform SEO work, perform performance work, modify backend systems, or define premium polish.

The purpose is to make Sprint 1 implementation safe by identifying exact files, exact components, exact dependencies, exact risks, safe zones, high-risk zones, and execution order.

---

# Component Map

## Hero

### File Path

`app/page.tsx`

### Component Name

`LandingPage`

### Parent Component

The Hero is rendered directly inside the `LandingPage` page component. `LandingPage` is the default export of `app/page.tsx`.

### Controlled Code Areas

- Hero section markup: `section#hero`.
- Hero badge content: `MV Agustina Gasparini · Etología clínica`.
- Hero headline and body copy.
- Hero CTA group.
- Hero supporting microcopy.
- Hero authority-signal grid using `trustSignals`.
- Hero image and clinical overlay.

### Dependencies

- `next/image` for the Hero image.
- `components/ui/container.tsx` via `Container`.
- `components/ui/badge.tsx` via `Badge`.
- `components/ui/button.tsx` via `Button`.
- `lib/contact.ts` via `buildWhatsAppUrl`.
- `public/images/img-hero.png` as the Hero image asset.
- `trustSignals` array in `app/page.tsx`.

### Sprint 1 Role

Authority Orientation.

The Hero should orient the user into the clinical category and set the correct authority frame before the Professional Section anchors that authority.

## Professional Section

### File Path

`app/page.tsx`

### Component Name

`LandingPage`

### Parent Component

The Professional Section is rendered directly inside `LandingPage` as `section#agustina`.

### Controlled Code Areas

- Professional section container and grid.
- Label: `Quién te acompaña`.
- Professional name: `MV Agustina Gasparini`.
- Professional role paragraph.
- Highlight block: `Criterio clínico + sensibilidad familiar`.
- Supporting “Enfoque” block.
- Supporting “Modalidad” block.

### Dependencies

- `components/ui/container.tsx` via `Container`.
- Tailwind utility classes used directly in `app/page.tsx`.
- No dedicated Professional Section component currently exists.
- No external content source currently owns this section; the content is inline in `app/page.tsx`.

### Sprint 1 Role

Authority Anchor.

The Professional Section is the highest-leverage section for Sprint 1 because it contains the strongest identity-based authority material.

## Method Section

### File Path

`app/page.tsx`

### Component Name

`LandingPage`

### Parent Component

The Method Section is rendered directly inside `LandingPage` as `section#metodo`.

### Controlled Code Areas

- Method section wrapper.
- `SectionHeader` call with eyebrow, title, and subtitle.
- Ordered list mapping over the `process` array.
- Method step cards.
- Method step number, title, and body text.

### Dependencies

- `components/ui/container.tsx` via `Container`.
- `components/ui/section-header.tsx` via `SectionHeader`.
- `components/ui/badge.tsx` indirectly through `SectionHeader`.
- `process` array in `app/page.tsx`.
- Tailwind utility classes used directly in `app/page.tsx`.

### Sprint 1 Role

Authority Proof.

The Method Section should prove that the professional authority is operational through structured clinical reasoning, not merely a process explanation.

---

# Authority Ownership Map

## Ownership Table

| Authority Signal | File | Component | Priority |
|---|---|---|---|
| `MV Agustina Gasparini · Etología clínica` | `app/page.tsx` | `LandingPage` Hero, rendered through `Badge` | Critical |
| Hero clinical category orientation | `app/page.tsx` | `LandingPage` Hero | Critical |
| Behavior changing the life of the household | `app/page.tsx` | `LandingPage` Hero headline | Critical |
| Anxiety, fear, aggression, stress, difficult changes | `app/page.tsx` | `LandingPage` Hero body | Critical |
| Evaluation before plan | `app/page.tsx` | `LandingPage` Hero body | Critical |
| Safe and respectful plan | `app/page.tsx` | `LandingPage` Hero body | Important |
| Hero trust signal: `Médica Veterinaria` | `app/page.tsx` | `trustSignals` rendered by Hero | Critical |
| Hero trust signal: `Etología clínica` | `app/page.tsx` | `trustSignals` rendered by Hero | Critical |
| Hero trust signal: `Evaluación conductual` | `app/page.tsx` | `trustSignals` rendered by Hero | Important |
| Hero trust signal: `Plan familiar aplicable` | `app/page.tsx` | `trustSignals` rendered by Hero | Important |
| `Mirada clínica, sin recetas universales` | `app/page.tsx` | Hero image overlay | Important |
| Professional identity: `MV Agustina Gasparini` | `app/page.tsx` | `section#agustina` | Critical |
| Veterinary medicine foundation | `app/page.tsx` | Professional Section body | Critical |
| Clinical ethology foundation | `app/page.tsx` | Professional Section body | Critical |
| Non-blaming interpretation | `app/page.tsx` | Professional Section body | Important |
| Translating what is happening | `app/page.tsx` | Professional Section body | Critical |
| Ordering priorities | `app/page.tsx` | Professional Section body | Critical |
| Caring for the bond while addressing the problem | `app/page.tsx` | Professional Section body | Important |
| `Criterio clínico + sensibilidad familiar` | `app/page.tsx` | Professional highlight block | Critical |
| Pain, fear, learning, environment, handling, age, stress, family dynamics | `app/page.tsx` | Professional highlight block | Critical |
| No recipe before questions | `app/page.tsx` | Professional highlight block | Important |
| Integral evaluation | `app/page.tsx` | Professional `Enfoque` block | Critical |
| Risk prevention | `app/page.tsx` | Professional `Enfoque` block | Critical |
| Realistic guidance | `app/page.tsx` | Professional `Enfoque` block | Important |
| Case-dependent modality | `app/page.tsx` | Professional `Modalidad` block | Supporting |
| Method eyebrow: `Cómo trabajamos` | `app/page.tsx` | Method `SectionHeader` | Supporting |
| Method title: clear process for anxiety/decisions | `app/page.tsx` | Method `SectionHeader` | Important |
| Clinical criteria and daily reality | `app/page.tsx` | Method `SectionHeader` subtitle | Critical |
| Method step 1: WhatsApp intake | `app/page.tsx` | `process` array rendered by Method | Utility / Risk |
| Method step 2: clinical evaluation | `app/page.tsx` | `process` array rendered by Method | Critical |
| Behavior, routine, environment, health, antecedents, family, emotional signs | `app/page.tsx` | `process` step 2 | Critical |
| Veterinary control when needed | `app/page.tsx` | `process` step 2 | Critical |
| Method step 3: possible plan for home | `app/page.tsx` | `process` step 3 | Important |
| Family feasibility, resources, risks, level of accompaniment | `app/page.tsx` | `process` step 3 | Critical |
| Method step 4: follow-up and evolution | `app/page.tsx` | `process` step 4 | Important |
| Adjustments, doubts, progress measurement | `app/page.tsx` | `process` step 4 | Important |
| No magic solutions or universal recipes | `app/page.tsx` | `process` step 4 | Critical |
| Section heading hierarchy pattern | `components/ui/section-header.tsx` | `SectionHeader` | Important |
| Badge/eyebrow presentation pattern | `components/ui/badge.tsx` | `Badge` | Important |
| Button/action presentation pattern | `components/ui/button.tsx` | `Button` | Sensitive / Protected for Sprint 1 |
| Container width and page rhythm | `components/ui/container.tsx` | `Container` | Sensitive |

## Signals That Should Gain Weight In Sprint 1

- Professional identity as clinical authority.
- Veterinary medicine and clinical ethology.
- Clinical behavioral judgment.
- Clinical evaluation before guidance.
- Health/context/family/risk evaluation.
- Method as clinical reasoning proof.
- The relationship between Professional authority and Method reasoning.

## Signals That Should Lose Weight In Sprint 1

- WhatsApp intake as a defining authority signal.
- Accessibility-first microcopy as first remembered impression.
- Equal-weight signal chips.
- Process mechanics as the dominant method read.
- Generic card/module perception.

---

# File Risk Analysis

## Critical Files

Critical files directly control Sprint 1 authority and are expected touch candidates.

### `app/page.tsx`

This is the primary Sprint 1 file. It controls all three audited sections, the authority signal arrays, the inline Professional Section content, and the Method `process` array.

### Why It Is Critical

Any Sprint 1 authority change to Hero, Professional, or Method will likely touch `app/page.tsx`. It is the safest primary file because the relevant authority content is centralized there.

### Main Risks

- CTA/accessibility cues may become more dominant.
- The Hero may become colder or too credential-led.
- The Professional Section may become self-promotional instead of authoritative.
- The Method may become more procedural instead of more clinical.
- Section hierarchy may be flattened further if all blocks remain equal weight.

## Sensitive Files

Sensitive files may affect authority indirectly and should be touched only if `app/page.tsx` cannot safely achieve the required authority concentration alone.

### `components/ui/section-header.tsx`

Controls repeated section-header hierarchy. Changes affect many sections, not only Method.

### `components/ui/badge.tsx`

Controls Hero badge and section eyebrows. Changes affect labels across the site, not only Sprint 1.

### `components/ui/card.tsx`

Controls reusable card surfaces. Changes may affect unrelated cards and create UX/UI convergence work outside Sprint 1.

### `components/ui/container.tsx`

Controls layout width and structure. Changes may affect global layout consistency.

### `components/layout/header.tsx`

Controls persistent professional identity and contact access. It is authority-adjacent but outside the Hero → Professional → Method Sprint 1 sequence.

## Protected Files

Protected files must not be modified during Sprint 1 because they would introduce architecture drift, conversion work, trust implementation, or unrelated scope.

### Application / Configuration

- `package.json`
- `package-lock.json`
- `next.config.ts`
- `tsconfig.json`
- `postcss.config.mjs`
- `tailwind.config.ts`
- `app/layout.tsx`

### Later-Phase Product Areas

- `components/sections/cta-block.tsx`
- `components/sections/faq-accordion.tsx`
- `components/sections/reel-preview-card.tsx`
- `components/layout/footer.tsx`
- `app/contact/page.tsx`
- `app/blog/page.tsx`
- `app/blog/[slug]/page.tsx`
- `app/about/page.tsx`

### Backend / CMS / Utility

- `sanity/*`
- `lib/schema.ts`
- `lib/seo.ts`
- `lib/contact.ts`
- `lib/i18n.ts`
- `config/*`
- `messages/*`

## Protected File Rationale

Sprint 1 is an authority-concentration sprint, not a stack, architecture, conversion, trust, SEO, CMS, localization, or polish sprint. Protected files should remain untouched to prevent scope expansion and regression risk.

---

# Dependency Analysis

## Hero Dependencies

Hero depends on:

- `app/page.tsx` inline Hero markup;
- `trustSignals` array in `app/page.tsx`;
- `Button` from `components/ui/button.tsx`;
- `Badge` from `components/ui/badge.tsx`;
- `Container` from `components/ui/container.tsx`;
- `Image` from `next/image`;
- `buildWhatsAppUrl` from `lib/contact.ts`;
- `public/images/img-hero.png`.

## Professional Section Dependencies

Professional Section depends on:

- `app/page.tsx` inline section markup and text;
- `Container` from `components/ui/container.tsx`;
- Tailwind utility classes directly in `app/page.tsx`.

There is no dedicated Professional Section component.

## Method Section Dependencies

Method Section depends on:

- `process` array in `app/page.tsx`;
- `section#metodo` markup in `app/page.tsx`;
- `SectionHeader` from `components/ui/section-header.tsx`;
- `Badge` indirectly through `SectionHeader`;
- `Container` from `components/ui/container.tsx`;
- Tailwind utility classes directly in `app/page.tsx`.

## Shared Dependencies

### `app/page.tsx`

Shared by all three sections. This is the central dependency and preferred Sprint 1 touch file.

### `Container`

Shared by all three sections. Should not be modified for Sprint 1 unless there is a proven authority issue at the page-width level.

### `Badge`

Used directly in Hero and indirectly in Method through `SectionHeader`. Modifying it would affect more than Sprint 1.

### `SectionHeader`

Used in Method and many other sections. Modifying it would affect the broader page and should generally be avoided in Sprint 1.

### `Button`

Used by Hero and many later-phase conversion surfaces. Modifying it would become conversion/UI work and should be avoided in Sprint 1.

## What Must Be Changed Together

### Hero Authority Orientation + Professional Authority Anchor

If the Hero's authority emphasis is adjusted, the Professional Section must be reviewed in the same package or immediately after. The Hero should orient toward the Professional Section, not attempt to carry authority alone.

### Professional Authority Anchor + Method Authority Proof

If the Professional Section gains authority weight, the Method Section must be reviewed to ensure it proves the same authority through clinical reasoning.

### Method Heading + Method Process Array

The Method heading and the `process` array must be reviewed together. If only the heading changes, the section may overclaim. If only the steps change, the section may remain procedurally framed.

### Hero Trust Signals + Hero Main Hierarchy

The `trustSignals` array should be reviewed with the Hero headline/body hierarchy. Otherwise, the chips may continue to feel disconnected or equally weighted.

## What Must Never Be Changed Together In Sprint 1

### Authority Sections + Package/Stack Files

Do not combine Sprint 1 authority work with dependency upgrades, package changes, framework changes, or configuration changes.

### Authority Sections + CTA System Components

Do not combine Hero/Professional/Method authority work with `components/sections/cta-block.tsx`, mobile sticky CTA, or global `Button` changes. CTA optimization is later-phase work.

### Authority Sections + FAQ/Reels/Testimonials

Do not combine Sprint 1 authority work with FAQ implementation, educational content, reels, testimonials, blog, or trust architecture. Those areas are explicitly out of Sprint 1 scope.

### Authority Sections + Global Design Token Changes

Do not combine Sprint 1 with `tailwind.config.ts`, global typography tokens, global shadows, or color-system changes. That would become UX/UI convergence or polish.

---

# Sprint Work Packages

## Package A — Authority Orientation

### Objective

Prepare the Hero to orient users into the clinical authority category without turning the work into CTA optimization or visual redesign.

### Files Involved

Expected touch file:

- `app/page.tsx`

Review-only dependencies:

- `components/ui/badge.tsx`
- `components/ui/button.tsx`
- `components/ui/container.tsx`
- `lib/contact.ts`
- `public/images/img-hero.png`

### Components Involved

- `LandingPage` Hero section.
- `Badge` as the Hero identifier renderer.
- `Button` as existing action renderer, review-only.
- `Container` as layout wrapper, review-only.

### Authority Signals Involved

- Professional/category badge.
- Hero headline.
- Hero body copy.
- `trustSignals` array.
- Hero overlay statement.
- Supporting access microcopy, reviewed only for authority dilution.

### Expected Impact

High.

This package improves the first 10-second authority orientation so users enter through clinical category and professional confidence rather than warmth/accessibility alone.

### Risk Level

Medium.

The main risk is accidentally optimizing the Hero CTA or making the Hero colder, louder, or more credential-heavy.

## Package B — Authority Anchor

### Objective

Prepare the Professional Section to function as the central authority anchor of the Hero → Professional → Method journey.

### Files Involved

Expected touch file:

- `app/page.tsx`

Review-only dependencies:

- `components/ui/container.tsx`
- `components/ui/card.tsx`

### Components Involved

- `LandingPage` Professional Section (`section#agustina`).
- Inline Professional Section surface blocks.
- `Container`, review-only.

### Authority Signals Involved

- Professional identity.
- Veterinary medicine.
- Clinical ethology.
- Translation/interpretation role.
- Priority-setting role.
- Clinical criteria and family sensitivity.
- Pain/fear/learning/environment/handling/age/stress/family dynamics.
- Integral evaluation, risk prevention, and realistic guidance.

### Expected Impact

Very high.

This package addresses the primary Phase 1 authority gap: the strongest identity-based authority material exists but is underweighted.

### Risk Level

Medium / High.

The main risk is turning the section into biography, self-promotion, credential dumping, or cold institutional authority rather than Human Clinical Premium authority.

## Package C — Authority Proof

### Objective

Prepare the Method Section to read as clinical reasoning proof rather than generic process explanation.

### Files Involved

Expected touch file:

- `app/page.tsx`

Review-only dependencies:

- `components/ui/section-header.tsx`
- `components/ui/badge.tsx`
- `components/ui/container.tsx`

### Components Involved

- `process` array.
- Method `SectionHeader` usage.
- Method ordered list and step cards.

### Authority Signals Involved

- Clinical criteria and daily reality.
- Evaluation before guidance.
- Behavior/routine/environment/health/antecedents/family/emotional signs.
- Veterinary control when needed.
- Family feasibility and risk.
- Follow-up and progress measurement.
- No magic solutions or universal recipes.

### Expected Impact

High.

This package makes the authority anchor operational by showing how clinical judgment becomes a structured reasoning process.

### Risk Level

Medium.

The main risk is making the Method Section more process-heavy or making Step 1 intake more prominent than clinical reasoning.

---

# Safe Change Zones

## Safe Zone 1 — `app/page.tsx` Content Arrays

The `trustSignals` and `process` arrays are safe authority zones because they directly control Hero authority signals and Method reasoning content without requiring component architecture changes.

## Safe Zone 2 — `app/page.tsx` Inline Hero Text Hierarchy

Hero badge, headline, body, supporting microcopy, and authority-signal content are safe to review for authority orientation, as long as CTA mechanics are not changed.

## Safe Zone 3 — `app/page.tsx` Inline Professional Section Content

The Professional Section is inline and centrally controlled in `app/page.tsx`. It is a safe authority zone because it contains the strongest identity-based authority material.

## Safe Zone 4 — Method `SectionHeader` Props In `app/page.tsx`

The Method's `eyebrow`, `title`, and `subtitle` props can be reviewed from `app/page.tsx` without modifying the global `SectionHeader` component.

## Safe Zone 5 — Section-Level Emphasis Within Existing Structure

Authority can be improved within the current Hero, Professional, and Method section structure. This avoids new sections, new components, and architecture drift.

---

# High Risk Zones

## High Risk Zone 1 — Global Components

Files such as `components/ui/button.tsx`, `components/ui/badge.tsx`, `components/ui/section-header.tsx`, `components/ui/card.tsx`, and `components/ui/container.tsx` affect multiple areas. Changing them during Sprint 1 can unintentionally create UX/UI convergence work.

## High Risk Zone 2 — CTA Mechanics

Hero CTA, header CTA, final CTA, and mobile sticky CTA must not become Sprint 1 implementation areas. CTA changes can create conversion optimization and authority dilution.

## High Risk Zone 3 — `tailwind.config.ts` And `styles/globals.css`

Design tokens, typography, shadows, colors, and global spacing affect the entire platform. Sprint 1 authority work should not become token or polish work.

## High Risk Zone 4 — FAQ, Reels, Testimonials, Blog

These areas relate to trust architecture, educational content, social/content-creator perception, proof, and later UX/UI governance. They are out of Sprint 1 scope.

## High Risk Zone 5 — Architecture And Dependencies

Package, config, routing, CMS, Sanity, SEO, and backend-adjacent files should not be touched. They do not support Sprint 1 authority concentration and create stability risk.

## High Risk Zone 6 — Cold Authority Overcorrection

Authority work can regress the Human Clinical Premium standard if it becomes institutional, overly medicalized, credential-heavy, or emotionally distant.

## High Risk Zone 7 — Warmth Overcorrection

Authority work can fail if it increases reassurance, friendliness, or accessibility without making professional judgment more dominant.

---

# Execution Order

## Step 1 — Package B: Authority Anchor

### Objective

Establish the Professional Section as the central authority anchor.

### Files

Expected touch:

- `app/page.tsx`

Review-only:

- `components/ui/container.tsx`
- `components/ui/card.tsx`

### Risks

- The section may become too biographical.
- The section may become credential-heavy.
- The section may become colder or more institutional.
- Surface/containment changes could drift into UX/UI convergence.

### Expected Outcome

The Professional Section clearly carries the strongest authority weight in the Hero → Professional → Method sequence.

## Step 2 — Package C: Authority Proof

### Objective

Align the Method Section so it proves the professional authority through structured clinical reasoning.

### Files

Expected touch:

- `app/page.tsx`

Review-only:

- `components/ui/section-header.tsx`
- `components/ui/badge.tsx`
- `components/ui/container.tsx`

### Risks

- The section may become more procedural rather than more clinical.
- WhatsApp intake may remain the first remembered method signal.
- Global `SectionHeader` changes could affect unrelated sections.

### Expected Outcome

The Method Section reads as clinical reasoning proof and not merely a four-step service process.

## Step 3 — Package A: Authority Orientation

### Objective

Adjust the Hero's authority orientation so it frames the user journey toward the Professional authority anchor and Method proof.

### Files

Expected touch:

- `app/page.tsx`

Review-only:

- `components/ui/badge.tsx`
- `components/ui/button.tsx`
- `components/ui/container.tsx`
- `lib/contact.ts`
- `public/images/img-hero.png`

### Risks

- The Hero may become too dense or credential-led.
- CTA changes may accidentally enter Sprint 1.
- Warmth may be reduced too far.
- The Hero may continue trying to solve the entire authority problem alone.

### Expected Outcome

The Hero orients users into the clinical category and hands authority leadership to the Professional Section.

## Step 4 — Relationship Verification

### Objective

Verify the sequence as one authority system: Hero = category orientation, Professional = authority anchor, Method = authority proof.

### Files

Review expected:

- `app/page.tsx`

No additional files should be introduced at this step.

### Risks

- The three sections may improve individually but remain disconnected.
- Authority may still feel distributed.
- CTA/accessibility cues may still dominate first perception.

### Expected Outcome

The Sprint 1 sequence can be evaluated against the Phase 1 success criteria: clinical behavior authority within 10 seconds, central professional authority within 60 seconds, and structured clinical reasoning within 3 minutes.

---

# Implementation Readiness

## Is Sprint 1 Ready For Implementation?

Yes, with restrictions.

Sprint 1 is ready for controlled implementation because:

- the authority problem is clearly defined;
- the three-section target state is defined;
- the expected touch file is centralized in `app/page.tsx`;
- high-risk global components can remain review-only;
- protected files are clearly identified;
- execution can be divided into three packages that preserve phase boundaries.

## Missing Information

`PROJECT_RULES.md` is missing from the repository. If it becomes available, it should be checked before implementation starts. Based on currently available documents, there is enough information to proceed with Sprint 1 planning.

## Which Package Should Be Executed First?

Package B — Authority Anchor should be executed first.

The Professional Section is the highest-impact and safest starting point because it contains the strongest identity-based authority material and directly addresses the strategic diagnosis that authority exists but is not yet institutionalized.

---

# Executive Recommendation

## Safest And Highest-Impact Execution Path

The safest Sprint 1 execution path is:

1. **Start with Package B — Authority Anchor** in `app/page.tsx`.
2. **Proceed to Package C — Authority Proof** in `app/page.tsx`.
3. **Then execute Package A — Authority Orientation** in `app/page.tsx`.
4. **Finish with Relationship Verification** across the same file.

## Why This Path Is Safest

This path keeps the work concentrated in `app/page.tsx`, avoids global component changes, avoids CTA optimization, avoids trust architecture, avoids visual-system redesign, avoids backend/config changes, and avoids dependency risk.

It also solves the highest-leverage authority problem first: the Professional Section must become the authority anchor before the Hero can orient toward it and the Method can prove it.

## Files Expected To Be Touched

Expected Sprint 1 touch file:

- `app/page.tsx`

Possible but discouraged unless absolutely necessary:

- `components/ui/section-header.tsx`
- `components/ui/badge.tsx`
- `components/ui/card.tsx`

## Files That Should Not Be Touched

- `package.json`
- `package-lock.json`
- `next.config.ts`
- `tsconfig.json`
- `tailwind.config.ts`
- `styles/globals.css`
- `components/ui/button.tsx`
- `components/sections/cta-block.tsx`
- `components/sections/faq-accordion.tsx`
- `components/sections/reel-preview-card.tsx`
- `components/layout/header.tsx`
- `components/layout/footer.tsx`
- `app/contact/page.tsx`
- `app/about/page.tsx`
- `app/blog/page.tsx`
- `app/blog/[slug]/page.tsx`
- `sanity/*`
- `lib/*`
- `config/*`
- `messages/*`

## Final Execution Principle

Sprint 1 should concentrate authority without expanding scope.

The safe implementation posture is:

> Touch the fewest files possible, keep authority work inside the existing Hero → Professional → Method sequence, make the Professional Section the anchor, make the Method the proof, and make the Hero the orientation point without changing architecture, CTAs, trust systems, visual systems, or dependencies.
