# Phase 1CU Search Page Locale SEO Coverage Design

## Goal

Ensure every static locale search page keeps the same noindex and shareable-search contract, not only the English page.

## Scope

- Expand build-output SEO checks for `/zh-tw/search`, `/en/search`, `/ja/search`, and `/ko/search`.
- Verify each page keeps:
  - `noindex, follow`
  - locale-aware GET `action`
  - `q` query input
  - locale search-index URL
  - client-side URL query sync hooks
  - recoverable empty-state and clear-search hooks
  - public result cards
  - no account placeholder result links
- Keep existing deeper search-index content assertions.

## Non-Goals

- Do not change search ranking.
- Do not change search index generation.
- Do not add hosted search, analytics, typo tolerance, personalization, auth, database, or backend behavior.
- Do not change routes or public content.

## Acceptance Criteria

- `pnpm check:seo` verifies the four locale search pages at build-output level.
- `pnpm build` and build-output checks still pass.
- Search remains static, dependency-free, and noindex in Phase 1.
