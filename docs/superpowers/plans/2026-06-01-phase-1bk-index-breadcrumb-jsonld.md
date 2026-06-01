# Phase 1BK Index Breadcrumb JSON-LD Plan

## Routing

- `source_of_truth`: owner autonomous production-readiness request and existing detail/category breadcrumb JSON-LD patterns.
- `this_change_will_do`: add breadcrumb JSON-LD to public collection index pages.
- `this_change_will_not_do`: no visible UI, route, content model, backend, auth, favorites, database, or analytics changes.
- `research_owner`: controller.
- `implementation_owner`: controller.
- `validation_owner`: controller.
- `controller_decisions`: use JSON-LD only because top-level index pages do not currently show visible breadcrumbs.
- `controller_fallback_reason`: worker_unavailable.
- `planned_validation`: `pnpm test`, `pnpm check:content`, `pnpm build`, `pnpm check:links`, `pnpm check:seo`.

## Tasks

- [x] Add source and build-output tests for index breadcrumb JSON-LD.
- [x] Add `BreadcrumbList` JSON-LD to articles, mobile, areas, places, and tools index pages.
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
