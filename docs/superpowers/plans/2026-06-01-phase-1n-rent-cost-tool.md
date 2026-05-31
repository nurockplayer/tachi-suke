# Phase 1N Rent Initial Cost Tool Implementation Plan

**Goal:** Publish a second static checklist tool for Japan rental initial costs.

**Architecture:** Reuse the existing `tools` content collection and `ToolDetailPage`. No route/component changes should be necessary unless the content model blocks the checklist.

**Tech Stack:** Astro content collections, JSON content, pnpm checks.

---

## Task 1: Failing Tests

**Files:**
- Modify: `tests/project-structure.test.mjs`
- Modify: `tests/seo-output.test.mjs`

- [x] Assert at least two published static tools exist.
- [x] Assert `japan-rent-initial-cost-checklist` is published.
- [x] Assert sitemap/build output includes the rent initial cost tool.
- [x] Run `pnpm test` and confirm failure before adding content.

## Task 2: Tool Content

**Files:**
- Add: `src/content/tools/rent-initial-cost-checklist.json`

- [x] Add localized title and description.
- [x] Add localized source note and maintenance caveats.
- [x] Add checklist sections for cost categories, contract checks, cash-flow preparation, and payment-before-signing cautions.
- [x] Keep copy practical and decision-oriented.

## Task 3: Documentation and Verification

**Files:**
- Modify: `README.md`
- Modify: `docs/CONTENT_MODEL.md`
- Modify: `docs/IMPLEMENTATION_STATUS.md`
- Modify: `docs/ROADMAP.md`
- Modify: `docs/ACCEPTANCE_CRITERIA.md`
- Modify: `AGENTS.md`

- [x] Document the second published static tool.
- [x] Run `pnpm test`.
- [x] Run `pnpm build`.
- [x] Run `pnpm check:links`.
- [x] Run `pnpm check:seo`.
- [x] Browser smoke check the generated detail page.
- [x] Commit, push, create PR, wait for CI, and merge.
