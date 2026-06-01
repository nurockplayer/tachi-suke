# Phase 1BH Homepage JSON-LD Plan

## Routing

- `source_of_truth`: owner autonomous production-readiness request and current Phase 1 static SEO docs.
- `this_change_will_do`: add locale homepage `WebPage` and `ItemList` JSON-LD using existing homepage copy and start-here links.
- `this_change_will_not_do`: no UI, route, data model, backend, auth, favorites, or analytics changes.
- `research_owner`: controller.
- `implementation_owner`: controller.
- `validation_owner`: controller.
- `controller_decisions`: keep JSON-LD conservative and backed by already-rendered homepage content.
- `controller_fallback_reason`: worker_unavailable.
- `planned_validation`: `pnpm test`, `pnpm check:content`, `pnpm build`, `pnpm check:links`, `pnpm check:seo`.

## Tasks

- [x] Add source and build-output tests for locale homepage JSON-LD.
- [x] Add `WebPage` and `ItemList` JSON-LD in `LocaleHomePage.astro`.
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
