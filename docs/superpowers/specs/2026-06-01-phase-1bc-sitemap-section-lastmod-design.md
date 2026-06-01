# Phase 1BC Sitemap Section Lastmod Design

## Goal

Improve XML sitemap freshness signals by adding content-derived `lastmod` values to major locale section pages and the human-readable site map pages.

## Scope

- Add `lastmod` to `/[locale]/articles`, `/[locale]/areas`, `/[locale]/places`, `/[locale]/mobile`, `/[locale]/tools`, and `/[locale]/site-map`.
- Derive dates from public content:
  - Articles: newest non-draft same-locale article `updatedAt`.
  - Areas: newest area `lastCheckedAt`.
  - Places: newest published place `updatedAt`.
  - Mobile: newest mobile plan `lastCheckedAt`.
  - Tools: newest published tool `lastCheckedAt`.
  - Site map: newest public content date across the same-locale article set and shared public collections.
- Keep `search`, `search-index.json`, and account placeholder routes out of the sitemap.

## Non-Goals

- Do not add runtime crawling or network URL checks.
- Do not change public route shape.
- Do not add backend freshness storage.
- Do not add `lastmod` to placeholders or utility pages that should remain noindex.

## Validation

- `pnpm test`
- `pnpm check:content`
- `pnpm build`
- `pnpm check:links`
- `pnpm check:seo`

