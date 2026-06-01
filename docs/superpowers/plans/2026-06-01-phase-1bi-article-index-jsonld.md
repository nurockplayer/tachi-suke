# Phase 1BI Article Index JSON-LD Plan

## Routing

- `source_of_truth`: owner autonomous production-readiness request and existing article category JSON-LD pattern.
- `this_change_will_do`: add conservative `CollectionPage` and `ItemList` JSON-LD to `/[locale]/articles`.
- `this_change_will_not_do`: no UI, route, content, backend, auth, favorites, or analytics changes.
- `research_owner`: controller.
- `implementation_owner`: controller.
- `validation_owner`: controller.
- `controller_decisions`: mirror the existing article category `ItemList` pattern for the full locale article list.
- `controller_fallback_reason`: worker_unavailable.
- `planned_validation`: `pnpm test`, `pnpm check:content`, `pnpm build`, `pnpm check:links`, `pnpm check:seo`.

## Tasks

- [x] Add source and build-output tests for article index JSON-LD.
- [x] Add `CollectionPage` and `ItemList` JSON-LD to `ArticlesIndexPage.astro`.
- [x] Update docs.
- [x] Run validation.
- [ ] Commit, push, open PR, wait for checks, and merge.

## Validation

- `pnpm test`: passed.
- `pnpm check:content`: passed.
- `pnpm build`: passed.
- `pnpm check:links`: passed.
- `pnpm check:seo`: passed.
- `rtk git --no-optional-locks diff --check`: passed.
- Forbidden lockfile scan: passed.
