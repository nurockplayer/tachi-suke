# Phase 1AM Sitemap Hreflang Alternates Design

## Goal

Help search engines understand TachiSuke's multilingual URL relationships by adding conservative `xhtml:link` hreflang alternates to `sitemap.xml`.

## Scope

- Add the XHTML sitemap namespace.
- Add alternates for shared locale section pages.
- Add alternates for shared static detail pages: areas, places, mobile plans, and tools.
- Add alternates for article detail pages only when non-draft translations share the same `translationKey`.
- Add `x-default` pointing to the English URL when an English alternate exists.

## Non-Goals

- No alternates to missing article translations.
- No sitemap alternates for account placeholders, search pages, or private data.
- No dynamic language detection.
- No sitemap splitting until route volume requires it.

## Acceptance

- `pnpm test` verifies source-level sitemap alternate support.
- `pnpm check:seo` verifies built sitemap namespace and representative shared/article alternates.
