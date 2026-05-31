# Phase 1G Related Content Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add build-time related article links to article detail pages.

**Architecture:** `ArticleDetailPage` computes related articles from the `articles` collection. `ArticleLayout` receives simple related link data and renders a localized section after the Markdown/MDX body.

**Tech Stack:** Astro, TypeScript, Astro content collections, Node test runner.

---

### Task 1: Failing Source and Output Tests

**Files:**
- Modify: `tests/project-structure.test.mjs`
- Modify: `tests/seo-output.test.mjs`

- [ ] Assert `ArticleDetailPage.astro` defines `relatedArticles`.
- [ ] Assert `ArticleDetailPage.astro` passes `relatedArticles={relatedArticles}` to `ArticleLayout`.
- [ ] Assert `ArticleLayout.astro` accepts a `relatedArticles` prop.
- [ ] Assert `ArticleLayout.astro` renders a `related-articles` section.
- [ ] Assert a built English article page contains a link to another English article page.
- [ ] Run `pnpm test` and confirm the source test fails before implementation.
- [ ] Run `pnpm check:seo` after the current build and confirm the output test fails before implementation.

### Task 2: Related Articles Implementation

**Files:**
- Modify: `src/components/pages/ArticleDetailPage.astro`
- Modify: `src/components/layout/ArticleLayout.astro`

- [ ] Compute related articles from non-draft same-locale articles.
- [ ] Score same category and shared tags before recency.
- [ ] Pass up to three related links into `ArticleLayout`.
- [ ] Render a localized section after article body.

### Task 3: Documentation

**Files:**
- Modify: `README.md`
- Modify: `docs/IMPLEMENTATION_STATUS.md`
- Modify: `docs/ACCEPTANCE_CRITERIA.md`
- Modify: `docs/ROADMAP.md`
- Modify: `AGENTS.md`

- [ ] Document static related article navigation and limitations.

### Task 4: Verification and Publish

**Files:**
- No production files unless fixing verification failures.

- [ ] Run `pnpm install`.
- [ ] Run `pnpm test`.
- [ ] Run `pnpm build`.
- [ ] Run `pnpm check:links`.
- [ ] Run `pnpm check:seo`.
- [ ] Check pnpm policy terms in changed files.
- [ ] Commit, push, create PR, and merge when checks are acceptable.
