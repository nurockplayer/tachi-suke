# Phase 1BV Residence Admin Source Links Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add official source links to residence card, resident record, and My Number basics articles.

**Architecture:** Reuse article `sourceLinks` without changing the schema or layout. Add source links to four existing Markdown articles, extend content-health and SEO-output tests, and document the added trust coverage.

**Tech Stack:** Astro, Markdown frontmatter, Node test runner, pnpm.

---

## Task 1: Tests

**Files:**
- Modify: `tests/content-health.test.mjs`
- Modify: `tests/seo-output.test.mjs`

- [ ] Add a failing content-health assertion requiring `moj.go.jp` and `digital.go.jp` source links for all four residence/admin articles.
- [ ] Add a failing build-output assertion for the English residence/admin page.

## Task 2: Content

**Files:**
- Modify: `src/content/articles/zh-tw-residence-admin-basics.md`
- Modify: `src/content/articles/en-residence-admin-basics.md`
- Modify: `src/content/articles/ja-residence-admin-basics.md`
- Modify: `src/content/articles/ko-residence-admin-basics.md`

- [ ] Add Digital Agency My Number FAQ source link.
- [ ] Add Immigration Services Agency living/working guidebook source link.
- [ ] Keep labels and notes localized and clear.

## Task 3: Documentation

**Files:**
- Modify: `docs/IMPLEMENTATION_STATUS.md`
- Modify: `docs/ROADMAP.md`

- [ ] Record Phase 1BV source-link coverage for residence/admin articles.
- [ ] Keep Phase 1 boundaries explicit.

## Task 4: Validation And Handoff

- [ ] Run `pnpm test`.
- [ ] Run `pnpm check:content`.
- [ ] Run `pnpm build`.
- [ ] Run `pnpm check:links`.
- [ ] Run `pnpm check:seo`.
- [ ] Hand off the validated branch for owner-approved commit, PR, merge, and deploy workflow according to `AGENTS.md`.
