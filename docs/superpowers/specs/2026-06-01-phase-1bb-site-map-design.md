# Phase 1BB Site Map Design

## Goal

Add a human-readable multilingual site map page for TachiSuke so visitors, search crawlers, and future editors can understand the public content structure without depending only on XML sitemap or header navigation.

## Scope

- Add locale-prefixed pages at `/[locale]/site-map`.
- Render a content directory with links to core sections, article categories, latest articles, mobile plans, area guides, useful places, tools, and trust pages.
- Keep the page static-first and generated at build time from existing Astro content collections.
- Add the page to footer navigation and XML sitemap.
- Update source-level and build-output SEO tests.
- Update project docs to record the route and purpose.

## Non-Goals

- Do not add search backend, database, login, favorites, or submission storage.
- Do not replace the XML sitemap.
- Do not expose account placeholder pages as SEO targets.
- Do not introduce a new dependency.

## Content Rules

- Only non-draft articles should appear.
- Only published places and tools should appear.
- All mobile plans and area guides are public editorial content.
- Account placeholder routes may be mentioned as future features in docs, but should not be linked from the public site map page.

## SEO Rules

- Each locale page must use a locale-aware title and description.
- `html lang`, canonical, Open Graph URL, and hreflang are inherited from `BaseLayout`.
- XML sitemap should include all four `/[locale]/site-map` pages with conservative locale alternates.

## Validation

- `pnpm test`
- `pnpm build`
- `pnpm check:links`
- `pnpm check:seo`

