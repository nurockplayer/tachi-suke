# Phase 1T Article Category Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:test-driven-development for red/green implementation and superpowers:executing-plans to track this checklist.

**Goal:** Add SEO-friendly static article category landing pages generated from public article content.

**Architecture:** Create a small article category helper for slugging, summaries, and static paths. Use explicit locale route files that delegate rendering to a shared category page component.

**Tech Stack:** Astro static routes, TypeScript, Astro content collections, Node test runner, pnpm.

---

### Task 1: Spec and Red Tests

**Files:**
- Create: `docs/superpowers/specs/2026-06-01-phase-1t-article-category-pages-design.md`
- Create: `docs/superpowers/plans/2026-06-01-phase-1t-article-category-pages.md`
- Modify: `tests/project-structure.test.mjs`
- Modify: `tests/seo-output.test.mjs`

- [x] Write the Phase 1T design spec.
- [x] Assert article category route files exist for every supported locale.
- [x] Assert shared article category helper and page component exist.
- [x] Assert article index and article detail pages link to category pages.
- [x] Assert built category pages are included in sitemap and list only same-locale public articles.
- [x] Run `pnpm test` and confirm source-level checks fail before implementation.

### Task 2: Category Implementation

**Files:**
- Create: `src/lib/content/article-categories.ts`
- Create: `src/components/pages/ArticleCategoryPage.astro`
- Create: `src/pages/zh-tw/articles/category/[category].astro`
- Create: `src/pages/en/articles/category/[category].astro`
- Create: `src/pages/ja/articles/category/[category].astro`
- Create: `src/pages/ko/articles/category/[category].astro`
- Modify: `src/components/pages/ArticlesIndexPage.astro`
- Modify: `src/components/layout/ArticleLayout.astro`
- Modify: `src/pages/sitemap.xml.ts`
- Modify: `src/styles/global.css`

- [x] Generate category static paths from non-draft articles.
- [x] Render category landing pages with same-locale public articles.
- [x] Add category navigation links to article index pages.
- [x] Link article detail category labels to category pages.
- [x] Add category pages to sitemap with category lastmod.

### Task 3: Documentation and Verification

**Files:**
- Modify: `README.md`
- Modify: `docs/PROJECT_SPEC.md`
- Modify: `docs/PAGE_SPEC.md`
- Modify: `docs/IMPLEMENTATION_STATUS.md`
- Modify: `docs/ACCEPTANCE_CRITERIA.md`
- Modify: `docs/ROADMAP.md`
- Modify: `AGENTS.md`

- [x] Document article category page behavior and limitations.
- [x] Run `pnpm install`.
- [x] Run `pnpm test`.
- [x] Run `pnpm build`.
- [x] Run `pnpm check:links`.
- [x] Run `pnpm check:seo`.
- [x] Smoke check one category page output.
- [ ] Commit, push, create PR, wait for CI, and merge.
