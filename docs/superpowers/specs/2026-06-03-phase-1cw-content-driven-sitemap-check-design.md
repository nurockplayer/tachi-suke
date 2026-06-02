# Phase 1CW Content-Driven Sitemap Check Design

## Goal

Reduce SEO regression risk by making the post-build sitemap check derive expected public content paths from the current content collections instead of relying on a long hand-maintained sample list.

## Scope

- Update `tests/seo-output.test.mjs` so public article, category, area, mobile plan, published place, and published tool sitemap expectations are generated from `src/content`.
- Keep the existing built `sitemap.xml` generation behavior unchanged.
- Preserve sitemap exclusion checks for search utility pages, search indexes, account placeholders, drafts, and non-published content.
- Record the Phase 1CW quality-gate rule in project documentation.

## Non-Goals

- Do not change public routes, canonical URLs, sitemap generation, RSS feeds, search behavior, forms, auth, database, or deployment configuration.
- Do not fetch external URLs or validate live provider data.
- Do not introduce new dependencies.

## Acceptance Criteria

- `pnpm check:seo` fails if a public content collection detail path is missing from `dist/sitemap.xml`.
- `pnpm check:seo` fails if a generated public article category path is missing from `dist/sitemap.xml`.
- `pnpm check:seo` continues to verify that private, noindex, or utility routes are excluded from `dist/sitemap.xml`.
