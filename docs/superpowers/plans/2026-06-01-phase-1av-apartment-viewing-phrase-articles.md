# Phase 1AV Apartment Viewing Phrase Articles Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add four locale-specific apartment viewing Japanese phrase articles and a localized practical-language article category.

**Architecture:** Use the existing Markdown article collection and category helper. Existing article detail, category, sitemap, RSS, search, and related-content behavior should pick up the new content automatically.

**Tech Stack:** Astro content collections, Markdown, TypeScript-backed Node tests, pnpm.

---

### Task 1: Lock Expected Coverage

**Files:**
- Modify: `tests/project-structure.test.mjs`
- Modify: `tests/seo-output.test.mjs`

- [x] Add expected article count and per-locale thresholds.
- [x] Assert four apartment-viewing phrase article slugs exist.
- [x] Assert `language` category labels exist in category helper.
- [x] Assert sitemap and RSS include representative new article URLs.

### Task 2: Add Category Copy

**Files:**
- Modify: `src/lib/content/article-categories.ts`

- [x] Add localized title and description for `language`.

### Task 3: Add Articles

**Files:**
- Create: `src/content/articles/zh-tw-apartment-viewing-japanese-phrases.md`
- Create: `src/content/articles/en-apartment-viewing-japanese-phrases.md`
- Create: `src/content/articles/ja-apartment-viewing-japanese-phrases.md`
- Create: `src/content/articles/ko-apartment-viewing-japanese-phrases.md`

- [x] Add frontmatter, internal links, and decision-oriented body copy.

### Task 4: Update Docs

**Files:**
- Modify: `README.md`
- Modify: `docs/CONTENT_STRATEGY.md`
- Modify: `docs/IMPLEMENTATION_STATUS.md`
- Modify: `docs/PROJECT_SPEC.md`
- Modify: `docs/ROADMAP.md`
- Modify: `docs/ACCEPTANCE_CRITERIA.md`

- [x] Record Phase 1AV article count and practical-language category coverage.

### Task 5: Validate And Ship

- [x] Run `pnpm install`.
- [x] Run `pnpm test`.
- [x] Run `pnpm check:content`.
- [x] Run `pnpm build`.
- [x] Run `pnpm check:links`.
- [x] Run `pnpm check:seo`.
- [x] Scan for forbidden lockfiles.
- [ ] Open PR, address review feedback, and merge after checks pass.
