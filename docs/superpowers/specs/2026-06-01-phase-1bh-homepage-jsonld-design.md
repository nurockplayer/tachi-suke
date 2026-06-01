# Phase 1BH Homepage JSON-LD Design

## Goal

Make each locale homepage clearer to crawlers as a localized life-decision entry page. The current site-wide `Organization` and `WebSite` JSON-LD identifies TachiSuke globally, but the locale homepages do not describe their own page role or the primary start-here links.

## Scope

- Add conservative `WebPage` JSON-LD to `LocaleHomePage.astro`.
- Add conservative `ItemList` JSON-LD from the existing start-here links.
- Keep the data backed by current rendered page copy and links.
- Update source-level and build-output SEO tests.
- Update product/implementation docs.

## Non-Goals

- No UI changes.
- No route changes.
- No backend, auth, database, analytics, or personalization changes.
- No invented ratings, review counts, prices, or external claims.

## Data Shape

The locale homepage should emit:

- `WebPage` with canonical URL, localized name, localized description, `inLanguage`, site relationship, and publisher relationship.
- `ItemList` with ordered `ListItem` entries for the existing start-here links.

The `ItemList` entries should use localized labels and absolute URLs generated from `localizePath(locale, entry.href)`.

## Validation

- `pnpm test` should verify source wiring.
- `pnpm build` should generate valid static HTML.
- `pnpm check:seo` should parse built locale homepage JSON-LD and verify `WebPage` and `ItemList`.
- `pnpm check:links` should continue to pass because the ItemList URLs mirror existing rendered links.
