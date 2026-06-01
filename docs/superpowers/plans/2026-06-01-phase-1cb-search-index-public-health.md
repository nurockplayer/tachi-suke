# Phase 1CB Search Index Public Health Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add regression coverage that proves generated locale search indexes contain only public content collection routes.

**Architecture:** Keep search unchanged and add build-output validation in `tests/seo-output.test.mjs`. Derive expected URLs from source content files so the test follows public visibility rules instead of hard-coding counts.

**Tech Stack:** Astro static output, Node test runner, pnpm.

---

### Task 1: Add Search Index Public-Visibility Test

**Files:**
- Modify: `tests/project-structure.test.mjs`
- Modify: `tests/seo-output.test.mjs`

- [x] **Step 1: Write the failing structural assertion**

Assert that `tests/seo-output.test.mjs` contains a build-output test named `keeps locale search indexes limited to public content collections`.

- [x] **Step 2: Run the source test to verify red**

Run: `pnpm test`

Expected: FAIL because the named SEO output test is missing.

- [x] **Step 3: Add the build-output test**

Read content collection files, derive expected public URLs by type, parse each locale `search-index.json`, and compare generated URLs to the expected public route sets.

- [x] **Step 4: Verify green**

Run: `pnpm build` then `pnpm check:seo`.

Expected: PASS with all locale search indexes validated.

### Task 2: Update Docs

**Files:**
- Modify: `docs/ACCEPTANCE_CRITERIA.md`
- Modify: `docs/IMPLEMENTATION_STATUS.md`
- Modify: `docs/ROADMAP.md`

- [x] **Step 1: Document the new acceptance rule**

Record that `pnpm check:seo` validates all four locale search indexes against public content collections.

- [x] **Step 2: Record Phase 1CB status**

Add Phase 1CB implementation notes and limitations.
