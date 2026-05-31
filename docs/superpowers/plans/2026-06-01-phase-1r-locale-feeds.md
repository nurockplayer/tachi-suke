# Phase 1R Locale RSS Feeds Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add build-time locale-specific RSS feeds while preserving the existing global feed.

**Architecture:** Extract the existing RSS rendering logic into a small helper module, reuse it from `/feed.xml` and four locale feed endpoint files, and add feed discovery links from `BaseLayout`.

**Tech Stack:** Astro static endpoints, TypeScript, Astro content collections, Node test runner, pnpm.

---

### Task 1: Tests and Spec

**Files:**
- Create: `docs/superpowers/specs/2026-06-01-phase-1r-locale-feeds-design.md`
- Create: `docs/superpowers/plans/2026-06-01-phase-1r-locale-feeds.md`
- Modify: `tests/project-structure.test.mjs`
- Modify: `tests/seo-output.test.mjs`

- [x] Write the Phase 1R design spec.
- [x] Assert locale feed route files exist for every supported locale.
- [x] Assert `BaseLayout` links to the current locale feed.
- [x] Assert built locale feeds exist, include same-locale articles, exclude other-locale articles, and exclude drafts.
- [x] Run `pnpm test` and confirm the new source-level checks fail before implementation.

### Task 2: Feed Implementation

**Files:**
- Create: `src/lib/content/rss.ts`
- Modify: `src/pages/feed.xml.ts`
- Create: `src/pages/zh-tw/feed.xml.ts`
- Create: `src/pages/en/feed.xml.ts`
- Create: `src/pages/ja/feed.xml.ts`
- Create: `src/pages/ko/feed.xml.ts`
- Modify: `src/components/layout/BaseLayout.astro`
- Modify: `src/pages/sitemap.xml.ts`

- [x] Move RSS XML escaping, date formatting, and item rendering to `src/lib/content/rss.ts`.
- [x] Keep `/feed.xml` behavior as the global multilingual feed.
- [x] Add four locale endpoint files that call the shared helper with a locale filter.
- [x] Add an RSS alternate link for the active locale feed in `BaseLayout`.
- [x] Add locale feed paths to `sitemap.xml`.

### Task 3: Documentation and Verification

**Files:**
- Modify: `README.md`
- Modify: `docs/PROJECT_SPEC.md`
- Modify: `docs/PAGE_SPEC.md`
- Modify: `docs/IMPLEMENTATION_STATUS.md`
- Modify: `docs/ACCEPTANCE_CRITERIA.md`
- Modify: `docs/ROADMAP.md`
- Modify: `AGENTS.md`

- [x] Document global and locale feed behavior.
- [x] Run `pnpm install`.
- [x] Run `pnpm test`.
- [x] Run `pnpm build`.
- [x] Run `pnpm check:links`.
- [x] Run `pnpm check:seo`.
- [x] Smoke check one locale feed output.
- [ ] Commit, push, create PR, wait for CI, and merge.
