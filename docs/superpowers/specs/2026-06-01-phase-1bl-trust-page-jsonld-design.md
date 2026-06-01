# Phase 1BL Trust Page JSON-LD Design

## Goal

Public trust and form-entry pages are part of the launch-readiness surface. Add conservative `WebPage` and `BreadcrumbList` JSON-LD so crawlers can understand About, policy, contact, and submission pages without changing the visible UI.

## Scope

- Add page-specific `WebPage` JSON-LD to `/[locale]/about`.
- Add page-specific `WebPage` JSON-LD to `/[locale]/privacy`.
- Add page-specific `WebPage` JSON-LD to `/[locale]/editorial-policy`.
- Add page-specific `WebPage` JSON-LD to `/[locale]/contact`.
- Add page-specific `WebPage` JSON-LD to `/[locale]/submit-place`.
- Add two-item `BreadcrumbList` JSON-LD from locale homepage to each current page.
- Keep current static-first form behavior unchanged.
- Add source-level and build-output SEO tests.

## Non-Goals

- No visual UI changes.
- No provider-specific form endpoint integration.
- No backend, database, login, favorites, analytics, or moderation dashboard.
- No JSON-LD on noindex account placeholder pages.
- No claims that external form submissions are stored by this repo.

## JSON-LD Shape

Each page should emit:

- `WebPage` with canonical URL, localized title, localized description, HTML language, `isPartOf`, and publisher relationship.
- `BreadcrumbList` with two `ListItem` entries:
  1. Locale homepage named `TachiSuke`.
  2. Current page named with the localized page title.

## Validation

- `pnpm test` verifies source wiring.
- `pnpm build` generates static output.
- `pnpm check:seo` parses built HTML and verifies trust/form page JSON-LD.
