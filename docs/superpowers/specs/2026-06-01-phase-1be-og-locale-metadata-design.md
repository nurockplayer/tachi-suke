# Phase 1BE Open Graph Locale Metadata Design

## Goal

Add Open Graph locale metadata to improve multilingual social sharing and crawler interpretation for TachiSuke pages.

## Scope

- Add shared `ogLocaleByLocale` metadata for `zh-tw`, `en`, `ja`, and `ko`.
- Render `og:locale` for the current page locale.
- Render `og:locale:alternate` for other supported locales when alternate paths are available.
- Update source-level and build-output SEO tests.
- Update docs.

## Non-Goals

- Do not change routing, content, translations, or locale-switcher behavior.
- Do not add social platform SDKs, analytics, or runtime locale detection.

## Validation

- `pnpm test`
- `pnpm build`
- `pnpm check:links`
- `pnpm check:seo`

