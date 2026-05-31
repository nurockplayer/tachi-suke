# Phase 1E Structured Data Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add dependency-free JSON-LD structured data for the site, articles, places, and breadcrumbs.

**Architecture:** `BaseLayout` serializes default site JSON-LD plus optional page JSON-LD. Detail components build their own page-specific JSON-LD from existing content collection data and canonical URL context.

**Tech Stack:** Astro, TypeScript, Node test runner, pnpm.

---

### Task 1: Source Tests

**Files:**
- Modify: `tests/project-structure.test.mjs`

- [ ] Assert `BaseLayout.astro` accepts a `jsonLd` prop.
- [ ] Assert `BaseLayout.astro` renders `application/ld+json`.
- [ ] Assert `ArticleLayout.astro` passes JSON-LD into `BaseLayout`.
- [ ] Assert `PlaceDetailPage.astro` passes JSON-LD into `BaseLayout`.
- [ ] Run `pnpm test` and confirm the new assertions fail before implementation.

### Task 2: Build-Output SEO Tests

**Files:**
- Modify: `tests/seo-output.test.mjs`

- [ ] Add a helper that reads built HTML and extracts JSON-LD script contents.
- [ ] Assert a built article page includes `Article` and `BreadcrumbList`.
- [ ] Assert a built place page includes `LocalBusiness` and `BreadcrumbList`.
- [ ] Assert the root page includes `WebSite` and `Organization`.
- [ ] Run `pnpm check:seo` after the current build and confirm the new assertions fail before implementation.

### Task 3: BaseLayout JSON-LD Support

**Files:**
- Modify: `src/components/layout/BaseLayout.astro`

- [ ] Add a `jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>` prop.
- [ ] Build default `Organization` and `WebSite` objects from `Astro.site`.
- [ ] Serialize default and page JSON-LD safely inside `application/ld+json` scripts.

### Task 4: Detail Page JSON-LD

**Files:**
- Modify: `src/components/layout/ArticleLayout.astro`
- Modify: `src/components/pages/PlaceDetailPage.astro`

- [ ] Add `Article` and `BreadcrumbList` data to `ArticleLayout`.
- [ ] Add `LocalBusiness` and `BreadcrumbList` data to `PlaceDetailPage`.
- [ ] Use only existing static fields. Do not invent ratings, reviews, opening hours, or exact addresses.

### Task 5: Documentation

**Files:**
- Modify: `README.md`
- Modify: `docs/PROJECT_SPEC.md`
- Modify: `docs/IMPLEMENTATION_STATUS.md`
- Modify: `docs/ACCEPTANCE_CRITERIA.md`
- Modify: `docs/ROADMAP.md`
- Modify: `AGENTS.md`

- [ ] Document structured data coverage and limitations.
- [ ] Document that JSON-LD must not claim unavailable ratings, reviews, or hours.

### Task 6: Verification and Publish

**Files:**
- No production files unless fixing verification failures.

- [ ] Run `pnpm install`.
- [ ] Run `pnpm test`.
- [ ] Run `pnpm build`.
- [ ] Run `pnpm check:links`.
- [ ] Run `pnpm check:seo`.
- [ ] Check pnpm policy terms in changed files.
- [ ] Commit, push, create PR, and merge when checks are acceptable.
