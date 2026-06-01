# Phase 1CS Multilingual Static 404 Hero Copy Design

## Objective

Complete the static 404 recovery page by making the top explanation and language-selection guidance multilingual without adding runtime language detection.

## Scope

- `src/pages/404.astro` visible hero and language-selector copy.
- Lightweight CSS for the multilingual intro copy.
- Source-level and build-output SEO tests for the generated `404.html`.
- Documentation updates for the Phase 1CS behavior.

## Non-goals

- No language-detection redirects.
- No client-side locale switching, Cloudflare Functions, Workers, analytics, backend error tracking, auth, database, real favorites, or native submissions.
- No locale-specific 404 routes.
- No sitemap inclusion or account placeholder changes.

## Acceptance

- `404.html` remains static, branded, noindex, and excluded from `sitemap.xml`.
- The visible heading is language-neutral.
- The top recovery explanation appears in `zh-tw`, `en`, `ja`, and `ko`.
- Language-selector guidance appears in supported locales instead of fixed English-only copy.
- Existing source, content, build, link, and SEO checks pass.
