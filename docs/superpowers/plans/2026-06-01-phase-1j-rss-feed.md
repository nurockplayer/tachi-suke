# Phase 1J RSS Feed Implementation Plan

**Goal:** Add a static RSS feed for public articles.

**Architecture:** Generate `/feed.xml` as an Astro static endpoint from the `articles` content collection. Keep the feed global in Phase 1 and link it from `BaseLayout`.

**Tech Stack:** Astro, TypeScript, Astro content collections, pnpm, Node test runner.

---

### Task 1: Failing Tests

**Files:**
- Modify: `tests/seo-output.test.mjs`
- Modify: `tests/project-structure.test.mjs`

- [x] Assert `src/pages/feed.xml.ts` exists.
- [x] Assert built `dist/feed.xml` exists after build.
- [x] Assert the feed includes public article links and excludes draft content.
- [x] Assert public pages include an RSS alternate link.
- [x] Run the relevant tests and confirm failures before implementation.

### Task 2: Feed Endpoint

**Files:**
- Create: `src/pages/feed.xml.ts`

- [x] Load non-draft articles from `getCollection("articles")`.
- [x] Sort articles by `updatedAt` descending.
- [x] Generate RSS 2.0 XML with safe escaping.
- [x] Use `SITE_URL`/Astro `site` for absolute links.
- [x] Include item language metadata.

### Task 3: Layout Metadata

**Files:**
- Modify: `src/components/layout/BaseLayout.astro`

- [x] Add global RSS alternate link in `<head>`.

### Task 4: Documentation and Verification

**Files:**
- Modify: `README.md`
- Modify: `docs/PROJECT_SPEC.md`
- Modify: `docs/PAGE_SPEC.md`
- Modify: `docs/IMPLEMENTATION_STATUS.md`
- Modify: `docs/ACCEPTANCE_CRITERIA.md`
- Modify: `docs/ROADMAP.md`
- Modify: `AGENTS.md`

- [x] Document `/feed.xml` and current global-feed limitation.
- [x] Run `pnpm install`.
- [x] Run `pnpm test`.
- [x] Run `pnpm build`.
- [x] Run `pnpm check:links`.
- [x] Run `pnpm check:seo`.
- [ ] Commit, push, create PR, wait for CI, and merge.
