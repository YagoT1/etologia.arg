# SANITY_IMPLEMENTATION_BLUEPRINT_V1

## Scope Note

This blueprint defines the implementation architecture required to transform the repository from a partial Sanity integration into a fully operational Sanity CMS with an embedded Studio, CMS-powered blog, production editorial workflow, and post-specific SEO.

This is not an implementation task. It does not modify files, generate code, create patches, or redesign architecture. It describes the files, responsibilities, phases, risks, and production-readiness criteria required for a future implementation sprint.

`PROJECT_RULES.md` was requested but was not present in the repository at blueprint generation time. This blueprint therefore uses the current repository state and `SANITY_CMS_AUDIT_V1.md` as its governance source.

---

# EXECUTIVE ARCHITECTURE

## Current Repository State

The repository currently contains **partial Sanity scaffolding**:

- Sanity dependencies are present in `package.json`.
- A read client exists in `sanity/lib.client.ts`.
- Environment constants exist in `sanity/env.ts`.
- A schema registry exists in `sanity/schema.ts`.
- Minimal schemas exist under `sanity/schemas/*`.
- Blog routes exist under `app/blog/page.tsx` and `app/blog/[slug]/page.tsx`.

However, the repository does not currently contain a fully operational CMS because:

- there is no Sanity Studio configuration;
- there is no Sanity CLI configuration;
- there is no embedded Studio route;
- the blog routes do not query Sanity;
- the post schema does not support full editorial content;
- the client defaults to `projectId = demo`;
- there is no draft preview workflow;
- post-specific metadata is not generated;
- editor workflow cannot be completed from this app.

## Target Architecture

The target architecture should contain five production layers:

1. **Studio Layer**
   - Embedded Sanity Studio route inside the Next.js App Router.
   - Sanity project configuration.
   - Sanity CLI configuration.
   - Desk/content structure appropriate for editorial operations.

2. **CMS Schema Layer**
   - Production-ready document schemas.
   - Validation rules.
   - SEO fields.
   - Editorial workflow fields.
   - Content governance fields.
   - Preview configuration.

3. **Query/Data Access Layer**
   - Centralized GROQ queries.
   - Typed fetch wrappers or documented return contracts.
   - Public read client.
   - Preview/draft client strategy.
   - Error/empty-state expectations.

4. **Blog Integration Layer**
   - CMS-powered blog listing.
   - CMS-powered blog detail page.
   - Static/dynamic rendering strategy.
   - `generateMetadata` strategy.
   - Not-found handling.
   - Draft preview path.

5. **Editorial Workflow Layer**
   - Create draft.
   - Preview draft.
   - Publish.
   - Render on listing.
   - Render detail page.
   - Share canonical URL with post-specific metadata.

## Compatibility Assessment

### Current Dependency Signals

`package.json` currently declares:

- `next`: `15.0.0`
- `react`: `19.0.0-rc-65a56d0e-20241020`
- `react-dom`: `19.0.0-rc-65a56d0e-20241020`
- `next-sanity`: `^9.2.0`
- `sanity`: `^3.57.4`

The local lockfile appears to contain newer resolved/root dependency information than `package.json`, including Next 16 / React 19.2 references. This mismatch is a production risk and must be resolved before CMS implementation is considered stable.

### Next.js 15.5.18 And React 19 Compatibility

The desired target in the prompt is Next.js 15.5.18 with React 19. The Sanity/Next integration should be feasible in that family only if the project resolves the dependency mismatch and verifies peer dependency compatibility in the final locked install.

Blueprint rule:

- do not begin CMS implementation until `package.json`, `package-lock.json`, installed dependency tree, and CI install behavior agree on the intended Next.js and React versions;
- validate `next-sanity`, `sanity`, `@sanity/client`, `@sanity/ui`, `styled-components`, `react`, and `react-dom` peer compatibility in the implementation sprint;
- treat the current package/lock mismatch as a blocker for production readiness, not necessarily a blocker for blueprint planning.

---

# REQUIRED FILES

Files are ordered by implementation priority.

## Priority 1 — Sanity Project And Studio Foundation

### 1. `sanity.config.ts`

Purpose:

- define the Sanity Studio project configuration;
- connect `projectId`, `dataset`, and `schema`;
- register Studio plugins such as structure and vision if approved;
- define Studio title and base path;
- establish the schema source used by the embedded Studio.

Why required:

- the repository currently has schemas but no Studio configuration;
- without this file, there is no operational Studio application.

Implementation responsibility:

- should import the existing schema registry from `sanity/schema.ts` or use an equivalent central schema export;
- should use production-safe environment configuration;
- should not duplicate schema registration in multiple places.

### 2. `sanity.cli.ts`

Purpose:

- define CLI-level Sanity project metadata;
- support Sanity CLI commands;
- connect CLI operations to the correct project and dataset.

Why required:

- the audit found no Sanity CLI configuration;
- CLI configuration is expected for a maintainable Sanity project workflow.

Implementation responsibility:

- should use the same project/dataset assumptions as the Studio config;
- must not rely on unsafe demo defaults.

### 3. `app/studio/[[...index]]/page.tsx`

Purpose:

- embed the Sanity Studio inside the Next.js App Router;
- provide the editor-facing Studio route;
- render the Studio using the project configuration.

Why required:

- editors currently cannot access a CMS UI from the app;
- this is the core missing Studio integration layer.

Implementation responsibility:

- should be isolated from public marketing pages;
- should not affect the homepage or blog rendering paths;
- should respect Next.js App Router conventions;
- should be treated as an editor/admin route with production access considerations.

### 4. `sanity/env.ts` revision

Purpose:

- centralize Sanity environment values;
- remove production-unsafe defaults;
- validate required variables.

Current issue:

- `projectId` currently defaults to `demo`.

Implementation responsibility:

- required configuration should fail clearly when missing;
- public values should remain safe for client-side exposure;
- token/private values must not use `NEXT_PUBLIC_` names.

## Priority 2 — Data Access And Query Foundation

### 5. `sanity/lib.client.ts` revision

Purpose:

- preserve public read-client behavior;
- ensure production-safe configuration;
- define clear CDN usage rules.

Required responsibility:

- public published-content reads;
- stable API version;
- correct dataset/project ID;
- no accidental draft leakage.

### 6. `sanity/lib.queries.ts` or equivalent query module

Purpose:

- centralize all GROQ queries;
- avoid inline query duplication inside route components;
- define query responsibilities and projection shape.

Required queries:

- `getPosts`;
- `getPostBySlug`;
- `getFeaturedPosts`;
- `getGlobalConfig`;
- `getFaqs`;
- `getTestimonials`;
- `getServices`;
- `getHighlightedContent`.

No code is generated here; this file is required in the future architecture.

### 7. `sanity/lib.fetch.ts` or equivalent fetch wrapper

Purpose:

- centralize Sanity fetch behavior;
- support caching/revalidation decisions;
- support published and preview fetch modes;
- avoid repeated client calls throughout routes.

Required responsibility:

- define error behavior;
- define no-data behavior;
- define revalidation policy;
- support preview/draft mode later.

### 8. `sanity/lib.preview.ts` or equivalent preview support

Purpose:

- define preview/draft client behavior;
- support authenticated draft reads;
- support Sanity preview flow.

Required responsibility:

- keep preview credentials server-only;
- avoid leaking draft data into public routes;
- integrate with Next.js draft mode strategy.

## Priority 3 — Schema Productionization

### 9. `sanity/schemas/post.ts` revision

Purpose:

- transform the current minimal post schema into a complete editorial post model.

Required editorial fields:

- title;
- slug;
- excerpt;
- body/rich content;
- publishedAt;
- updatedAt or editorial date strategy;
- featured image;
- image alt text;
- author or reviewedBy field;
- categories/tags;
- featured flag;
- language/locale if bilingual content is required;
- SEO title;
- SEO description;
- OpenGraph title if separate;
- OpenGraph description if separate;
- OpenGraph image;
- canonical URL override if needed;
- noindex flag if needed;
- reading time or estimated reading metadata if required;
- clinical/editorial review status if content governance requires it.

Validation requirements:

- title required;
- slug required and unique;
- excerpt required for listing/SEO fallback;
- body required for publishable posts;
- publishedAt required for published posts;
- image alt text required when featured image exists;
- SEO description length governance;
- slug format governance.

### 10. `sanity/schemas/faq.ts` revision

Decision: **Extend**

Current fields:

- question;
- answer;
- order.

Required editorial fields:

- category or section assignment;
- visibility/enabled flag;
- locale if needed;
- clinical boundary flag if relevant;
- order validation;
- question/answer required validation;
- optional internal notes.

Purpose:

- allow FAQ content to support structured editorial governance without becoming uncontrolled content.

### 11. `sanity/schemas/testimonial.ts` revision

Decision: **Extend**

Current fields:

- author;
- quote;
- featured.

Required editorial fields:

- anonymized display label;
- location/context if approved;
- species/case type if approved;
- consent status;
- confidentiality note;
- order;
- visibility/enabled flag;
- locale if needed;
- validation for quote and attribution.

Purpose:

- preserve privacy and clinical sensitivity while supporting trust content.

### 12. `sanity/schemas/service.ts` revision

Decision: **Extend**

Current fields:

- name;
- slug;
- description;
- active.

Required editorial fields:

- modality;
- short description;
- long description;
- target cases;
- eligibility/fit notes;
- safety/boundary notes;
- order;
- CTA label/reference if controlled by CMS later;
- SEO fields if service pages are generated;
- active/visibility controls;
- locale if needed.

Purpose:

- support future CMS-managed services without turning clinical services into generic product cards.

### 13. `sanity/schemas/highlighted-content.ts` revision

Decision: **Extend with governance**

Current fields:

- title;
- url;
- platform.

Required editorial fields:

- content type;
- description;
- thumbnail/image;
- display order;
- published date;
- visibility/enabled flag;
- clinical relevance note;
- platform controlled options;
- avoid generic social/content-creator drift.

Purpose:

- support highlighted external content while preserving clinical authority governance.

### 14. `sanity/schemas/global-config.ts` revision

Decision: **Extend carefully**

Current fields:

- siteTitle;
- siteDescription;
- defaultLocale;
- whatsapp.

Required editorial fields:

- default SEO title;
- default SEO description;
- default OpenGraph image;
- contact configuration;
- social links if needed;
- organization/professional profile references;
- locale settings;
- preview banner or editorial notices if needed.

Purpose:

- centralize global editorial settings, but avoid replacing stable application configuration unless explicitly planned.

### 15. `sanity/schemas/index.ts` and `sanity/schema.ts` updates

Purpose:

- keep schema registration centralized;
- ensure all revised schemas are registered consistently;
- avoid duplicate schema source of truth.

## Priority 4 — Blog Route Integration

### 16. `app/blog/page.tsx` revision

Purpose:

- transform static placeholder blog listing into CMS-powered listing.

Required responsibilities:

- fetch published posts;
- render post cards;
- sort by publication date;
- link to detail routes;
- handle empty state;
- preserve Human Clinical Premium content positioning;
- avoid feed-like social/content-creator presentation.

### 17. `app/blog/[slug]/page.tsx` revision

Purpose:

- transform slug placeholder into CMS-powered post detail route.

Required responsibilities:

- fetch post by slug;
- return not-found for missing/unpublished posts;
- render title, excerpt, date, body, image, and metadata-driven content;
- support static params or dynamic rendering strategy;
- generate post-specific metadata;
- support preview behavior when enabled.

### 18. Rich text rendering module

Purpose:

- render Sanity Portable Text or selected rich content model safely.

Required responsibilities:

- define supported block types;
- define mark/link behavior;
- define image handling;
- preserve clinical brand tone and readability;
- avoid arbitrary HTML injection.

## Priority 5 — SEO And Preview Integration

### 19. Blog metadata integration

Purpose:

- produce per-post `Metadata` from CMS content.

Required responsibilities:

- title strategy;
- description strategy;
- canonical strategy;
- OpenGraph strategy;
- Twitter card strategy;
- fallback strategy.

### 20. Preview route / draft mode route

Purpose:

- allow editors to preview unpublished content.

Required responsibilities:

- authenticate preview requests;
- enable Next.js draft mode;
- resolve post preview URLs;
- prevent public access to drafts;
- provide editor-friendly failure states.

---

# IMPLEMENTATION PHASES

## Phase 1 — CMS Foundation And Configuration

### Objective

Make the repository capable of running a Sanity Studio and connecting safely to the correct Sanity project/dataset.

### Scope

- Add Studio configuration architecture.
- Add CLI configuration architecture.
- Add embedded Studio route architecture.
- Correct Sanity environment rules.
- Resolve package/lock dependency mismatch.

### Files Expected In This Phase

- `sanity.config.ts`
- `sanity.cli.ts`
- `app/studio/[[...index]]/page.tsx`
- `sanity/env.ts`
- dependency manifest/lockfile only if required to resolve version mismatch

### Exit Criteria

- Studio configuration exists.
- CLI configuration exists.
- Studio route exists.
- Required environment variables are enforced.
- No demo project fallback remains for production.
- Dependency versions are consistent and compatible with target Next.js/React versions.

## Phase 2 — Schema Productionization

### Objective

Make content models capable of supporting production editorial workflows.

### Scope

- Extend `post` into a complete blog post model.
- Extend supporting schemas with validation and governance.
- Add SEO and OpenGraph fields.
- Add editorial fields and visibility controls.
- Add preview definitions where appropriate.

### Files Expected In This Phase

- `sanity/schemas/post.ts`
- `sanity/schemas/faq.ts`
- `sanity/schemas/testimonial.ts`
- `sanity/schemas/service.ts`
- `sanity/schemas/highlighted-content.ts`
- `sanity/schemas/global-config.ts`
- `sanity/schemas/index.ts`
- `sanity/schema.ts`

### Exit Criteria

- All production-required schemas are registered.
- Blog posts support body content, SEO, OpenGraph, image, authoring metadata, and publication metadata.
- Validation rules are defined.
- Supporting schemas are governed and usable.

## Phase 3 — Query And Data Access Layer

### Objective

Centralize CMS reads and establish a stable data contract between Sanity and the app.

### Scope

- Define query module.
- Define public fetch wrapper.
- Define preview/draft fetch strategy.
- Define expected query return shapes.
- Define error and empty-state behavior.

### Files Expected In This Phase

- query module under `sanity/` or `lib/`
- fetch wrapper under `sanity/` or `lib/`
- preview support module under `sanity/` or `lib/`
- optional type definitions under `types/`

### Exit Criteria

- Blog listing query exists conceptually and is implemented in the sprint.
- Blog detail query exists conceptually and is implemented in the sprint.
- Global configuration query exists if global config is used.
- Preview and published data access are separated.
- Query responsibilities are centralized.

## Phase 4 — CMS-Powered Blog Listing

### Objective

Replace the static blog listing placeholder with CMS-powered published post listing.

### Scope

- Fetch published posts.
- Render listing cards.
- Link to post details.
- Handle empty state.
- Preserve clinical/premium content presentation.

### Files Expected In This Phase

- `app/blog/page.tsx`
- query/fetch modules from Phase 3
- optional blog card components if implementation chooses a component boundary

### Exit Criteria

- Published CMS posts appear in the blog listing.
- Unpublished drafts do not appear publicly.
- Empty state is handled.
- Listing links resolve to valid detail routes.

## Phase 5 — CMS-Powered Blog Detail

### Objective

Replace the slug placeholder page with real CMS-powered post detail rendering.

### Scope

- Fetch post by slug.
- Render post content.
- Render rich text safely.
- Handle not-found.
- Support static params or dynamic rendering strategy.
- Support preview mode if enabled.

### Files Expected In This Phase

- `app/blog/[slug]/page.tsx`
- rich text rendering module
- query/fetch modules
- optional post-specific components

### Exit Criteria

- Published post URL renders actual CMS content.
- Missing slug returns not-found behavior.
- Rich content renders safely.
- Detail page is shareable.

## Phase 6 — SEO, OpenGraph, And Sharing

### Objective

Make CMS-powered posts production-ready for search and sharing.

### Scope

- Add post-specific metadata generation.
- Add canonical URL strategy.
- Add OpenGraph image strategy.
- Add fallback metadata behavior.
- Ensure site-wide metadata helper remains compatible.

### Files Expected In This Phase

- `app/blog/[slug]/page.tsx`
- `lib/seo.ts` or a blog-specific SEO helper
- schema SEO fields from Phase 2

### Exit Criteria

- Each post has title metadata.
- Each post has description metadata.
- Each post has canonical URL.
- Each post has OpenGraph metadata.
- Fallback metadata exists when optional fields are omitted.

## Phase 7 — Draft Preview And Editorial Workflow

### Objective

Enable editors to preview draft content safely before publication.

### Scope

- Define preview route.
- Enable draft mode.
- Authenticate preview access.
- Fetch draft content with preview client.
- Provide editor-safe URL resolution.

### Files Expected In This Phase

- preview route under `app/api` or equivalent App Router convention
- preview data client
- draft-mode helpers
- Studio preview URL configuration

### Exit Criteria

- Editors can preview drafts.
- Drafts do not leak publicly.
- Preview URLs resolve correctly.
- Published mode remains stable.

## Phase 8 — Production Hardening

### Objective

Verify the CMS is safe, maintainable, and production-ready.

### Scope

- Environment validation.
- Build/typecheck validation.
- Studio access verification.
- Dataset/project verification.
- Editorial workflow test.
- SEO sharing test.
- Security review.

### Exit Criteria

- Full editorial workflow works.
- Build and typecheck pass.
- Studio is accessible to authorized editors.
- Blog listing and detail are CMS-backed.
- Draft preview works.
- No demo configuration remains.

---

# STUDIO LAYER

## Required Files

### `sanity.config.ts`

Responsibilities:

- define Studio project;
- define dataset and project ID;
- register schema;
- configure Studio plugins;
- define base path;
- optionally define desk/content structure.

### `sanity.cli.ts`

Responsibilities:

- define project ID and dataset for CLI operations;
- support Sanity CLI workflows;
- align CLI config with Studio config.

### `app/studio/[[...index]]/page.tsx`

Responsibilities:

- embed Studio into the App Router;
- expose an editor-facing CMS route;
- render the Studio configuration;
- keep Studio isolated from public app sections.

## Studio Access Strategy

The Studio should be accessible only to authorized Sanity users and should not be treated as a public marketing route.

Production expectations:

- Studio route exists under a predictable but protected path;
- Sanity authentication controls editor access;
- deployment environment variables are configured securely;
- preview token or read token is never exposed publicly;
- CORS and allowed origins are configured in Sanity project settings.

---

# CMS SCHEMA LAYER

## `post`

Decision: **Replace minimal model with production editorial model**

Required fields:

- title;
- slug;
- excerpt;
- body/rich content;
- publishedAt;
- featured image;
- featured image alt text;
- author or reviewer;
- categories/tags;
- featured flag;
- locale if required;
- SEO title;
- SEO description;
- OpenGraph title;
- OpenGraph description;
- OpenGraph image;
- canonical override;
- noindex flag;
- editorial status/review metadata if required.

## `faq`

Decision: **Extend**

Required fields:

- question;
- answer;
- order;
- category/section;
- enabled/visibility;
- locale if required;
- internal notes;
- validation.

## `testimonial`

Decision: **Extend**

Required fields:

- author/display label;
- quote;
- featured;
- consent status;
- confidentiality/anonymization flag;
- location/context if approved;
- species/case type if approved;
- order;
- enabled/visibility;
- locale if required.

## `service`

Decision: **Extend**

Required fields:

- name;
- slug;
- short description;
- long description;
- modality;
- target cases;
- clinical boundaries;
- active/visibility;
- order;
- SEO fields if service pages are generated;
- locale if required.

## `highlighted-content`

Decision: **Extend with strict governance**

Required fields:

- title;
- URL;
- platform;
- content type;
- description;
- thumbnail;
- published date;
- display order;
- enabled/visibility;
- clinical relevance note.

## `global-config`

Decision: **Extend carefully**

Required fields:

- site title;
- site description;
- default locale;
- WhatsApp/contact configuration;
- default SEO title;
- default SEO description;
- default OpenGraph image;
- social links if required;
- organization/professional data if required.

---

# QUERY LAYER

## Query Module Responsibilities

The query layer should centralize all GROQ responsibilities. Route files should not become the long-term home for complex query definitions.

## Required Queries

### `getPosts`

Responsibility:

- fetch published posts for the blog listing;
- project listing fields only;
- exclude drafts publicly;
- order by published date;
- include slug, title, excerpt, image, published date, and category metadata.

### `getPostBySlug`

Responsibility:

- fetch one post by slug;
- include full body content;
- include SEO and OpenGraph fields;
- include image metadata;
- return null/empty result for missing or unpublished posts.

### `getFeaturedPosts`

Responsibility:

- fetch posts marked featured;
- support homepage or blog feature modules if approved later;
- remain separate from normal listing query.

### `getGlobalConfig`

Responsibility:

- fetch CMS-managed global settings if the project chooses to use CMS for global config;
- keep fallback behavior explicit.

### `getFaqs`

Responsibility:

- fetch visible FAQs in order;
- support category/section filtering.

### `getTestimonials`

Responsibility:

- fetch visible testimonials;
- respect featured/order controls;
- support confidentiality governance fields.

### `getServices`

Responsibility:

- fetch active services;
- support order and modality fields.

### `getHighlightedContent`

Responsibility:

- fetch approved highlighted content;
- respect display order and clinical governance.

## Fetch Policy Responsibilities

The query/fetch layer must define:

- CDN usage for published public content;
- non-CDN or authenticated fetches for preview content;
- revalidation policy;
- error behavior;
- empty-state behavior;
- draft exclusion for public routes;
- draft inclusion for authenticated preview only.

---

# BLOG INTEGRATION LAYER

## Listing Architecture

`app/blog/page.tsx` should become a CMS-powered listing route.

Responsibilities:

- fetch published posts using the query layer;
- render cards/listing items from CMS data;
- link each card to `/blog/[slug]`;
- render an empty state when no published posts exist;
- avoid rendering drafts publicly;
- preserve Human Clinical Premium content positioning;
- avoid social-feed aesthetics.

## Detail Architecture

`app/blog/[slug]/page.tsx` should become a CMS-powered detail route.

Responsibilities:

- resolve route slug;
- fetch post by slug;
- render not-found for missing/unpublished content;
- render CMS title, excerpt, body, date, image, and metadata fields;
- support rich content rendering;
- support preview/draft mode when authenticated;
- define static or dynamic route generation strategy.

## Metadata Architecture

Blog detail metadata should be generated from CMS fields.

Responsibilities:

- fetch minimal post metadata by slug;
- use SEO fields when present;
- fall back to title/excerpt;
- set canonical URL;
- set OpenGraph metadata;
- handle not-found metadata behavior.

---

# SEO LAYER

## Title Strategy

Priority order:

1. post SEO title;
2. post title plus site name;
3. global fallback title.

## Description Strategy

Priority order:

1. post SEO description;
2. post excerpt;
3. global site description.

## Canonical Strategy

Rules:

- default canonical should be derived from `siteConfig.url` plus the post slug;
- canonical override may exist for editorial exceptions;
- canonical should never point to draft preview URLs.

## OpenGraph Strategy

Priority order:

1. post OpenGraph title/description/image;
2. post SEO title/description and featured image;
3. post title/excerpt and default site image;
4. global fallback OpenGraph metadata.

## Metadata Generation Strategy

The blog detail route should own post-specific metadata generation. Shared metadata helpers can support formatting and fallback behavior, but route-level metadata must be driven by CMS post data.

---

# EDITORIAL WORKFLOW

## 1. Create Post

Editor opens embedded Studio, creates a `post`, fills required fields, and saves a draft.

Requirements:

- Studio route available;
- post schema complete;
- validation clear;
- slug generated from title.

## 2. Save Draft

Editor saves without publishing.

Requirements:

- native Sanity draft behavior available;
- draft remains excluded from public blog listing/detail.

## 3. Preview

Editor opens preview URL from Studio or a preview action.

Requirements:

- authenticated preview route;
- draft mode enabled;
- preview client can read draft perspective;
- preview URL resolves to correct post path.

## 4. Publish

Editor publishes post in Studio.

Requirements:

- required validation passes;
- publishedAt strategy is clear;
- post moves from draft-only to public published state.

## 5. Appear On Site

Published post appears in `/blog` listing and detail page.

Requirements:

- listing query fetches published posts;
- detail query resolves slug;
- caching/revalidation strategy updates within acceptable time.

## 6. Share URL

Published post URL displays correct content and metadata when shared.

Requirements:

- canonical URL correct;
- metadata generated;
- OpenGraph image available;
- post detail route returns non-placeholder content.

---

# SECURITY

## Studio Access Strategy

The Studio should be protected primarily through Sanity authentication and project membership. Only authorized editors should have access to content management.

Production considerations:

- Studio route should not expose secret tokens;
- deployment domain should be configured in Sanity allowed origins;
- editor access should be managed in Sanity project settings;
- Studio route should not be indexed if not intended for public discovery.

## Authentication Strategy

The public app should only use a public read client for published content.

Draft/preview behavior should use server-only secrets and authenticated access. Tokens must never be exposed through `NEXT_PUBLIC_` variables.

## Production Considerations

- remove unsafe `demo` project fallback;
- validate required environment variables;
- separate public and preview clients;
- configure CORS/allowed origins;
- define token scopes narrowly;
- prevent draft content leakage;
- avoid logging sensitive environment values;
- keep Studio and preview workflows isolated from public pages.

---

# RISKS

## 1. Package / Lockfile Version Mismatch

The current package manifest and lockfile appear inconsistent around Next/React versions. CMS implementation must not proceed to production until dependency versions are reconciled.

Impact: High

Mitigation:

- decide target Next/React versions;
- align `package.json` and lockfile;
- verify `next-sanity` and `sanity` peer compatibility;
- run install/build/typecheck under CI-like conditions.

## 2. Unsafe Demo Project Fallback

`projectId` currently defaults to `demo`.

Impact: High

Mitigation:

- require explicit project ID;
- fail clearly when missing;
- document environment variables.

## 3. Studio Exists But Blog Remains Static

Adding Studio alone will not make the blog CMS-powered.

Impact: High

Mitigation:

- treat Studio, schema, queries, listing, and detail pages as separate required milestones.

## 4. Minimal Post Schema Cannot Support Real Publishing

The current post schema cannot support full blog content.

Impact: High

Mitigation:

- productionize the post schema before integrating blog detail rendering.

## 5. Draft Leakage

Preview implementation can accidentally expose drafts if public and preview clients are not separated.

Impact: High

Mitigation:

- separate clients;
- keep preview tokens server-only;
- enforce published-only public queries.

## 6. Content Governance Drift

Highlighted content and blog content can pull the site toward generic content marketing if schemas and routes are not governed.

Impact: Medium / High

Mitigation:

- include editorial governance fields;
- preserve Human Clinical Premium presentation;
- avoid feed-like blog design.

## 7. SEO Incompleteness

Blog posts may render but share poorly if metadata is not CMS-backed.

Impact: Medium / High

Mitigation:

- implement post-specific metadata in the same overall CMS integration track.

## 8. Overloading Global Config

CMS-managed global config can conflict with existing local `config/site.ts` if ownership is unclear.

Impact: Medium

Mitigation:

- decide which values remain code-owned and which become CMS-owned before implementation.

## 9. Studio Route Deployment Surprises

Embedded Studio can introduce build/client-boundary issues if not isolated correctly.

Impact: Medium

Mitigation:

- validate Studio route in local dev and production build;
- keep Studio route isolated from public page layouts if needed.

---

# FINAL READINESS CHECKLIST

The CMS should not be considered production-ready until every item below is complete.

## Foundation

- Sanity config exists.
- Sanity CLI config exists.
- Embedded Studio route exists.
- Required environment variables are validated.
- No unsafe demo fallback remains.
- Package manifest and lockfile are aligned.
- Target Next.js/React compatibility is verified.

## Studio

- Editors can access Studio.
- Studio uses registered schemas.
- Studio can create and edit documents.
- Studio works in local dev.
- Studio works in deployed environment.
- Studio access is restricted to authorized users.

## Schemas

- Post schema supports full editorial content.
- Post schema supports SEO and OpenGraph fields.
- Post schema has validation.
- Supporting schemas are extended with governance fields.
- Schema registration is centralized.
- Preview definitions are available where needed.

## Data Layer

- Query module exists.
- Fetch wrapper exists.
- Public client reads only published content.
- Preview client reads draft content only in authenticated preview mode.
- Empty/error behavior is defined.
- Revalidation/caching strategy is defined.

## Blog Listing

- `/blog` fetches CMS posts.
- Listing excludes drafts publicly.
- Listing sorts by publication date.
- Listing links to detail pages.
- Empty state exists.

## Blog Detail

- `/blog/[slug]` fetches CMS post by slug.
- Missing posts return not-found.
- Rich content renders safely.
- Featured images and alt text render correctly.
- Published dates render correctly.
- Detail URLs are shareable.

## SEO

- Post-specific metadata is generated.
- Canonical URLs are correct.
- OpenGraph metadata is generated.
- OpenGraph image fallback exists.
- Metadata has safe fallbacks.

## Editorial Workflow

- Editor can create post.
- Editor can save draft.
- Editor can preview draft.
- Editor can publish post.
- Published post appears on listing.
- Published post detail opens correctly.
- Shared URL displays correct metadata.

## Security

- Preview tokens are server-only.
- Public routes do not expose secrets.
- Draft content does not leak.
- Studio access is limited to authorized users.
- Sanity CORS/allowed origins are configured.

---

# FINAL ARCHITECTURE VERDICT

The correct implementation path is not a small blog patch. It is a complete CMS activation sequence:

1. establish Studio and project configuration;
2. productionize schemas;
3. centralize queries and fetch behavior;
4. connect blog listing;
5. connect blog detail;
6. add metadata and OpenGraph;
7. enable draft preview;
8. harden security and editorial workflow.

Only after all eight phases are complete should the repository be considered a fully operational Sanity CMS implementation.
