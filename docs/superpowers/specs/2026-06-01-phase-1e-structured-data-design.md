# Phase 1E Structured Data Design

## Objective

Add lightweight JSON-LD structured data to TachiSuke so search engines can understand the site, detail pages, and breadcrumbs more accurately.

## Decision

Keep the implementation inside Astro components and small TypeScript helpers. Do not add a structured-data dependency. The site already has all required metadata in content collections, and hand-built JSON-LD keeps the output predictable for a static site.

## Scope

This phase adds:

- A `jsonLd` prop on `BaseLayout`.
- Safe JSON serialization for one or more JSON-LD objects.
- Default `WebSite` and `Organization` JSON-LD on all pages.
- `Article` JSON-LD and `BreadcrumbList` JSON-LD on article detail pages.
- `LocalBusiness` JSON-LD and `BreadcrumbList` JSON-LD on place detail pages.
- Build-output tests that confirm generated HTML contains parseable JSON-LD for representative detail pages.

## Non-Goals

This phase does not add live business data, ratings, reviews, prices, offers, user-generated public reviews, or schema claims that are not backed by current content.

## Structured Data Rules

- Do not invent ratings, review counts, opening hours, or exact addresses.
- Use only fields already available in the static content model.
- Keep `@id` stable and URL-based.
- Use page canonical URL as the primary entity ID where practical.
- Include breadcrumbs only for routes that have clear hierarchy.

## Acceptance Criteria

- `pnpm test` verifies `BaseLayout` and detail components are wired for JSON-LD.
- `pnpm build` generates pages with `application/ld+json` scripts.
- `pnpm check:seo` parses representative built pages and verifies `Article`, `LocalBusiness`, `BreadcrumbList`, `WebSite`, and `Organization` JSON-LD.
- `pnpm check:links` remains green.
