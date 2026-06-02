# Phase 1DD Public HTML Title and Description Guard Design

## Goal

Make the build-output SEO check fail when an indexable public HTML page is missing basic title or description metadata.

## Context

`BaseLayout` already emits:

- `<title>`
- `<meta name="description">`
- `<meta property="og:title">`
- `<meta property="og:description">`
- `<meta name="twitter:title">`
- `<meta name="twitter:description">`

Representative SEO tests already cover many pages, and Phase 1DC added a sitemap-derived canonical / `og:url` sweep. The remaining gap is that a future public page could accidentally ship with missing or divergent title/description metadata while still passing representative checks.

## Scope

- Update `tests/seo-output.test.mjs`.
- Reuse the sitemap-derived public HTML page list.
- For every sitemap HTML page, verify:
  - `<title>` exists and contains `TachiSuke`
  - meta description exists and is not blank
  - Open Graph title and description exist
  - Twitter title and description exist
  - social title/description values match the regular page title/description
  - none of the checked values are `undefined` or `null`
- Update docs to describe the Phase 1DD guard.

## Non-Goals

- Do not change visible UI, routes, content, schemas, auth, database, submissions, Cloudflare settings, Workers, Functions, or backend behavior unless the new test exposes a real metadata defect.
- Do not impose English word-count heuristics on multilingual descriptions.
- Do not scan noindex utility pages intentionally excluded from `sitemap.xml`.
- Do not add external crawling, browser automation, analytics, or new dependencies.

## Acceptance Criteria

- `pnpm check:seo` fails if any indexable public HTML sitemap URL lacks title or description metadata.
- `pnpm check:seo` fails if Open Graph or Twitter title/description metadata is missing.
- `pnpm check:seo` fails if social title/description values drift away from the page title/description.
- Existing static SEO, link, content, and deploy checks remain green.
