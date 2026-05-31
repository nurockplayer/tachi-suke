# Phase 1S Static Search Design

## Goal

Add a static-first site search surface so readers can find public TachiSuke content across articles, places, mobile plans, area guides, and tools without adding a backend, database, hosted search service, or large dependency.

## Scope

- Add locale search pages:
  - `/zh-tw/search`
  - `/en/search`
  - `/ja/search`
  - `/ko/search`
- Add locale search index endpoints:
  - `/zh-tw/search-index.json`
  - `/en/search-index.json`
  - `/ja/search-index.json`
  - `/ko/search-index.json`
- Generate search entries from existing Astro content collections.
- Include only public content:
  - non-draft articles for the matching locale
  - published places
  - all current mobile plans
  - all current area guides
  - published tools
- Keep the implementation static and dependency-free.
- Link search from the primary navigation.
- Update docs, tests, sitemap policy, and build-output checks.

## UX Requirements

- Search page should work with basic client-side filtering.
- Initial static HTML should include browseable result cards so the page is useful if JavaScript fails.
- Query matching should cover title, description, type, category, tags, and relevant content fields.
- Result labels should be locale-aware.
- The search page should explain that search covers current public static content.

## SEO Requirements

- `/[locale]/search` should use `noindex, follow` because search pages are utility pages, not canonical content.
- `/[locale]/search` should not be included in `sitemap.xml`.
- `/[locale]/search-index.json` should not be included in `sitemap.xml`.
- Built search index JSON should be valid and contain only public content.

## Non-Goals

- Do not add Algolia, Meilisearch, Typesense, database search, Cloudflare Workers, or server runtime code.
- Do not add personalized ranking, analytics, typo tolerance, pagination, or saved searches.
- Do not index account placeholders, draft articles, non-published places, planned tools, or form thank-you pages.
