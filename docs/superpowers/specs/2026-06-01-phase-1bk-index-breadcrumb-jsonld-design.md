# Phase 1BK Index Breadcrumb JSON-LD Design

## Goal

Collection index pages now expose `CollectionPage` and `ItemList` JSON-LD. Add conservative `BreadcrumbList` JSON-LD so crawlers can understand the relationship between each locale homepage and its top-level content hubs.

## Scope

- Add `BreadcrumbList` JSON-LD to `/[locale]/articles`.
- Add `BreadcrumbList` JSON-LD to `/[locale]/mobile`.
- Add `BreadcrumbList` JSON-LD to `/[locale]/areas`.
- Add `BreadcrumbList` JSON-LD to `/[locale]/places`.
- Add `BreadcrumbList` JSON-LD to `/[locale]/tools`.
- Keep visible UI unchanged.
- Add source-level and build-output SEO tests.

## Non-Goals

- No visual breadcrumb component on index pages.
- No route or content model changes.
- No backend, auth, database, analytics, or personalization.
- No changes to detail-page breadcrumbs.

## Breadcrumb Shape

Each index page should emit two `ListItem` entries:

1. Localized homepage, named `TachiSuke`.
2. Current collection index, named with the localized section title.

## Validation

- `pnpm test` verifies source wiring.
- `pnpm build` generates static output.
- `pnpm check:seo` parses built index pages and verifies `BreadcrumbList`.
