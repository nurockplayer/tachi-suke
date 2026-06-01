# Phase 1CQ Localized Static 404 Recovery Plan

## Routing

- `source_of_truth`: owner autonomous production-readiness request, `AGENTS.md`, `docs/ai/autonomous-bootstrap.md`, and Spark 5.3 read-only scan.
- `this_change_will_do`: make the static 404 recovery page provide locale-specific copy and links for supported public sections.
- `this_change_will_not_do`: add redirects, language detection, JavaScript dependencies, analytics, backend error tracking, auth, database, real favorites, native submissions, or route changes.
- `research_owner`: Spark 5.3 worker for read-only candidate scan.
- `implementation_owner`: controller.
- `validation_owner`: controller.

## Checklist

- [x] Add source/build-output tests for locale-specific 404 recovery links.
- [x] Update `404.astro` with locale-specific recovery sections.
- [x] Preserve `noindex, nofollow` and sitemap exclusion behavior.
- [x] Document Phase 1CQ scope and acceptance.
- [x] Run validation: `pnpm test`, `pnpm check:content`, `pnpm build`, `pnpm check:links`, `pnpm check:seo`.
