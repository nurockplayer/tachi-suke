# Phase 1CZ Cache-Control Detach Design

## Goal

Prevent Cloudflare Pages from joining the global HTML revalidation `Cache-Control` value with more specific static-asset and discovery cache rules.

## Context

Cloudflare Pages applies every matching `_headers` rule to a response. If the same header is applied more than once, Cloudflare joins the values with a comma separator. A specific block can detach an inherited header with `! Header-Name` before setting its own value.

Reference: <https://developers.cloudflare.com/pages/configuration/headers/>

## Scope

- Add `! Cache-Control` to every specific `_headers` block that sets its own `Cache-Control` value.
- Cover fingerprinted Astro assets, public images, sitemap, robots, manifest, RSS feeds, `llms.txt`, `security.txt`, `opensearch.xml`, and locale search indexes.
- Update `tests/seo-output.test.mjs` so `pnpm check:seo` verifies each specific cache block detaches the inherited global `Cache-Control` rule.
- Record the Phase 1CZ deployment-header rule in project documentation.

## Non-Goals

- Do not change routes, generated HTML, content, schemas, forms, auth, database, Workers, Functions, or backend behavior.
- Do not add live crawling, analytics, external link validation, or new dependencies.

## Acceptance Criteria

- `pnpm check:seo` fails if a specific cache block that sets `Cache-Control` does not first include `! Cache-Control`.
- `pnpm check:seo` still verifies the exact intended cache value for each checked block.
- A production Cloudflare Pages smoke check should show discovery files with a single effective cache policy instead of a comma-joined duplicate value.
