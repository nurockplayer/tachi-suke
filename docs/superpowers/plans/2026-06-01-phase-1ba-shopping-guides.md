# Phase 1BA Shopping Guides Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans or an equivalent task-by-task implementation workflow. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add four locale-specific everyday shopping guides and localized `shopping` category copy.

**Architecture:** Use the existing Markdown article collection with `category = shopping`. Existing article detail, category, sitemap, RSS, search, and related-content behavior should pick up the new content automatically.

**Tech Stack:** Astro content collections, Markdown, TypeScript-backed Node tests, pnpm.

---

### Task 1: Lock Expected Coverage

**Files:**
- Modify: `tests/project-structure.test.mjs`
- Modify: `tests/seo-output.test.mjs`

- [x] Increase article count and per-locale thresholds for Phase 1BA.
- [x] Assert four shopping guide article slugs exist.
- [x] Assert `shopping` category labels exist in category helper.
- [x] Assert sitemap and RSS include representative new article URLs.

### Task 2: Add Category Copy

**Files:**
- Modify: `src/lib/content/article-categories.ts`

- [x] Add localized title and description for `shopping`.

### Task 3: Add Articles

**Files:**
- Create: `src/content/articles/zh-tw-japan-shopping-basics.md`
- Create: `src/content/articles/en-japan-shopping-basics.md`
- Create: `src/content/articles/ja-japan-shopping-basics.md`
- Create: `src/content/articles/ko-japan-shopping-basics.md`

- [x] Add frontmatter, internal links, and decision-oriented body copy.

### Task 4: Update Docs

**Files:**
- Modify: `README.md`
- Modify: `docs/CONTENT_STRATEGY.md`
- Modify: `docs/IMPLEMENTATION_STATUS.md`
- Modify: `docs/PROJECT_SPEC.md`
- Modify: `docs/ROADMAP.md`
- Modify: `docs/ACCEPTANCE_CRITERIA.md`

- [x] Record Phase 1BA article count, shopping category copy, and everyday shopping coverage.

### Task 5: Validate And Ship

- [x] Run `pnpm install`.
- [x] Run `pnpm test`.
- [x] Run `pnpm check:content`.
- [x] Run `pnpm build`.
- [x] Run `pnpm check:links`.
- [x] Run `pnpm check:seo`.
- [x] Scan for forbidden lockfiles.
- [ ] Open PR, address review feedback, and merge after checks pass.
