# Phase 1BI Article Index JSON-LD Design

## Goal

Make `/[locale]/articles` clearer as a localized article hub rather than only a generic page. Article category pages already expose `WebPage` and `ItemList` JSON-LD; the top-level article index should provide the same conservative structure for the full same-locale public article list.

## Scope

- Add `CollectionPage` JSON-LD to `ArticlesIndexPage.astro`.
- Add `ItemList` JSON-LD from the visible non-draft same-locale articles.
- Keep category links, article cards, routes, and UI unchanged.
- Add source-level and build-output tests.
- Update documentation.

## Non-Goals

- No article content changes.
- No route changes.
- No UI redesign.
- No backend, CMS, auth, favorites, or analytics.
- No invented ratings, authorship claims, review counts, or engagement metrics.

## JSON-LD Shape

The article index page should emit:

- `CollectionPage` with canonical URL, localized title, localized description, `inLanguage`, `isPartOf`, and `publisher`.
- `ItemList` with `numberOfItems` and ordered `ListItem` entries mapped from the rendered non-draft articles.

## Validation

- `pnpm test` verifies source wiring.
- `pnpm build` generates static output.
- `pnpm check:seo` parses built article index pages and verifies `CollectionPage` and `ItemList`.
