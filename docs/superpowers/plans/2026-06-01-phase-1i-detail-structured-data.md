# Phase 1I Detail Structured Data Implementation Plan

**Goal:** Add conservative JSON-LD to mobile plan, area, and tool detail pages.

**Architecture:** Continue using `BaseLayout`'s existing `jsonLd` prop. Each detail page builds page-specific structured data from the current static collection entry and canonical URL.

**Tech Stack:** Astro, TypeScript, Astro content collections, pnpm, Node test runner.

---

### Task 1: Failing SEO Tests

**Files:**
- Modify: `tests/seo-output.test.mjs`

- [x] Assert mobile detail pages include `Service` and `BreadcrumbList`.
- [x] Assert area detail pages include `WebPage` and `BreadcrumbList`.
- [x] Assert tool detail pages include `WebPage`, `ItemList`, and `BreadcrumbList`.
- [x] Run `pnpm check:seo` and confirm failures before implementation.

### Task 2: Mobile Structured Data

**Files:**
- Modify: `src/components/pages/MobilePlanDetailPage.astro`

- [x] Add `Service` JSON-LD using provider, plan name, description, official URL, and Japan service area.
- [x] Add breadcrumb JSON-LD for home, mobile index, and detail page.
- [x] Avoid `Offer` or precise price markup because mobile terms can change.

### Task 3: Area Structured Data

**Files:**
- Modify: `src/components/pages/AreaDetailPage.astro`

- [x] Add `WebPage` JSON-LD using title, summary, language, and last checked date.
- [x] Add conservative `about` place context without coordinates.
- [x] Add breadcrumb JSON-LD for home, areas index, and detail page.

### Task 4: Tool Structured Data

**Files:**
- Modify: `src/components/pages/ToolDetailPage.astro`

- [x] Add `WebPage` JSON-LD using localized title, description, language, and last checked date.
- [x] Add `ItemList` JSON-LD from localized checklist items.
- [x] Add breadcrumb JSON-LD for home, tools index, and detail page.

### Task 5: Documentation and Verification

**Files:**
- Modify: `README.md`
- Modify: `docs/PROJECT_SPEC.md`
- Modify: `docs/PAGE_SPEC.md`
- Modify: `docs/IMPLEMENTATION_STATUS.md`
- Modify: `docs/ACCEPTANCE_CRITERIA.md`
- Modify: `docs/ROADMAP.md`
- Modify: `AGENTS.md`

- [x] Document the conservative structured data policy.
- [x] Run `pnpm install`.
- [x] Run `pnpm test`.
- [x] Run `pnpm build`.
- [x] Run `pnpm check:links`.
- [x] Run `pnpm check:seo`.
- [ ] Commit, push, create PR, wait for CI, and merge.
