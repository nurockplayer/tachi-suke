# Phase 1CD CI Production SEO Gate Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:test-driven-development or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ensure CI validates deployable production URL SEO output, not only default fallback output.

**Architecture:** Update the GitHub Actions workflow and source-level project structure test. Runtime code remains unchanged.

**Tech Stack:** GitHub Actions, Astro static output, pnpm, Node test runner.

---

### Task 1: Extend CI

**Files:**
- Modify: `.github/workflows/ci.yml`
- Modify: `tests/project-structure.test.mjs`

- [x] **Step 1: Add production build**

Add a CI step that runs `pnpm build` with `SITE_URL=https://tachi-suke.pages.dev`.

- [x] **Step 2: Add production SEO/deploy checks**

Add CI steps for `SITE_URL=https://tachi-suke.pages.dev pnpm check:seo` and `SITE_URL=https://tachi-suke.pages.dev pnpm check:deploy`.

- [x] **Step 3: Guard the workflow**

Update the structure test to assert CI includes the deploy check and production Pages URL.

### Task 2: Update Docs

**Files:**
- Modify: `README.md`
- Modify: `docs/ACCEPTANCE_CRITERIA.md`
- Modify: `docs/DEPLOYMENT.md`
- Modify: `docs/IMPLEMENTATION_STATUS.md`
- Modify: `docs/ROADMAP.md`

- [x] **Step 1: Record CI behavior**

Document that PR/main CI validates fallback-domain and production-domain SEO/deploy output.

- [x] **Step 2: Keep deployment instructions aligned**

Ensure manual deployment instructions include production `SITE_URL` SEO checks before `pnpm check:deploy`.
