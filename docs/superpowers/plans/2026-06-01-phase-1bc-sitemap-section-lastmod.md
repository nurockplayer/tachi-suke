# Phase 1BC Sitemap Section Lastmod Plan

## Routing

- `source_of_truth`: owner autonomous production-readiness request, current sitemap implementation, and existing SEO-output tests.
- `this_change_will_do`: add content-derived `lastmod` to sitemap section and site-map entries.
- `this_change_will_not_do`: no route changes, auth, database, external crawling, or UI changes.
- `research_owner`: controller.
- `implementation_owner`: controller.
- `validation_owner`: controller.
- `controller_decisions`: keep the change inside `src/pages/sitemap.xml.ts` and build-output tests because the behavior is machine-readable sitemap output.
- `controller_fallback_reason`: worker_unavailable.
- `planned_validation`: `pnpm test`, `pnpm check:content`, `pnpm build`, `pnpm check:links`, `pnpm check:seo`.

## Tasks

- [x] Add failing SEO-output assertions for section and site-map `lastmod`.
- [x] Implement newest-date helpers for locale and shared public collections.
- [x] Update docs for sitemap freshness strategy.
- [x] Run validation.
- [ ] Commit, push, open PR, wait for checks, and merge.

## Validation Results

- `pnpm install`: passed
- `pnpm test`: passed
- `pnpm check:content`: passed
- `pnpm build`: passed
- `pnpm check:links`: passed
- `pnpm check:seo`: passed
- Forbidden lockfile scan: passed
- `git diff --check`: passed
