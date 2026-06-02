# Phase 1CX Multilingual Section JSON-LD Check Design

## Goal

Reduce multilingual SEO regression risk by making the post-build SEO check validate section index `CollectionPage` and `ItemList` JSON-LD for every supported locale, not only English.

## Scope

- Update `tests/seo-output.test.mjs` so `/[locale]/mobile`, `/[locale]/areas`, `/[locale]/places`, and `/[locale]/tools` are checked across `zh-tw`, `en`, `ja`, and `ko`.
- Verify each section index uses the correct BCP47 `inLanguage`, canonical URL, breadcrumb home URL, visible item count, and detail URL prefix.
- Record the Phase 1CX quality-gate rule in project documentation.

## Non-Goals

- Do not change generated pages, routes, content schemas, content entries, sitemap generation, forms, auth, database, or deployment configuration.
- Do not add analytics, hosted search, live crawling, or new dependencies.

## Acceptance Criteria

- `pnpm check:seo` fails if any locale section index omits `CollectionPage`, `ItemList`, or `BreadcrumbList` JSON-LD.
- `pnpm check:seo` fails if any locale section index JSON-LD uses the wrong language or canonical URL.
- `pnpm check:seo` fails if section index `ItemList` counts diverge from the public content collections.
