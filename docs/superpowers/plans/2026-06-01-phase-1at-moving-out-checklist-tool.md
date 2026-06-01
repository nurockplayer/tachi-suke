# Phase 1AT Moving-Out Checklist Tool Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a published four-locale static moving-out checklist for Japan apartment residents.

**Architecture:** Use the existing `tools` collection, generated tool detail pages, sitemap entries, search indexing, and static link checks. No schema, backend, or UI behavior changes are required.

**Tech Stack:** Astro content collections, JSON content, TypeScript-backed Node tests, pnpm.

---

### Task 1: Lock Expected Coverage

**Files:**
- Modify: `tests/project-structure.test.mjs`
- Modify: `tests/seo-output.test.mjs`

- [x] Add source-level assertions that published tools include `moving-out-checklist`.
- [x] Add build-output sitemap assertions for representative locale tool detail routes.

### Task 2: Add Tool Content

**Files:**
- Create: `src/content/tools/moving-out-checklist.json`

- [x] Add localized title, description, source note, notes, and four sections.
- [x] Keep `status` as `published` and `lastCheckedAt` as `2026-06-01`.

### Task 3: Update Docs

**Files:**
- Modify: `README.md`
- Modify: `docs/IMPLEMENTATION_STATUS.md`
- Modify: `docs/PROJECT_SPEC.md`
- Modify: `docs/ROADMAP.md`
- Modify: `docs/ACCEPTANCE_CRITERIA.md`

- [x] Update tool counts and Phase 1AT documentation.

### Task 4: Validate And Ship

- [x] Run `pnpm install`.
- [x] Run `pnpm test`.
- [x] Run `pnpm check:content`.
- [x] Run `pnpm build`.
- [x] Run `pnpm check:links`.
- [x] Run `pnpm check:seo`.
- [x] Scan for forbidden lockfiles.
- [ ] Open PR, address review feedback, and merge after checks pass.
