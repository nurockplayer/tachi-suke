# Phase 1BF Article Open Graph Metadata Plan

## Routing

- `source_of_truth`: owner autonomous production-readiness request and current ArticleLayout/BaseLayout behavior.
- `this_change_will_do`: add article-specific Open Graph metadata for public article detail pages.
- `this_change_will_not_do`: no route changes, content changes, tracking, social SDKs, comments, or analytics.
- `research_owner`: controller.
- `implementation_owner`: controller.
- `validation_owner`: controller.
- `controller_decisions`: implement metadata in BaseLayout as optional props so future article-like surfaces can reuse it.
- `controller_fallback_reason`: worker_unavailable.
- `planned_validation`: `pnpm test`, `pnpm build`, `pnpm check:links`, `pnpm check:seo`.

## Tasks

- [x] Add failing source/build-output tests for `article:*` Open Graph tags.
- [x] Extend `BaseLayout` with optional article metadata rendering.
- [x] Pass metadata from `ArticleLayout`.
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
