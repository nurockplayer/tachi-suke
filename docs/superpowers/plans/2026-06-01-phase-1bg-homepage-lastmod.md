# Phase 1BG Homepage Lastmod Plan

## Routing

- `source_of_truth`: owner autonomous production-readiness request and current sitemap freshness behavior.
- `this_change_will_do`: add content-derived `lastmod` to locale homepage sitemap entries.
- `this_change_will_not_do`: no UI, route, backend, crawler, or analytics changes.
- `research_owner`: controller.
- `implementation_owner`: controller.
- `validation_owner`: controller.
- `controller_decisions`: reuse existing per-locale public content freshness date from the sitemap generator.
- `controller_fallback_reason`: worker_unavailable.
- `planned_validation`: `pnpm test`, `pnpm build`, `pnpm check:links`, `pnpm check:seo`.

## Tasks

- [x] Add failing build-output test for locale homepage `lastmod`.
- [x] Add locale root `lastmod` in `sitemap.xml.ts`.
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
