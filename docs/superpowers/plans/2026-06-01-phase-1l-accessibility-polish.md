# Phase 1L Accessibility Polish Implementation Plan

**Goal:** Add basic keyboard navigation and active navigation semantics.

**Architecture:** Keep changes in existing layout/header/styles. Avoid new runtime dependencies.

**Tech Stack:** Astro, CSS, pnpm, Node test runner.

---

## Task 1: Failing Tests

**Files:**
- Modify: `tests/project-structure.test.mjs`

- [x] Assert `BaseLayout` renders a skip link to `#main-content`.
- [x] Assert the main landmark has `id="main-content"`.
- [x] Assert `Header` sets `aria-current` on matching nav links.
- [x] Assert global CSS includes `.skip-link` and `:focus-visible`.
- [x] Run `pnpm test` and confirm failures before implementation.

## Task 2: Layout and Header

**Files:**
- Modify: `src/components/layout/BaseLayout.astro`
- Modify: `src/components/layout/Header.astro`

- [x] Add skip link before the header.
- [x] Add stable main landmark target.
- [x] Compute active nav section from `currentPath`.
- [x] Render `aria-current="page"` on active primary nav links.

## Task 3: Focus Styles

**Files:**
- Modify: `src/styles/global.css`

- [x] Add visually hidden skip link that appears on focus.
- [x] Add visible `:focus-visible` outline.
- [x] Ensure focus styles do not change layout dimensions.

## Task 4: Documentation and Verification

**Files:**
- Modify: `docs/IMPLEMENTATION_STATUS.md`
- Modify: `docs/ACCEPTANCE_CRITERIA.md`
- Modify: `docs/ROADMAP.md`
- Modify: `AGENTS.md`

- [x] Document the baseline accessibility improvements.
- [x] Run `pnpm install`.
- [x] Run `pnpm test`.
- [x] Run `pnpm build`.
- [x] Run `pnpm check:links`.
- [x] Run `pnpm check:seo`.
- [x] Run a browser smoke check.
- [x] Commit, push, create PR, wait for CI, and merge.
