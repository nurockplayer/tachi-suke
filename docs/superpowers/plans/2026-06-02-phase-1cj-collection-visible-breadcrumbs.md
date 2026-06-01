# Phase 1CJ Collection Visible Breadcrumbs Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add visible breadcrumbs to public collection index pages.

**Architecture:** Reuse `src/components/navigation/Breadcrumbs.astro` inside existing collection page hero sections. Keep breadcrumb data two-level and aligned with existing JSON-LD.

**Tech Stack:** Astro, TypeScript-flavored Astro components, Node test runner, pnpm.

---

## Task 1: Tests

**Files:**
- Modify: `tests/project-structure.test.mjs`
- Modify: `tests/seo-output.test.mjs`

- [x] Add failing source-level assertions that collection page components import and render `Breadcrumbs`.
- [x] Add failing build-output assertions that collection index pages render visible breadcrumbs in all supported locales.

## Task 2: Implementation

**Files:**
- Modify: `src/components/pages/ArticlesIndexPage.astro`
- Modify: `src/components/pages/MobileIndexPage.astro`
- Modify: `src/components/pages/PlacesIndexPage.astro`
- Modify: `src/components/pages/SimpleSectionPage.astro`

- [x] Add two-level `breadcrumbItems` using locale home and current collection title.
- [x] Render `Breadcrumbs` before each collection page hero heading.
- [x] Reuse existing breadcrumb styling and accessibility behavior.

## Task 3: Documentation

**Files:**
- Modify: `AGENTS.md`
- Modify: `README.md`
- Modify: `docs/IMPLEMENTATION_STATUS.md`
- Modify: `docs/ACCEPTANCE_CRITERIA.md`
- Modify: `docs/ROADMAP.md`
- Add: `docs/superpowers/specs/2026-06-02-phase-1cj-collection-visible-breadcrumbs-design.md`

- [x] Record Phase 1CJ visible collection breadcrumb scope.
- [x] Remove the outdated limitation saying top-level section pages lack visible breadcrumbs.

## Task 4: Validation And Handoff

- [x] Run `pnpm test`.
- [x] Run `pnpm check:content`.
- [x] Run `pnpm build`.
- [x] Run `pnpm check:links`.
- [x] Run `pnpm check:seo`.
- [ ] Run deployment checks if merged to `main`.
- [ ] Hand off the validated branch for PR, review, merge, and deployment according to `AGENTS.md`.
