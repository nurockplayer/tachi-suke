# Phase 1BU Article Source Links Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add structured official-source links to high-risk article pages.

**Architecture:** Extend the article content collection and TypeScript boundary with optional `sourceLinks`, pass the data through `ArticleDetailPage`, and render a locale-aware section in `ArticleLayout`. Populate the first source links in existing emergency/disaster and work-contract articles, then document the model and verify source/build output.

**Tech Stack:** Astro, TypeScript, Markdown frontmatter, Node test runner, pnpm.

---

### Task 1: Source-Level Tests

**Files:**
- Modify: `tests/project-structure.test.mjs`
- Modify: `tests/content-health.test.mjs`
- Modify: `tests/seo-output.test.mjs`

- [ ] Add failing assertions that `src/content.config.ts` defines article `sourceLinks` with `label`, `url`, and optional `note`.
- [ ] Add failing assertions that `src/types/article.ts` exports `ArticleSourceLink` and includes `sourceLinks`.
- [ ] Add failing assertions that `ArticleLayout` accepts and renders article source links.
- [ ] Add failing assertions that `ArticleDetailPage` passes `article.data.sourceLinks`.
- [ ] Add failing content-health assertions for the four emergency/disaster articles and four work-contract articles.
- [ ] Add failing build-output assertion for the English emergency/disaster page after `pnpm build`.

### Task 2: Article Model And Layout

**Files:**
- Modify: `src/content.config.ts`
- Modify: `src/types/article.ts`
- Modify: `src/components/layout/ArticleLayout.astro`
- Modify: `src/components/pages/ArticleDetailPage.astro`

- [ ] Add optional/defaulted article `sourceLinks` schema.
- [ ] Add `ArticleSourceLink` TypeScript interface.
- [ ] Add localized copy for the source section.
- [ ] Render the source section only when `sourceLinks.length > 0`.
- [ ] Pass `sourceLinks={article.data.sourceLinks}` from the detail page.

### Task 3: Article Frontmatter

**Files:**
- Modify: `src/content/articles/*emergency-disaster-basics.md`
- Modify: `src/content/articles/*work-contract-basics.md`

- [ ] Add two official `sourceLinks` to each emergency/disaster article.
- [ ] Add two official `sourceLinks` to each work-contract article.
- [ ] Keep labels and notes natural for each locale.

### Task 4: Documentation

**Files:**
- Modify: `README.md`
- Modify: `AGENTS.md`
- Modify: `docs/CONTENT_MODEL.md`
- Modify: `docs/PROJECT_SPEC.md`
- Modify: `docs/IMPLEMENTATION_STATUS.md`
- Modify: `docs/ACCEPTANCE_CRITERIA.md`
- Modify: `docs/ROADMAP.md`

- [ ] Document article source links as a static content trust feature.
- [ ] Note that external source links are editorial starting points and not live-validated.
- [ ] Keep Phase 1 boundaries explicit.

### Task 5: Validation, PR, Merge, Deploy

- [ ] Run `pnpm test`.
- [ ] Run `pnpm check:content`.
- [ ] Run `pnpm build`.
- [ ] Run `pnpm check:links`.
- [ ] Run `pnpm check:seo`.
- [ ] Run browser QA on a representative article page.
- [ ] Commit, push, open PR, wait for checks, merge.
- [ ] Deploy merged `main` to Cloudflare Pages and verify production output.
