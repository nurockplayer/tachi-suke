# Phase 1D SEO Launch Readiness Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add static SEO discovery and Cloudflare Pages launch-readiness infrastructure for TachiSuke.

**Architecture:** Keep Astro SSG and add small source-level route handlers for generated SEO files. Tests remain dependency-light Node scripts, with source checks in `pnpm test` and build-output checks in `pnpm check:seo`.

**Tech Stack:** Astro, TypeScript, Node test runner, pnpm, Cloudflare Pages static output.

---

### Task 1: Source-Level SEO Tests

**Files:**
- Modify: `tests/project-structure.test.mjs`

- [ ] Add assertions for `src/pages/sitemap.xml.ts`, `src/pages/robots.txt.ts`, `src/pages/site.webmanifest.ts`, `public/images/og-default.svg`, and `public/_headers`.
- [ ] Add assertions that `BaseLayout.astro` includes manifest, Open Graph image, Twitter card, and optional robots metadata support.
- [ ] Add assertions that `package.json` exposes `check:seo`.
- [ ] Run `pnpm test` and confirm the new test fails before implementation.

### Task 2: Build-Output SEO Tests

**Files:**
- Create: `tests/seo-output.test.mjs`
- Modify: `package.json`

- [ ] Add `check:seo` script that runs `node --test tests/seo-output.test.mjs`.
- [ ] Test that `dist/sitemap.xml`, `dist/robots.txt`, and `dist/site.webmanifest` exist after build.
- [ ] Test that the sitemap contains locale home pages, article pages, mobile detail pages, area detail pages, place detail pages, and submit-place thanks pages.
- [ ] Test that the sitemap excludes account placeholder routes.
- [ ] Test that `robots.txt` references the sitemap.
- [ ] Run `pnpm check:seo` before implementation and confirm it fails when `dist` does not contain the new SEO output.

### Task 3: SEO Route Implementation

**Files:**
- Create: `src/pages/sitemap.xml.ts`
- Create: `src/pages/robots.txt.ts`
- Create: `src/pages/site.webmanifest.ts`
- Modify: `src/components/layout/BaseLayout.astro`
- Create: `public/images/og-default.svg`
- Create: `public/_headers`

- [ ] Generate sitemap entries from locale routes and content collections.
- [ ] Generate robots output from `Astro.site`, disallowing account placeholders and linking to sitemap.
- [ ] Generate manifest output with TachiSuke names, colors, locale-neutral metadata, and favicon icons.
- [ ] Add default `og:image`, `twitter:card`, `twitter:title`, `twitter:description`, and `twitter:image` metadata to `BaseLayout`.
- [ ] Add a `robots` prop to `BaseLayout` and use it when pages need noindex behavior.
- [ ] Add Cloudflare Pages static headers.

### Task 4: Placeholder Account Noindex

**Files:**
- Inspect: `src/components/pages/AccountPlaceholderPage.astro`
- Modify one of: `src/components/pages/AccountPlaceholderPage.astro` or locale account routes.

- [ ] Ensure account placeholder pages pass `robots="noindex, nofollow"` into `BaseLayout`.
- [ ] Keep account pages routable for future auth readiness.
- [ ] Do not remove or hide the placeholder pages from navigation if existing navigation expects them.

### Task 5: Documentation

**Files:**
- Modify: `README.md`
- Modify: `docs/PROJECT_SPEC.md`
- Modify: `docs/PAGE_SPEC.md`
- Modify: `docs/IMPLEMENTATION_STATUS.md`
- Modify: `docs/ACCEPTANCE_CRITERIA.md`
- Modify: `docs/ROADMAP.md`
- Modify: `AGENTS.md`

- [ ] Document `pnpm check:seo`.
- [ ] Document `SITE_URL` as required for production deployment.
- [ ] Document Cloudflare Pages as the preferred static deployment target.
- [ ] Document that Astro remains the preferred stack until SSR/account requirements become concrete.

### Task 6: Verification and Publish

**Files:**
- No production files unless fixing verification failures.

- [ ] Run `pnpm install`.
- [ ] Run `pnpm test`.
- [ ] Run `pnpm build`.
- [ ] Run `pnpm check:links`.
- [ ] Run `pnpm check:seo`.
- [ ] Check pnpm policy terms in changed files.
- [ ] Commit, push, create PR, and merge when checks are acceptable.
