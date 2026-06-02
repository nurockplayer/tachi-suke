# Phase 1DH Noindex Utility Page Guard Design

## Goal

Make the build-output SEO check fail when utility pages that should remain non-indexable are accidentally exposed in the sitemap or lose their noindex metadata.

## Context

Phase 1 keeps search pages, account placeholders, and `404.html` static. These pages are useful to users, but they should not be treated as public indexable content surfaces.

Existing checks already cover search and 404 behavior, but account placeholder noindex coverage was mostly source-level. Sitemap exclusion also used a small sample list instead of all current utility paths.

## Scope

- Update `tests/seo-output.test.mjs`.
- Derive utility sitemap exclusions for all supported locales.
- Verify all account placeholder routes stay out of `sitemap.xml`.
- Verify built account placeholder pages keep `noindex, nofollow`.
- Verify locale search routes and search index JSON endpoints stay out of `sitemap.xml`.
- Verify built search pages keep `noindex, follow`.
- Keep existing 404 noindex and sitemap exclusion checks.
- Update docs to describe the Phase 1DH guard.

## Non-Goals

- Do not implement login, account behavior, favorites, database-backed search, or search indexing changes.
- Do not change route structure, visible UI, robots runtime generation, Cloudflare settings, Workers, Functions, or backend behavior unless the new test exposes a real noindex defect.
- Do not add dependencies.

## Acceptance Criteria

- `pnpm check:seo` fails if any account placeholder, search page, search index JSON endpoint, `/404`, or `/404.html` appears in `sitemap.xml`.
- `pnpm check:seo` fails if any built account placeholder page lacks `noindex, nofollow`.
- `pnpm check:seo` fails if any built locale search page lacks `noindex, follow`.
- Existing static SEO, link, content, deploy, and source tests remain green.
