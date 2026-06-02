# SANITY_CMS_AUDIT_V1

## Audit Scope

This document audits the current repository to determine whether Sanity CMS is fully operational or only partially integrated.

This is a technical audit only. It does not modify files, generate code, redesign architecture, or create implementation files.

---

# EXECUTIVE SUMMARY

## Current CMS Maturity Score

**28 / 100**

## Verdict

The repository contains a **partial Sanity integration**, not a fully operational CMS implementation.

Sanity packages, schema files, a schema registry, environment helpers, and a read client exist. However, the implementation is not operational for editors because there is no visible Sanity Studio configuration, no Studio route, no Sanity CLI configuration, no `defineConfig(...)` setup, and no blog data fetching from Sanity.

The blog routes currently render static placeholder content. The Sanity schemas are minimal and do not yet support complete editorial publishing, rich post bodies, SEO metadata, OpenGraph fields, authoring workflows, preview, draft handling, or live editorial operations.

## High-Level Status

| Area | Status | Summary |
|---|---|---|
| Sanity dependency installed | Partial / Present | `sanity` and `next-sanity` are installed. |
| Sanity config | Missing | No `sanity.config.ts/js`, no `sanity.cli.ts/js`, no `defineConfig(...)`. |
| Studio route | Missing | No `app/studio` or `pages/studio`. |
| Schema layer | Partial | Several document schemas exist and are registered, but they are minimal. |
| Client layer | Partial | `createClient(...)` exists, but defaults to `projectId = demo`. |
| Blog listing | Missing CMS integration | Static placeholder page; no Sanity query. |
| Blog detail | Missing CMS integration | Static slug echo; no Sanity query. |
| Editorial workflow | Mostly missing | Editors cannot access Studio in this app, and published posts do not render in blog routes. |
| SEO for posts | Partial schema / missing implementation | Post schema has slug/title/excerpt, but no metadata generation or OpenGraph per post. |

## Operational Conclusion

A content model foundation exists, but the CMS is not currently usable as a production editorial system.

---

# CURRENT STATE

## Sanity Configuration

### Files Searched For

- `sanity.config.ts`
- `sanity.config.js`
- `sanity.cli.ts`
- `sanity.cli.js`
- `defineConfig(...)`
- Studio configuration

### Findings

No Sanity project configuration file was found in the repository.

There is no:

- `sanity.config.ts`;
- `sanity.config.js`;
- `sanity.cli.ts`;
- `sanity.cli.js`;
- `defineConfig(...)` call;
- visible Studio configuration;
- Studio tool registration;
- desk structure configuration;
- local Studio entrypoint.

### Status

**Missing**

### Completeness

**Not complete**

### Diagnosis

The repository includes Sanity schemas and a client, but it does not include the configuration required to run or deploy a Sanity Studio from this codebase.

This means Sanity is present as a dependency and data layer concept, but not as a complete CMS application.

---

## Schema Layer

### Files Present

- `sanity/schema.ts`
- `sanity/schemas/index.ts`
- `sanity/schemas/post.ts`
- `sanity/schemas/testimonial.ts`
- `sanity/schemas/faq.ts`
- `sanity/schemas/service.ts`
- `sanity/schemas/highlighted-content.ts`
- `sanity/schemas/global-config.ts`

### Schema Registration

`sanity/schema.ts` imports schema definitions from `@/sanity/schemas` and registers the following types:

1. `blogPostType`
2. `testimonialType`
3. `faqType`
4. `serviceType`
5. `highlightedContentType`
6. `globalConfigType`

### Document Types Available

## `post`

Fields:

- `title` — string
- `slug` — slug, sourced from title
- `excerpt` — text
- `publishedAt` — datetime

Status: **Partial**

The model supports a minimal blog-card concept but not a full editorial post.

Missing or incomplete for production blogging:

- rich body/content field;
- portable text blocks;
- author;
- categories/tags;
- featured image;
- SEO title;
- SEO description separate from excerpt;
- OpenGraph image;
- canonical URL;
- language/locale support;
- draft/publish editorial assumptions beyond native Sanity behavior;
- validation rules;
- preview configuration;
- slug required validation;
- published date required validation.

## `testimonial`

Fields:

- `author` — string
- `quote` — text
- `featured` — boolean, default false

Status: **Partial**

This supports a simple testimonial model. It lacks validation, ordering, source metadata, locale, confidentiality flags, and structured usage controls.

## `faq`

Fields:

- `question` — string
- `answer` — text
- `order` — number

Status: **Partial**

This supports simple FAQ entries. It lacks validation, categories, visibility controls, locale, and page/section assignment.

## `service`

Fields:

- `name` — string
- `slug` — slug, sourced from name
- `description` — text
- `active` — boolean, default true

Status: **Partial**

This supports a basic service model. It lacks structured pricing, duration, modality, SEO, ordering, locale, clinical disclaimers, and relationship to pages.

## `highlightedContent`

Fields:

- `title` — string
- `url` — url
- `platform` — string

Status: **Partial**

This can represent external content links but does not define content type, display order, thumbnail, description, embed data, publication date, or governance around social/content positioning.

## `globalConfig`

Fields:

- `siteTitle` — string
- `siteDescription` — text
- `defaultLocale` — string, initial value `es`
- `whatsapp` — string

Status: **Partial**

This provides a minimal global configuration model. It is not currently connected to the site configuration used by the application, which appears to come from local config files.

### Schema Layer Verdict

The schema layer is **present but partial**.

It defines several document types, but the models are minimal and appear closer to scaffolding than production editorial schemas. There is no evidence that these schemas are currently used by the public app routes.

---

## Client Layer

### Files Present

- `sanity/env.ts`
- `sanity/lib.client.ts`

### Current Client Configuration

`sanity/env.ts` defines:

- `apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-01-01'`
- `dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'`
- `projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'demo'`

`sanity/lib.client.ts` creates a client with:

- `apiVersion`
- `dataset`
- `projectId`
- `useCdn: true`

### Production Readiness

**Partial / Not production ready as-is**

### Strengths

- A Sanity client exists.
- It uses `next-sanity`'s `createClient(...)`.
- It centralizes `apiVersion`, `dataset`, and `projectId` in `sanity/env.ts`.
- It uses the CDN for public reads.

### Risks / Missing Configuration

- `projectId` defaults to `demo`, which is not production-safe.
- There is no validation that required environment variables exist.
- No write token is configured, which is expected for public read clients but means no server-side write workflow exists.
- No preview/draft client exists.
- No authenticated client exists for draft mode.
- No `perspective` configuration is present for drafts/published content.
- No obvious error-handling or fallback strategy exists around data fetching.
- The client is not used by the blog routes.

### Client Layer Verdict

The client layer is **scaffolded but not operationally integrated**.

It can theoretically read from Sanity if the environment variables are configured correctly and if queries are written, but the public blog currently does not use it.

---

## Studio Integration

### Files / Routes Searched For

- `app/studio`
- `pages/studio`
- Studio route
- Studio provider
- `NextStudio`
- `defineConfig(...)`
- Sanity Studio configuration

### Findings

No Studio route or Studio configuration was found.

There is no evidence of:

- an embedded Studio UI;
- a routed Studio page;
- a Studio provider;
- a Studio config file;
- a desk structure;
- an editor-facing CMS path.

### Can Editors Access A CMS From This App?

**No**

At least from this repository, editors cannot access a Sanity Studio UI because no Studio route or configuration exists.

### Studio Integration Verdict

**Missing**

This is one of the largest blockers preventing the repository from being a fully operational Sanity CMS implementation.

---

## Blog Integration

### Files Analyzed

- `app/blog/page.tsx`
- `app/blog/[slug]/page.tsx`

### Blog Listing

`app/blog/page.tsx` currently renders only:

- a static section;
- a static `Blog` heading.

It does not:

- import `sanityClient`;
- run a GROQ query;
- list posts;
- handle loading/error/empty states;
- link to post detail pages;
- sort by `publishedAt`;
- use Sanity post data.

Status: **Static content / not connected to Sanity**

### Blog Detail Page

`app/blog/[slug]/page.tsx` currently:

- reads the route `slug` param;
- renders `Post: {slug}`.

It does not:

- import `sanityClient`;
- run a GROQ query;
- fetch a post by slug;
- render title/excerpt/body;
- generate static params;
- handle missing posts;
- generate metadata from post data;
- render published content.

Status: **Static placeholder / not connected to Sanity**

### GROQ Queries

No GROQ queries were found in the app source.

### Data Fetching

No Sanity data fetching is present in the blog routes.

### Blog Functional Verdict

The blog is **not CMS-backed**.

The current blog routes are placeholders and do not provide a functional editorial publishing path.

---

## Editorial Workflow

| Workflow Step | Status | Evidence / Diagnosis |
|---|---|---|
| 1. Create post | Missing in this app | No Studio route/config exists. A `post` schema exists, but editors cannot access Studio from this repository. |
| 2. Save draft | Missing in this app | Native Sanity drafts would require Studio access; no Studio is available here. |
| 3. Publish | Missing in this app | Publishing requires Studio or another Sanity interface; this repository does not expose one. |
| 4. Appear in blog listing | Missing | Blog listing is static and does not query Sanity. |
| 5. Open detail page | Partial / placeholder only | Dynamic route exists, but it only echoes the slug and does not fetch post data. |
| 6. Share URL | Partial / placeholder only | A slug URL can be opened, but it does not represent a real CMS-backed post. |

### Editorial Workflow Verdict

The full editorial workflow is **not currently possible** from this repository.

A minimal post schema exists, but the Studio, data fetching, listing rendering, detail rendering, and post metadata layers are missing.

---

## SEO Validation

## Blog Post Slug

Status: **Partial**

The `post` schema includes a `slug` field, and the app includes a dynamic route at `app/blog/[slug]/page.tsx`. However, the detail route does not fetch Sanity posts by slug.

## Blog Post Title

Status: **Partial**

The schema includes `title`, but the detail page does not fetch or render the Sanity title.

## Blog Post Description

Status: **Partial**

The schema includes `excerpt`, which could support a description. However, no route metadata uses it.

## OpenGraph

Status: **Missing for blog posts**

The global metadata helper supports OpenGraph defaults, but individual blog posts do not generate post-specific OpenGraph metadata. The `post` schema also lacks an OpenGraph image field.

## Metadata Generation

Status: **Missing for blog posts**

No `generateMetadata(...)` function exists in `app/blog/[slug]/page.tsx`, and no post-specific metadata fetching is present.

## SEO Verdict

Blog SEO is **partial at the schema level and missing at the route implementation level**.

The current repository has global SEO helpers, but blog posts do not yet support operational post-specific metadata.

---

# MISSING COMPONENTS

## 1. Sanity Project Configuration

Missing:

- `sanity.config.ts` or `sanity.config.js`;
- `sanity.cli.ts` or `sanity.cli.js`;
- `defineConfig(...)`;
- Studio tool configuration;
- Studio schema registration through config.

## 2. Studio UI / Editor Access

Missing:

- `app/studio` or equivalent route;
- embedded Studio UI;
- Studio provider;
- authentication/editor access path.

## 3. Production-Ready Environment Configuration

Missing or incomplete:

- real project ID enforcement;
- environment validation;
- production-safe handling of missing variables;
- draft/preview client configuration.

## 4. Blog Data Fetching

Missing:

- GROQ queries;
- Sanity post listing query;
- Sanity post-by-slug query;
- empty state/error handling;
- 404 handling for missing posts;
- static params or dynamic rendering strategy.

## 5. Complete Blog Schema

Missing:

- body/rich text content;
- featured image;
- author;
- categories/tags;
- SEO fields;
- OpenGraph fields;
- validation rules;
- preview configuration;
- locale support if bilingual content is expected.

## 6. Post Rendering

Missing:

- list cards using CMS data;
- post detail layout using CMS data;
- rich-text rendering;
- published date display;
- canonical URL handling;
- related content or navigation, if required later.

## 7. Editorial Workflow Support

Missing:

- editor-accessible Studio;
- draft preview;
- published content rendering;
- post listing integration;
- post detail integration.

---

# RISKS

## 1. False Sense Of CMS Completion

Because `sanity` dependencies, schemas, and a client exist, the repository may appear CMS-ready. It is not. The most important production risk is assuming the CMS is operational when the public routes are still static placeholders.

## 2. Demo Project ID Fallback

`NEXT_PUBLIC_SANITY_PROJECT_ID` defaults to `demo`. If environment variables are not configured, production could attempt to query an invalid or unintended Sanity project.

## 3. No Editor Access

Without Studio configuration or a Studio route, editors cannot create, draft, or publish content through this app.

## 4. Blog Routes Do Not Use CMS Data

Published posts cannot appear in the blog listing or detail page because neither route queries Sanity.

## 5. Incomplete Post Model

The `post` schema lacks body content, media, SEO, authoring metadata, and validation. Even if Studio were available, posts would not support full editorial publishing.

## 6. Missing SEO Metadata For Posts

Blog detail pages do not generate metadata from post content. Shared URLs would not have post-specific title, description, or OpenGraph content.

## 7. No Draft Preview Workflow

There is no preview mode, draft perspective, or authenticated client. Editors would not be able to preview unpublished changes in the site.

## 8. Potential Content Governance Drift

The repository contains schemas for highlighted content and posts, but no clear editorial governance is enforced through schema validation or route behavior. This could later create inconsistency between the clinical premium positioning and content operations.

## 9. Runtime Placeholder Risk

The dynamic blog detail route responds for arbitrary slugs and renders `Post: {slug}`. This can create misleading URLs that appear valid despite not being backed by real content.

---

# RECOMMENDED NEXT SPRINT

This is an ordered audit-based priority list. It does not include code or implementation details.

## 1. Establish Sanity Configuration And Studio Access

Priority: **Critical**

Reason: Without Sanity config and Studio access, editors cannot create, draft, or publish content from this repository.

## 2. Replace Demo Environment Defaults With Production-Safe CMS Configuration Rules

Priority: **Critical**

Reason: The current `projectId = demo` fallback is not production-safe. CMS connectivity should fail clearly when required configuration is missing.

## 3. Complete The Blog Post Content Model

Priority: **Critical**

Reason: The current `post` schema cannot support complete blog publishing because it lacks body content, media, SEO, validation, and editorial metadata.

## 4. Connect Blog Listing To Sanity Data

Priority: **High**

Reason: Published posts cannot appear on the blog listing until the listing fetches and renders CMS data.

## 5. Connect Blog Detail Pages To Sanity Data

Priority: **High**

Reason: The dynamic slug route exists but does not fetch or render post content.

## 6. Add Post-Specific SEO And OpenGraph Support

Priority: **High**

Reason: Blog posts need title, description, slug, canonical, OpenGraph, and metadata generation support to be shareable and production-ready.

## 7. Define Draft Preview And Editorial Review Workflow

Priority: **Medium / High**

Reason: A professional editorial CMS should support previewing draft content before publication.

## 8. Add Editorial Governance To Supporting Schemas

Priority: **Medium**

Reason: FAQ, testimonial, service, highlighted content, and global config schemas are minimal and should eventually reflect real editorial governance, ordering, validation, localization, and visibility requirements.

---

# FINAL AUDIT VERDICT

The repository currently has **Sanity scaffolding**, not a fully operational Sanity CMS.

Implemented today:

- Sanity dependencies;
- a read client;
- environment helper constants;
- a schema registry;
- minimal document schemas;
- placeholder blog routes.

Missing today:

- Sanity config;
- Sanity CLI config;
- Studio route/UI;
- production-safe environment validation;
- complete blog post schema;
- GROQ queries;
- Sanity-powered blog listing;
- Sanity-powered blog detail pages;
- post-specific metadata;
- draft preview workflow;
- operational editorial publishing path.

Therefore, the CMS maturity score is **28 / 100**.

The current implementation is best described as:

> **Partial Sanity integration with schema/client scaffolding, but no operational CMS workflow or CMS-backed blog rendering.**
