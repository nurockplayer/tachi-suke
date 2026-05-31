# Phase 1S Static Search Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:test-driven-development for red/green implementation and superpowers:executing-plans to track this checklist.

**Goal:** Add dependency-free static site search for public content in each supported locale.

**Architecture:** Generate locale search indexes from Astro content collections through a shared content helper, expose them as static JSON endpoints, and render a noindex locale search page that filters the same public entries on the client.

**Tech Stack:** Astro static pages/endpoints, TypeScript, Astro content collections, vanilla browser JavaScript, Node test runner, pnpm.

---

### Task 1: Spec and Red Tests

**Files:**
- Create: `docs/superpowers/specs/2026-06-01-phase-1s-static-search-design.md`
- Create: `docs/superpowers/plans/2026-06-01-phase-1s-static-search.md`
- Modify: `tests/project-structure.test.mjs`
- Modify: `tests/seo-output.test.mjs`

- [x] Write the Phase 1S design spec.
- [x] Assert locale search pages exist for every supported locale.
- [x] Assert locale search index JSON endpoints exist for every supported locale.
- [x] Assert search helper and SearchPage component exist.
- [x] Assert search pages are noindex and navigation links to search.
- [x] Assert built search index JSON includes public entries and excludes private/placeholder content.
- [x] Run `pnpm test` and confirm the new source-level checks fail before implementation.

### Task 2: Static Search Implementation

**Files:**
- Create: `src/lib/content/search.ts`
- Create: `src/components/pages/SearchPage.astro`
- Create: `src/pages/zh-tw/search.astro`
- Create: `src/pages/en/search.astro`
- Create: `src/pages/ja/search.astro`
- Create: `src/pages/ko/search.astro`
- Create: `src/pages/zh-tw/search-index.json.ts`
- Create: `src/pages/en/search-index.json.ts`
- Create: `src/pages/ja/search-index.json.ts`
- Create: `src/pages/ko/search-index.json.ts`
- Modify: `src/lib/i18n/index.ts`
- Modify: `src/styles/global.css`

- [x] Build search entries from public content collections.
- [x] Add JSON endpoints for each locale.
- [x] Add SearchPage with localized copy, static result cards, and client-side filtering.
- [x] Add search link to primary navigation.
- [x] Keep search pages out of sitemap while generated as routable static pages.

### Task 3: Documentation and Verification

**Files:**
- Modify: `README.md`
- Modify: `docs/PROJECT_SPEC.md`
- Modify: `docs/PAGE_SPEC.md`
- Modify: `docs/IMPLEMENTATION_STATUS.md`
- Modify: `docs/ACCEPTANCE_CRITERIA.md`
- Modify: `docs/ROADMAP.md`
- Modify: `AGENTS.md`
- Modify: `docs/DEPLOYMENT.md`

- [x] Document static search behavior and limitations.
- [x] Run `pnpm install`.
- [x] Run `pnpm test`.
- [x] Run `pnpm build`.
- [x] Run `pnpm check:links`.
- [x] Run `pnpm check:seo`.
- [x] Smoke check one search page and one search index JSON output.
- [ ] Commit, push, create PR, wait for CI, and merge.
