# Phase 1F CI Quality Gate Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a pnpm-only GitHub Actions CI workflow that runs the same static-site checks used locally.

**Architecture:** Keep CI as one workflow at `.github/workflows/ci.yml`. Use source-level tests to prevent accidental removal of the quality gate or introduction of forbidden package-manager commands.

**Tech Stack:** GitHub Actions, pnpm, Node, Astro.

---

### Task 1: Failing Source Test

**Files:**
- Modify: `tests/project-structure.test.mjs`

- [ ] Assert `.github/workflows/ci.yml` exists.
- [ ] Assert the workflow includes `pnpm install --frozen-lockfile`, `pnpm test`, `pnpm build`, `pnpm check:links`, and `pnpm check:seo`.
- [ ] Assert the workflow rejects `package-lock.json`, `yarn.lock`, `bun.lock`, and `bun.lockb`.
- [ ] Assert the workflow does not contain package-manager commands for npm, yarn, or bun.
- [ ] Run `pnpm test` and confirm it fails before the workflow exists.

### Task 2: CI Workflow

**Files:**
- Create: `.github/workflows/ci.yml`

- [ ] Add pull request and `main` push triggers.
- [ ] Use checkout, pnpm setup, Node setup with pnpm cache, frozen install, source tests, build, link check, and SEO check.
- [ ] Keep deployment out of scope.

### Task 3: Documentation

**Files:**
- Modify: `README.md`
- Modify: `docs/IMPLEMENTATION_STATUS.md`
- Modify: `docs/ACCEPTANCE_CRITERIA.md`
- Modify: `docs/ROADMAP.md`
- Modify: `AGENTS.md`

- [ ] Document the CI verification order.
- [ ] Document that Cloudflare deployment remains separate from CI for now.

### Task 4: Verification and Publish

**Files:**
- No production files unless fixing verification failures.

- [ ] Run `pnpm install`.
- [ ] Run `pnpm test`.
- [ ] Run `pnpm build`.
- [ ] Run `pnpm check:links`.
- [ ] Run `pnpm check:seo`.
- [ ] Check pnpm policy terms in changed files.
- [ ] Commit, push, create PR, and merge when checks are acceptable.
