# Phase 1DE Public HTML Shell Guard Design

## Goal

Make the build-output SEO check fail when an indexable public HTML page is missing the shared document shell metadata and baseline accessibility landmarks.

## Context

`BaseLayout` already emits:

- locale-aware `<html lang>`
- mobile viewport metadata
- a skip link to `#main-content`
- a stable `<main id="main-content">` landmark

Representative tests verify these hooks on selected pages, but the current build-output SEO checks do not sweep every indexable public HTML URL in `sitemap.xml`.

## Scope

- Update `tests/seo-output.test.mjs`.
- Reuse the sitemap-derived public HTML page list.
- For every sitemap HTML page, verify:
  - `<html lang>` matches the page locale, with `/` using English
  - viewport metadata exists
  - skip link points to `#main-content`
  - `<main id="main-content">` exists
- Update docs to describe the Phase 1DE guard.

## Non-Goals

- Do not change visible UI, routes, content, schemas, auth, database, submissions, Cloudflare settings, Workers, Functions, or backend behavior unless the new test exposes a real shell defect.
- Do not perform a full WCAG audit or browser automation.
- Do not scan noindex utility pages intentionally excluded from `sitemap.xml`.
- Do not add dependencies.

## Acceptance Criteria

- `pnpm check:seo` fails if any indexable public HTML sitemap URL has the wrong document language.
- `pnpm check:seo` fails if any indexable public HTML sitemap URL lacks viewport metadata.
- `pnpm check:seo` fails if any indexable public HTML sitemap URL lacks the skip link or stable main landmark.
- Existing static SEO, link, content, and deploy checks remain green.
