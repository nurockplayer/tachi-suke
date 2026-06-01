# Phase 1BP Work Contract Basics Articles Design

## Goal

Add a four-locale work-life article cluster that helps foreign residents in Japan check residence-status fit, written working conditions, wages, shifts, commute, and resignation basics before accepting part-time or full-time work.

## Scope

- Add a localized `work` article category.
- Add one public article per supported locale for work contract basics.
- Use `translationKey = japan-work-contract-basics` so sitemap hreflang, RSS, static search, and related content can connect the translations.
- Link articles to first-week setup, residence administration basics, area guides, MHLW labor consultation, and Study in Japan part-time work guidance.
- Extend source-level tests for article count, locale thresholds, category copy, slug coverage, and translation-key coverage.
- Update public docs and roadmap.

## Non-Goals

- No legal, immigration, tax, labor-dispute, or visa advice.
- No job board, employer review, resume builder, work-permission application, backend storage, auth, database, or Supabase integration.
- No new content model fields.
- No UI redesign or route structure changes.

## Validation

- `pnpm test` verifies category copy, article count, per-locale coverage, expected slugs, and internal links.
- `pnpm check:content` verifies article IDs, slugs, dates, and external HTTPS links.
- `pnpm build` generates article detail/category/RSS/sitemap output.
- `pnpm check:links` verifies built internal links.
- `pnpm check:seo` verifies generated SEO and discovery outputs.
