# Phase 1BE Open Graph Locale Metadata Plan

## Routing

- `source_of_truth`: owner autonomous production-readiness request and existing `BaseLayout` social metadata.
- `this_change_will_do`: add Open Graph locale metadata to shared layout and tests.
- `this_change_will_not_do`: no route changes, content changes, analytics, SDKs, or language detection.
- `research_owner`: controller.
- `implementation_owner`: controller.
- `validation_owner`: controller.
- `controller_decisions`: keep locale metadata in `src/types/locale.ts` next to existing HTML language metadata.
- `controller_fallback_reason`: worker_unavailable.
- `planned_validation`: `pnpm test`, `pnpm build`, `pnpm check:links`, `pnpm check:seo`.

## Tasks

- [x] Add failing tests for `ogLocaleByLocale`, `og:locale`, and `og:locale:alternate`.
- [x] Implement shared locale mapping and BaseLayout meta tags.
- [x] Update docs.
- [x] Run validation.
- [ ] Commit, push, open PR, wait for checks, and merge.

## Validation Results

- `pnpm test`: passed
- `pnpm check:content`: passed
- `pnpm build`: passed
- `pnpm check:links`: passed
- `pnpm check:seo`: passed
- Forbidden lockfile scan: passed
- `git diff --check`: passed
