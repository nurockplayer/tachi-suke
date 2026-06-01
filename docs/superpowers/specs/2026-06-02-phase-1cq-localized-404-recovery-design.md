# Phase 1CQ Localized Static 404 Recovery Design

## Objective

Improve the static 404 page so visitors can recover into the correct language and practical section without being pushed only to English links.

## Scope

- `src/pages/404.astro` recovery copy and links.
- Source-level structure checks for locale-aware recovery links.
- Build-output SEO checks for generated `404.html`.
- Documentation updates for the Phase 1CQ behavior.

## Non-goals

- No language-detection redirects.
- No Cloudflare Functions, Workers, analytics, backend error tracking, auth, database, real favorites, or native submissions.
- No route structure, sitemap inclusion, or account placeholder changes.
- No JavaScript dependency or runtime personalization.

## Acceptance

- `404.html` remains static, branded, noindex, and excluded from `sitemap.xml`.
- The page links to each supported locale home.
- The page links to each supported locale articles, mobile, and tools route.
- Locale-specific recovery sections include BCP47 language metadata.
- Existing source, content, build, link, and SEO checks pass.
