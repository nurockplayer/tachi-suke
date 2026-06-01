# Phase 1AW Ward Office Moving-In Articles Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans or an equivalent task-by-task implementation workflow. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add four locale-specific ward/city office moving-in procedure articles that deepen the administrative setup content cluster.

**Architecture:** Use the existing Markdown article collection with `category = procedures`. Existing article detail, category, sitemap, RSS, search, and related-content behavior should pick up the new content automatically.

**Tech Stack:** Astro content collections, Markdown, TypeScript-backed Node tests, pnpm.

---

### Task 1: Lock Expected Coverage

**Files:**
- Modify: `tests/project-structure.test.mjs`
- Modify: `tests/seo-output.test.mjs`

- [x] Increase article count and per-locale thresholds for Phase 1AW.
- [x] Assert four ward-office moving-in article slugs exist.
- [x] Assert sitemap and RSS include representative new article URLs.

### Task 2: Add Articles

**Files:**
- Create: `src/content/articles/zh-tw-ward-office-moving-in-procedures.md`
- Create: `src/content/articles/en-ward-office-moving-in-procedures.md`
- Create: `src/content/articles/ja-ward-office-moving-in-procedures.md`
- Create: `src/content/articles/ko-ward-office-moving-in-procedures.md`

- [x] Add frontmatter, internal links, and decision-oriented body copy.

### Task 3: Update Docs

**Files:**
- Modify: `README.md`
- Modify: `docs/CONTENT_STRATEGY.md`
- Modify: `docs/IMPLEMENTATION_STATUS.md`
- Modify: `docs/PROJECT_SPEC.md`
- Modify: `docs/ROADMAP.md`
- Modify: `docs/ACCEPTANCE_CRITERIA.md`

- [x] Record Phase 1AW article count and ward-office moving-in procedure coverage.

### Task 4: Validate And Ship

- [x] Run `pnpm install`.
- [x] Run `pnpm test`.
- [x] Run `pnpm check:content`.
- [x] Run `pnpm build`.
- [x] Run `pnpm check:links`.
- [x] Run `pnpm check:seo`.
- [x] Scan for forbidden lockfiles.
- [ ] Open PR, address review feedback, and merge after checks pass.
