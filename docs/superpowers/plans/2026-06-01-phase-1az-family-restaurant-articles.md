# Phase 1AZ Family Restaurant Articles Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans or an equivalent task-by-task implementation workflow. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add English, Japanese, and Korean family restaurant comparison articles for Denny's, Gusto, and Royal Host.

**Architecture:** Use the existing Markdown article collection with `category = food` and the existing zh-tw `translationKey`. Existing article detail, category, sitemap, RSS, search, related-content, and hreflang behavior should pick up the translations automatically.

**Tech Stack:** Astro content collections, Markdown, TypeScript-backed Node tests, pnpm.

---

### Task 1: Lock Expected Coverage

**Files:**
- Modify: `tests/project-structure.test.mjs`
- Modify: `tests/seo-output.test.mjs`

- [x] Increase article count and per-locale thresholds for Phase 1AZ.
- [x] Assert three translated family restaurant article slugs exist.
- [x] Assert sitemap and RSS include representative new article URLs.

### Task 2: Add Articles

**Files:**
- Create: `src/content/articles/en-family-restaurants.md`
- Create: `src/content/articles/ja-family-restaurants.md`
- Create: `src/content/articles/ko-family-restaurants.md`

- [x] Add frontmatter, internal links, and decision-oriented body copy.

### Task 3: Update Docs

**Files:**
- Modify: `README.md`
- Modify: `docs/CONTENT_STRATEGY.md`
- Modify: `docs/IMPLEMENTATION_STATUS.md`
- Modify: `docs/PROJECT_SPEC.md`
- Modify: `docs/ROADMAP.md`
- Modify: `docs/ACCEPTANCE_CRITERIA.md`

- [x] Record Phase 1AZ article count and family restaurant translation coverage.

### Task 4: Validate And Ship

- [x] Run `pnpm install`.
- [x] Run `pnpm test`.
- [x] Run `pnpm check:content`.
- [x] Run `pnpm build`.
- [x] Run `pnpm check:links`.
- [x] Run `pnpm check:seo`.
- [x] Scan for forbidden lockfiles.
- [ ] Open PR, address review feedback, and merge after checks pass.
