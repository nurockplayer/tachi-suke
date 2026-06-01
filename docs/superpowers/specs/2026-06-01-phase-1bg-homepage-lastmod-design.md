# Phase 1BG Homepage Lastmod Design

## Goal

Add content-derived `lastmod` values to locale homepage entries in `sitemap.xml` because locale homepages surface latest articles and public content entry points.

## Scope

- Add `lastmod` for `/zh-tw/`, `/en/`, `/ja/`, and `/ko/` sitemap entries.
- Reuse the same public-content freshness date used for each locale site map page.
- Update SEO-output tests and docs.

## Non-Goals

- Do not change homepage UI, content selection, or routing.
- Do not add backend freshness tracking, analytics, or crawling.

## Validation

- `pnpm test`
- `pnpm build`
- `pnpm check:links`
- `pnpm check:seo`

