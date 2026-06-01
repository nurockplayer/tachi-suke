# Phase 1AS Apartment Viewing Japanese Phrases Tool Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a published four-locale static tool for Japanese phrases used during apartment viewings and rental inquiries.

**Architecture:** Reuse the existing `tools` content collection, tool index cards, tool detail routes, sitemap generation, search indexing, and static link checks. No schema or runtime behavior changes are needed.

**Tech Stack:** Astro content collections, JSON content, TypeScript-backed tests, pnpm.

---

### Task 1: Lock Expected Coverage

**Files:**
- Modify: `tests/project-structure.test.mjs`
- Modify: `tests/seo-output.test.mjs`

- [x] Add source-level assertions that published tools include `apartment-viewing-japanese-phrases`.
- [x] Add build-output sitemap assertions for representative locale tool detail routes.

### Task 2: Add Tool Content

**Files:**
- Create: `src/content/tools/apartment-viewing-japanese-phrases.json`

- [x] Add localized title, description, source note, notes, and four sections.
- [x] Keep `status` as `published` and `lastCheckedAt` as `2026-06-01`.

### Task 3: Add Internal Links And Docs

**Files:**
- Modify: `src/content/articles/en-renting-initial-costs.md`
- Modify: `src/content/articles/ja-renting-initial-costs.md`
- Modify: `src/content/articles/ko-renting-initial-costs.md`
- Modify: `src/content/articles/zh-tw-renting-initial-costs.md`
- Modify: `README.md`
- Modify: `docs/IMPLEMENTATION_STATUS.md`
- Modify: `docs/PROJECT_SPEC.md`
- Modify: `docs/ROADMAP.md`
- Modify: `docs/ACCEPTANCE_CRITERIA.md`

- [x] Link rental initial-cost articles to the phrase tool.
- [x] Update tool counts and Phase 1AS documentation.

### Task 4: Validate And Ship

- [x] Run `pnpm install`.
- [x] Run `pnpm test`.
- [x] Run `pnpm check:content`.
- [x] Run `pnpm build`.
- [x] Run `pnpm check:links`.
- [x] Run `pnpm check:seo`.
- [x] Scan for forbidden lockfiles.
- [ ] Open PR, address review feedback, and merge after checks pass.
