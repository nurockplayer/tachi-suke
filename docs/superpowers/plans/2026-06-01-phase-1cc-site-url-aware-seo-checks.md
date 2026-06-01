# Phase 1CC Site URL Aware SEO Checks Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:test-driven-development or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make build-output SEO tests validate the configured `SITE_URL` instead of only the fallback example domain.

**Architecture:** Keep runtime code unchanged. Centralize expected absolute URL creation in `tests/seo-output.test.mjs`, then update README and acceptance docs.

**Tech Stack:** Astro static output, Node test runner, pnpm.

---

### Task 1: Make SEO Output Tests Site-Aware

**Files:**
- Modify: `tests/seo-output.test.mjs`
- Modify: `tests/project-structure.test.mjs`

- [x] **Step 1: Capture the current red case**

Build with `SITE_URL=https://tachi-suke.pages.dev` and run `SITE_URL=https://tachi-suke.pages.dev pnpm check:seo`.

Expected: FAIL because test expectations still use the example fallback domain.

- [x] **Step 2: Centralize expected URL helpers**

Read `process.env.SITE_URL`, fall back to `https://tachi-suke.example.com`, and use helpers for absolute URL strings and regular expressions.

- [x] **Step 3: Add a source-level guard**

Assert that `tests/seo-output.test.mjs` reads `process.env.SITE_URL`.

### Task 2: Document Production SEO Verification

**Files:**
- Modify: `README.md`
- Modify: `docs/ACCEPTANCE_CRITERIA.md`
- Modify: `docs/IMPLEMENTATION_STATUS.md`

- [x] **Step 1: Document the production check command**

Record that production builds should run `SITE_URL=<production-url> pnpm check:seo` before `pnpm check:deploy`.

- [x] **Step 2: Preserve deploy guard behavior**

Document that `pnpm check:deploy` still rejects the example fallback domain in deployable output.
