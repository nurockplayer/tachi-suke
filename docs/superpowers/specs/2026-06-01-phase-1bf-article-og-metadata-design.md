# Phase 1BF Article Open Graph Metadata Design

## Goal

Improve article sharing and crawler interpretation by adding Open Graph article metadata to public article detail pages.

## Scope

- Extend `BaseLayout` with optional article Open Graph metadata.
- Emit `article:published_time`, `article:modified_time`, `article:section`, and `article:tag` when article metadata is provided.
- Pass article dates, category, and tags from `ArticleLayout`.
- Add source-level and build-output SEO tests.
- Update docs.

## Non-Goals

- Do not change article content, routing, category taxonomy, or JSON-LD.
- Do not add social SDKs, analytics, comments, or tracking.

## Validation

- `pnpm test`
- `pnpm build`
- `pnpm check:links`
- `pnpm check:seo`

