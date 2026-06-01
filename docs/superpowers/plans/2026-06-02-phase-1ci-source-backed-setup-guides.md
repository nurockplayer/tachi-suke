# Phase 1CI Source-Backed Setup Guides Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add official source links to first-week setup and ward-office moving-in procedure articles.

**Architecture:** Reuse the existing article `sourceLinks` frontmatter model. Add source links to eight existing Markdown articles, extend content-health and build-output SEO tests, and document the added trust coverage.

**Tech Stack:** Astro, Markdown frontmatter, Node test runner, pnpm.

---

## Task 1: Tests

**Files:**
- Modify: `tests/content-health.test.mjs`
- Modify: `tests/seo-output.test.mjs`

- [x] Add a failing content-health assertion requiring Immigration Services Agency and Digital Agency source links for all four first-week setup articles.
- [x] Add a failing content-health assertion requiring Immigration Services Agency and Digital Agency source links for all four ward-office moving-in procedure articles.
- [x] Add build-output SEO assertions for representative English setup and ward-office pages.

## Task 2: Content

**Files:**
- Modify: `src/content/articles/zh-tw-first-week-japan-setup.md`
- Modify: `src/content/articles/en-first-week-japan-setup.md`
- Modify: `src/content/articles/ja-first-week-japan-setup.md`
- Modify: `src/content/articles/ko-first-week-japan-setup.md`
- Modify: `src/content/articles/zh-tw-ward-office-moving-in-procedures.md`
- Modify: `src/content/articles/en-ward-office-moving-in-procedures.md`
- Modify: `src/content/articles/ja-ward-office-moving-in-procedures.md`
- Modify: `src/content/articles/ko-ward-office-moving-in-procedures.md`

- [x] Add Immigration Services Agency source link.
- [x] Add Digital Agency My Number FAQ source link.
- [x] Update `updatedAt` to the review date.
- [x] Keep labels and notes localized and clear.

## Task 3: Documentation

**Files:**
- Modify: `AGENTS.md`
- Modify: `docs/IMPLEMENTATION_STATUS.md`
- Modify: `docs/ACCEPTANCE_CRITERIA.md`
- Modify: `docs/ROADMAP.md`
- Add: `docs/superpowers/specs/2026-06-02-phase-1ci-source-backed-setup-guides-design.md`

- [x] Record Phase 1CI source-link coverage.
- [x] Keep Phase 1 boundaries explicit.

## Task 4: Validation And Handoff

- [x] Run `pnpm test`.
- [x] Run `pnpm check:content`.
- [x] Run `pnpm build`.
- [x] Run `pnpm check:links`.
- [x] Run `pnpm check:seo`.
- [ ] Run deploy-output checks if merged to `main`.
- [ ] Hand off the validated branch for PR, review, merge, and deployment according to `AGENTS.md`.
