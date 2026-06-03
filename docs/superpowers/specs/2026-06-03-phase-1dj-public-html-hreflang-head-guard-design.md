# Phase 1DJ Public HTML Hreflang Head Guard Design

## Context

TachiSuke emits locale-aware canonical and head `hreflang` links through `BaseLayout`, with article detail pages passing conservative `alternatePaths` when translations exist. Sitemap-level `xhtml:link` checks already cover representative shared pages and translated article groups.

The remaining launch-readiness gap is build-output coverage that every public HTML page listed in `sitemap.xml` avoids broken or misleading head `hreflang` links.

## Decision

Add a dependency-free `pnpm check:seo` guard that sweeps public HTML pages listed in `sitemap.xml` and verifies:

- Every page has at least one head `hreflang` alternate.
- `hreflang` values are supported BCP47 locale values or `x-default`.
- A page does not duplicate the same `hreflang` value.
- Alternate URLs use the configured site origin.
- Alternate URLs do not include query strings or hashes.
- Alternate URLs point at public sitemap HTML paths.

Do not require every article to emit all four locale alternates. Missing translations are valid when the emitted alternates remain conservative.

## Non-Goals

- No runtime i18n generation changes.
- No route changes.
- No UI changes.
- No language detection.
- No auth, database, forms, Workers, Functions, or backend behavior.

## Acceptance

- `pnpm check:seo` fails if a sitemap-derived public HTML page emits a head `hreflang` link to a page absent from `sitemap.xml`.
- `pnpm check:seo` fails if a head `hreflang` link uses an unsupported locale value.
- `pnpm check:seo` fails if a page duplicates a `hreflang` value.
- Existing sitemap alternate, noindex utility, discovery, and JSON-LD guards continue to pass.
