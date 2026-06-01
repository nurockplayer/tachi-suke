# Phase 1BY Search Empty State Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make static search zero-result states recoverable with localized helper copy and a clear-search action.

**Architecture:** Reuse `SearchPage.astro` and its existing inline progressive enhancement. Add only stable DOM hooks and CSS classes; keep the search index and route structure unchanged.

**Tech Stack:** Astro, TypeScript-flavored Astro frontmatter, native browser JavaScript, pnpm, Node test runner.

---

## Task 1: Add Search Empty-State Coverage

**Files:**
- Modify: `tests/seo-output.test.mjs`
- Modify: `tests/project-structure.test.mjs`

- [ ] Add failing build-output assertions that `dist/en/search/index.html` includes `data-search-empty-help`, `data-search-clear`, `search-result-type`, `clearSearch`, and `url.searchParams.delete("q")`.
- [ ] Add source-level assertions that `SearchPage.astro` includes `data-search-empty-help` and `data-search-clear`.
- [ ] Run `pnpm build && pnpm check:seo` and confirm the new assertions fail before implementation.

## Task 2: Implement Recoverable Empty State

**Files:**
- Modify: `src/components/pages/SearchPage.astro`
- Modify: `src/styles/global.css`

- [ ] Add four-locale `emptyHelp` and `clear` copy to the search page.
- [ ] Render the empty state as a small panel containing the existing empty message, helper sentence, and a button with `data-search-clear`.
- [ ] Update the inline script with a `clearSearch()` function that clears the input and re-renders with URL sync.
- [ ] Style `.search-empty`, `.search-empty-actions`, and `.search-result-type` for light and dark themes.
- [ ] Run `pnpm test`, `pnpm build`, `pnpm check:links`, and `pnpm check:seo`.

## Task 3: Document And Ship

**Files:**
- Modify: `docs/IMPLEMENTATION_STATUS.md`
- Modify: `docs/ROADMAP.md`

- [ ] Record Phase 1BY as a static search usability polish.
- [ ] Keep placeholder and Phase 2 boundaries unchanged.
- [ ] Run final validation, open a PR, wait for CI/review feedback, merge if clean, deploy to Cloudflare Pages, and smoke check production search.
