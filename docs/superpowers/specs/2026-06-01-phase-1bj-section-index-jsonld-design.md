# Phase 1BJ Section Index JSON-LD Design

## Goal

After locale homepages and article indexes, the remaining public content hubs should also be understandable as static collections. `/[locale]/mobile`, `/[locale]/areas`, `/[locale]/places`, and `/[locale]/tools` currently render useful cards but do not expose page-specific structured collection data.

## Scope

- Add conservative `CollectionPage` JSON-LD to mobile, area, place, and tool index pages.
- Add `ItemList` JSON-LD from the same rendered card/list data.
- Keep UI, routing, content models, and detail-page JSON-LD unchanged.
- Add source-level and build-output SEO tests.
- Update documentation.

## Non-Goals

- No new content.
- No schema/model changes.
- No UI redesign.
- No backend, auth, favorites, database, analytics, or live availability.
- No invented ratings, review counts, exact prices, opening hours, coordinates, or offers.

## Pages

- `MobileIndexPage.astro`: list mobile plan detail pages.
- `SimpleSectionPage.astro` as `areas`: list area detail pages.
- `PlacesIndexPage.astro`: list published place detail pages.
- `SimpleSectionPage.astro` as `tools`: list published tool detail pages.

## Validation

- `pnpm test` verifies source wiring.
- `pnpm build` generates static output.
- `pnpm check:seo` parses representative built collection pages and verifies `CollectionPage` and `ItemList`.
- `pnpm check:links` verifies generated links remain valid.
