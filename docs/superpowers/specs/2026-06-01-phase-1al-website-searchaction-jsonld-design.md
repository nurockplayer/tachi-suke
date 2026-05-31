# Phase 1AL WebSite SearchAction JSON-LD Design

## Goal

Expose TachiSuke's static search page through schema.org `WebSite` JSON-LD so search engines can understand the site search entry point in addition to OpenSearch discovery.

## Scope

- Add `potentialAction` to the site-wide `WebSite` JSON-LD in `BaseLayout`.
- Use `SearchAction` with target `/en/search?q={search_term_string}` as the stable static fallback.
- Keep the action static and public-only.

## Non-Goals

- No backend search API.
- No dynamic locale detection.
- No private or account content search.
- No analytics or query tracking.

## Acceptance

- `pnpm test` verifies the source-level JSON-LD wiring.
- `pnpm check:seo` verifies built root-page JSON-LD contains the expected `SearchAction`.
