# Phase 1BB Site Map Plan

## Routing

- `source_of_truth`: project owner autonomous production-readiness request, current AGENTS.md, README.md, docs, and existing Astro source.
- `this_change_will_do`: add four locale human-readable site map pages, footer link, XML sitemap entry, tests, and docs.
- `this_change_will_not_do`: no auth, database, Supabase, favorites, real submission persistence, CMS, or backend.
- `research_owner`: controller.
- `implementation_owner`: controller.
- `validation_owner`: controller.
- `controller_decisions`: choose `/site-map` because it is clear to users, distinct from `/sitemap.xml`, and stable across locales.
- `controller_fallback_reason`: worker_unavailable.
- `planned_validation`: `pnpm test`, `pnpm build`, `pnpm check:links`, `pnpm check:seo`.

## Tasks

- [x] Add source-level tests for site map route files, footer link, sitemap generator, and component behavior.
- [x] Add shared `SiteMapPage.astro` component.
- [x] Add `/zh-tw/site-map`, `/en/site-map`, `/ja/site-map`, `/ko/site-map`.
- [x] Add footer link and XML sitemap entry.
- [x] Update README and docs.
- [x] Run validation.
- [ ] Commit, push, open PR, wait for checks, and merge.

## Validation Results

- `pnpm install`: passed
- `pnpm test`: passed
- `pnpm check:content`: passed
- `pnpm build`: passed
- `pnpm check:links`: passed
- `pnpm check:seo`: passed
