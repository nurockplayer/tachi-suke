# Phase 1DF Public HTML Discovery Link Guard Design

## Goal

Make the build-output SEO check fail when an indexable public HTML page is missing shared discovery links used by browsers, search-adjacent tooling, feed readers, and install-adjacent metadata.

## Context

`BaseLayout` already emits:

- SVG favicon link
- web manifest link
- OpenSearch description link
- global RSS alternate link
- current-locale RSS alternate link

Existing checks validate the generated discovery files and selected root-page links, but they do not sweep every indexable public HTML URL in `sitemap.xml`.

## Scope

- Update `tests/seo-output.test.mjs`.
- Reuse the sitemap-derived public HTML page list.
- For every sitemap HTML page, verify:
  - `/favicon.svg` icon link
  - `/site.webmanifest` manifest link
  - `/opensearch.xml` OpenSearch link
  - `/feed.xml` global RSS alternate link
  - `/[locale]/feed.xml` current-locale RSS alternate link
- Update docs to describe the Phase 1DF guard.

## Non-Goals

- Do not change visible UI, routes, content, schemas, auth, database, submissions, Cloudflare settings, Workers, Functions, or backend behavior unless the new test exposes a real discovery defect.
- Do not perform live crawling or external URL checks.
- Do not scan noindex utility pages intentionally excluded from `sitemap.xml`.
- Do not add dependencies.

## Acceptance Criteria

- `pnpm check:seo` fails if any indexable public HTML sitemap URL lacks the favicon, manifest, OpenSearch, global RSS, or current-locale RSS link.
- Root `/` uses the English fallback locale feed.
- Locale-prefixed public pages use their matching locale feed.
- Existing static SEO, link, content, deploy, and source tests remain green.
