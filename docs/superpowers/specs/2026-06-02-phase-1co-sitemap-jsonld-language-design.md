# Phase 1CO Site Map JSON-LD Language Design

## Objective

Make human-readable site map structured data use the same BCP47 language metadata as the rendered HTML language.

## Scope

- Update `SiteMapPage` `WebPage.inLanguage` to use `htmlLangByLocale[locale]`.
- Add source-level coverage that the site map component uses shared locale metadata.
- Add build-output SEO coverage for generated `/[locale]/site-map` JSON-LD language values.

## Non-goals

- No visible site map layout changes.
- No route, sitemap entry, content model, account placeholder, search, auth, database, or backend changes.
- No new dependency.

## Acceptance

- `/zh-tw/site-map` JSON-LD uses `zh-Hant-TW`.
- `/en/site-map`, `/ja/site-map`, and `/ko/site-map` JSON-LD continue to use `en`, `ja`, and `ko`.
- Existing source, content, build, link, SEO, and deployment checks pass.
