# Phase 1M Launch Trust Pages Implementation Plan

**Goal:** Add static Privacy and Editorial Policy pages across all supported locales.

**Architecture:** Reuse BaseLayout and a shared policy page component. Keep route files thin and locale-prefixed.

**Tech Stack:** Astro, TypeScript, pnpm, static output.

---

## Task 1: Failing Tests

**Files:**
- Modify: `tests/project-structure.test.mjs`
- Modify: `tests/seo-output.test.mjs`

- [x] Assert all locales have `privacy.astro` and `editorial-policy.astro`.
- [x] Assert a shared `PolicyPage.astro` component exists.
- [x] Assert footer links to privacy and editorial policy pages.
- [x] Assert sitemap output includes public trust pages.
- [x] Run tests and confirm failure before implementation.

## Task 2: Routes and Component

**Files:**
- Add: `src/components/pages/PolicyPage.astro`
- Add: `src/pages/[locale]/privacy.astro`
- Add: `src/pages/[locale]/editorial-policy.astro`

- [x] Add localized Privacy content.
- [x] Add localized Editorial Policy content.
- [x] Provide title, description, semantic sections, and mobile-first readable layout.
- [x] Keep the content static and backend-free.

## Task 3: Navigation and Discovery

**Files:**
- Modify: `src/components/layout/Footer.astro`
- Modify: `src/pages/sitemap.xml.ts`

- [x] Add footer links to both trust pages.
- [x] Include trust pages in the sitemap.
- [x] Keep placeholder account pages excluded from sitemap.

## Task 4: Documentation and Verification

**Files:**
- Modify: `README.md`
- Modify: `docs/PAGE_SPEC.md`
- Modify: `docs/IMPLEMENTATION_STATUS.md`
- Modify: `docs/ACCEPTANCE_CRITERIA.md`
- Modify: `docs/ROADMAP.md`
- Modify: `AGENTS.md`

- [x] Document trust pages and remaining privacy limitations.
- [x] Run `pnpm test`.
- [x] Run `pnpm build`.
- [x] Run `pnpm check:links`.
- [x] Run `pnpm check:seo`.
- [x] Commit, push, create PR, wait for CI, and merge.
