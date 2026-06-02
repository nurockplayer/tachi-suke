# Phase 1DG Public HTML JSON-LD Guard Design

## Goal

Make the build-output SEO check fail when an indexable public HTML page emits malformed JSON-LD or obvious placeholder string values.

## Context

`BaseLayout` emits site-wide `Organization` and `WebSite` JSON-LD on every page, and public page components add page-specific structured data where useful. Existing tests validate representative structured data pages, but they do not parse every JSON-LD script on every indexable public HTML URL in `sitemap.xml`.

## Scope

- Update `tests/seo-output.test.mjs`.
- Reuse the sitemap-derived public HTML page list.
- For every sitemap HTML page, verify:
  - at least one JSON-LD script exists
  - every JSON-LD script parses successfully
  - parsed string values are not exactly `undefined` or `null`
- Update docs to describe the Phase 1DG guard.

## Non-Goals

- Do not change visible UI, routes, content, schemas, structured data generation, auth, database, submissions, Cloudflare settings, Workers, Functions, or backend behavior unless the new test exposes a real JSON-LD defect.
- Do not validate structured-data eligibility with an external service.
- Do not perform live crawling or external URL checks.
- Do not scan noindex utility pages intentionally excluded from `sitemap.xml`.
- Do not add dependencies.

## Acceptance Criteria

- `pnpm check:seo` fails if any indexable public HTML sitemap URL lacks JSON-LD scripts.
- `pnpm check:seo` fails if any JSON-LD script on those pages cannot be parsed.
- `pnpm check:seo` fails if parsed JSON-LD contains a string value exactly equal to `undefined` or `null`.
- Existing static SEO, link, content, deploy, and source tests remain green.
