# Phase 1DI Public HTML Social Image Guard Design

## Context

TachiSuke already emits default Open Graph and Twitter image metadata from `BaseLayout`. Source-level tests confirm the hooks exist, and representative SEO tests cover titles, descriptions, canonical URLs, discovery links, and JSON-LD across built public HTML.

The remaining launch-readiness gap is build-output coverage for social sharing image metadata on every sitemap-derived indexable HTML page.

## Decision

Add a dependency-free `pnpm check:seo` guard that sweeps public HTML pages listed in `sitemap.xml` and verifies:

- `og:image` exists and is non-empty.
- `og:image:alt` exists and is non-empty.
- `twitter:image` exists and matches `og:image`.
- `twitter:card` exists and equals `summary_large_image`.
- Social image URLs use the configured site origin and same-site image assets.

Do not hard-lock every page to the default image path. Future article-specific or section-specific same-site images should be possible without rewriting the test intent.

## Non-Goals

- No runtime SEO generation changes.
- No route changes.
- No UI changes.
- No new image assets.
- No social SDKs, analytics, tracking, auth, database, forms, Workers, Functions, or backend behavior.

## Acceptance

- `pnpm check:seo` fails if any sitemap-derived public HTML page is missing social image metadata.
- `pnpm check:seo` fails if `twitter:image` drifts from `og:image`.
- `pnpm check:seo` fails if `twitter:card` is no longer `summary_large_image`.
- Existing public sitemap, noindex utility, and JSON-LD guards continue to pass.
