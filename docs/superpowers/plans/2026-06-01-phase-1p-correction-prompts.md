# Phase 1P Detail Page Correction Prompts Implementation Plan

**Goal:** Add localized correction prompts to public detail pages and link them to `/[locale]/contact`.

**Architecture:** Reuse static Astro components and the Phase 1O contact/corrections route. Keep the prompt presentational and dependency-free.

**Tech Stack:** Astro components, CSS, source-level tests, pnpm checks.

---

## Task 1: Spec and Tests

**Files:**
- Add: `docs/superpowers/specs/2026-06-01-phase-1p-correction-prompts-design.md`
- Add: `docs/superpowers/plans/2026-06-01-phase-1p-correction-prompts.md`
- Modify: `tests/project-structure.test.mjs`

- [x] Define prompt scope and non-goals.
- [x] Assert `CorrectionPrompt` exists and links to localized contact.
- [x] Assert article/place/mobile/area/tool detail pages render the prompt.

## Task 2: UI Implementation

**Files:**
- Add: `src/components/content/CorrectionPrompt.astro`
- Modify: `src/components/layout/ArticleLayout.astro`
- Modify: `src/components/pages/PlaceDetailPage.astro`
- Modify: `src/components/pages/MobilePlanDetailPage.astro`
- Modify: `src/components/pages/AreaDetailPage.astro`
- Modify: `src/components/pages/ToolDetailPage.astro`
- Modify: `src/styles/global.css`

- [x] Add concise four-locale prompt copy.
- [x] Insert the prompt into all public detail page surfaces.
- [x] Style the prompt consistently with the existing content UI.

## Task 3: Documentation and Verification

**Files:**
- Modify: `README.md`
- Modify: `docs/IMPLEMENTATION_STATUS.md`
- Modify: `docs/ACCEPTANCE_CRITERIA.md`
- Modify: `docs/PAGE_SPEC.md`
- Modify: `docs/ROADMAP.md`
- Modify: `AGENTS.md`

- [x] Document detail-page correction prompts.
- [x] Run `pnpm test`.
- [x] Run `pnpm build`.
- [x] Run `pnpm check:links`.
- [x] Run `pnpm check:seo`.
- [x] Browser smoke check one detail page prompt.
- [x] Commit, push, create PR, wait for CI, and merge.
