# Phase 1I Detail Structured Data Design

## Objective

Improve SEO clarity for static detail pages beyond articles and places by adding conservative JSON-LD to mobile plan, area guide, and tool detail pages.

## Decision

Use only stable fields already present in the static content model. Do not add `Offer`, ratings, review counts, coordinates, opening hours, exact prices, or claims that require live validation.

## Scope

This phase adds:

- `Service` and `BreadcrumbList` JSON-LD on mobile plan detail pages.
- `WebPage` and `BreadcrumbList` JSON-LD on area detail pages.
- `WebPage`, `ItemList`, and `BreadcrumbList` JSON-LD on tool detail pages.
- Build-output SEO tests that parse representative generated HTML pages.

## Non-Goals

This phase does not add dynamic pricing, carrier availability checks, review data, map coordinates, saved checklist state, or any runtime SEO service.

## Acceptance Criteria

- `pnpm check:seo` fails before implementation when the expected JSON-LD is absent.
- `pnpm build` succeeds after implementation.
- `pnpm check:seo` verifies representative mobile, area, and tool detail pages.
- Existing link and source-level tests remain green.
