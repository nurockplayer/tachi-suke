# Phase 1H Tools Checklist Implementation Plan

> Controller note: this phase was executed directly because the scope was small, local, and well covered by source/build-output tests. Steps use checkbox syntax for tracking.

**Goal:** Add static tool detail pages and publish the first checklist tool.

**Architecture:** Tools remain Astro content collection entries. The index page renders published tools as locale-aware cards, and each locale has a dynamic detail route that renders the shared tool data with localized labels and copy.

**Tech Stack:** Astro, TypeScript, JSON content collection, pnpm, Node test runner.

---

### Task 1: Failing Tests

**Files:**
- Modify: `tests/project-structure.test.mjs`
- Modify: `tests/seo-output.test.mjs`

- [x] Assert every locale has `tools/[slug].astro`.
- [x] Assert `ToolDetailPage.astro` exists.
- [x] Assert tool schema includes `lastCheckedAt`, `sourceNote`, `notes`, and `sections`.
- [x] Assert `moving-to-japan-checklist` is `published` and has localized sections.
- [x] Assert `SimpleSectionPage.astro` links tool cards to `/tools/${tool.data.slug}`.
- [x] Assert built sitemap includes `/en/tools/moving-to-japan-checklist`.
- [x] Run `pnpm test` and confirm failures before implementation.

### Task 2: Tool Model and Content

**Files:**
- Modify: `src/content.config.ts`
- Modify: `src/types/tool.ts` or create it if missing
- Modify: `src/content/tools/moving-checklist.json`

- [x] Add localized text objects for tool title, description, sections, and items.
- [x] Add `lastCheckedAt`, `sourceNote`, and `notes`.
- [x] Mark the tool as `published`.

### Task 3: Tool Detail Routes and Page

**Files:**
- Create: `src/components/pages/ToolDetailPage.astro`
- Create: `src/pages/zh-tw/tools/[slug].astro`
- Create: `src/pages/en/tools/[slug].astro`
- Create: `src/pages/ja/tools/[slug].astro`
- Create: `src/pages/ko/tools/[slug].astro`

- [x] Use `getStaticPaths`.
- [x] Generate only published tools.
- [x] Render localized checklist sections.
- [x] Show source note, notes, and last checked date.
- [x] Add conservative metadata and locale alternates.

### Task 4: Tool Index, Sitemap, and Link Checks

**Files:**
- Modify: `src/components/pages/SimpleSectionPage.astro`
- Modify: `src/pages/sitemap.xml.ts`
- Modify: `tests/project-structure.test.mjs`
- Modify: `tests/seo-output.test.mjs`

- [x] Render published tool cards on `/[locale]/tools`.
- [x] Add generated tool detail routes to source route checks.
- [x] Add published tool detail pages to sitemap.
- [x] Keep planned/draft tools out of public cards and sitemap.

### Task 5: Documentation

**Files:**
- Modify: `README.md`
- Modify: `docs/CONTENT_MODEL.md`
- Modify: `docs/PAGE_SPEC.md`
- Modify: `docs/IMPLEMENTATION_STATUS.md`
- Modify: `docs/ACCEPTANCE_CRITERIA.md`
- Modify: `docs/ROADMAP.md`
- Modify: `AGENTS.md`

- [x] Document tool detail pages and static checklist limitations.

### Task 6: Verification and Publish

**Files:**
- No production files unless fixing verification failures.

- [x] Run `pnpm install`.
- [x] Run `pnpm test`.
- [x] Run `pnpm build`.
- [x] Run `pnpm check:links`.
- [x] Run `pnpm check:seo`.
- [x] Check pnpm policy terms in changed files.
- [ ] Commit, push, create PR, wait for CI, and merge.
