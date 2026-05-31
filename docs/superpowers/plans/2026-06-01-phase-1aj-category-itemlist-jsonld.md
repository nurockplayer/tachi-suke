# Phase 1AJ Article Category ItemList JSON-LD Plan

## Architecture

Use the existing `jsonLd` array in `ArticleCategoryPage.astro`. Add a third object for `ItemList` derived from the already-filtered `articles` array so structured data cannot include drafts or other locales.

## Tasks

- [x] Inspect current category page structured data.
- [x] Write failing source-level and build-output SEO tests.
- [x] Add category `ItemList` JSON-LD.
- [x] Update docs and roadmap status.
- [ ] Run `pnpm install`, `pnpm test`, `pnpm check:content`, `pnpm build`, `pnpm check:links`, and `pnpm check:seo`.
- [ ] Open PR, wait for checks, merge when clean.
