# Phase 1DC Public HTML Head SEO Guard Design

## Goal

Make the build-output SEO check fail when an indexable public HTML page is missing its canonical URL or Open Graph URL metadata.

## Context

`BaseLayout` already emits:

- `<link rel="canonical">`
- `<meta property="og:url">`

Existing `pnpm check:seo` tests verify many representative pages and discovery files, but they do not sweep every public HTML URL in `sitemap.xml`. A future route could become indexable without the same head metadata and still pass the current representative checks.

## Scope

- Update `tests/seo-output.test.mjs`.
- Derive the indexable public page list from `sitemap.xml`.
- For sitemap paths that map to built HTML pages, verify:
  - the built HTML file exists
  - a canonical link is present
  - `og:url` is present
  - both values match the expected absolute URL
  - canonical and `og:url` are equal
- Update docs to describe the Phase 1DC guard.

## Non-Goals

- Do not change UI, layouts, routes, content, auth, database, submissions, Cloudflare settings, Workers, Functions, or backend behavior unless the new test exposes a real missing metadata defect.
- Do not scan noindex utility pages that are intentionally excluded from `sitemap.xml`, such as search pages, account placeholders, and the custom 404 page.
- Do not add external crawling, browser automation, analytics, or new dependencies.

## Acceptance Criteria

- `pnpm check:seo` fails if any indexable public HTML sitemap URL lacks canonical metadata.
- `pnpm check:seo` fails if any indexable public HTML sitemap URL lacks `og:url`.
- `pnpm check:seo` fails if canonical and `og:url` disagree.
- Existing static SEO, link, content, and deploy checks remain green.
