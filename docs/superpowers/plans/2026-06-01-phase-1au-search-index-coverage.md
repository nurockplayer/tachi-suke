# Phase 1AU Search Index Coverage Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Strengthen build-output tests for static search indexes as published tool content grows.

**Architecture:** Keep the existing search implementation unchanged. Add assertions to `tests/seo-output.test.mjs` that parse built `dist/en/search-index.json`.

**Tech Stack:** Astro static output, Node test runner, pnpm.

---

### Task 1: Add Search Index Coverage Tests

**Files:**
- Modify: `tests/seo-output.test.mjs`

- [x] Assert English search index includes every current published tool route.
- [x] Assert English search index excludes account, search page, search index, and submit/contact form utility routes.

### Task 2: Update Docs

**Files:**
- Modify: `docs/ACCEPTANCE_CRITERIA.md`
- Modify: `docs/IMPLEMENTATION_STATUS.md`
- Modify: `docs/ROADMAP.md`

- [x] Record Phase 1AU search index coverage checks.

### Task 3: Validate And Ship

- [x] Run `pnpm install`.
- [x] Run `pnpm test`.
- [x] Run `pnpm check:content`.
- [x] Run `pnpm build`.
- [x] Run `pnpm check:links`.
- [x] Run `pnpm check:seo`.
- [x] Scan for forbidden lockfiles.
- [ ] Open PR, address review feedback, and merge after checks pass.
