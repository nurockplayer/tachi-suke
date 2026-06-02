# Phase 1CY Discovery Cache Header Checks Design

## Goal

Reduce deployment SEO regression risk by making the build-output SEO check verify every public discovery endpoint that should use the conservative one-hour Cloudflare Pages cache rule.

## Scope

- Update `tests/seo-output.test.mjs` so `_headers` cache checks are data-driven instead of a small set of hand-written examples.
- Cover `sitemap.xml`, `robots.txt`, `llms.txt`, `security.txt`, `opensearch.xml`, `site.webmanifest`, the global RSS feed, all locale RSS feeds, and all locale search indexes.
- Require exactly one `Cache-Control` rule in each checked `_headers` block.
- Record the Phase 1CY quality-gate rule in project documentation.

## Non-Goals

- Do not change Cloudflare Pages runtime behavior, deployment configuration, routes, generated HTML, content, auth, database, forms, or backend behavior.
- Do not add live header crawling, external URL validation, analytics, Workers, Functions, or new dependencies.

## Acceptance Criteria

- `pnpm check:seo` fails if any required discovery endpoint loses its one-hour cache rule.
- `pnpm check:seo` fails if a checked `_headers` block defines duplicate `Cache-Control` lines.
- Existing SEO checks for sitemap, robots, manifest, feeds, search indexes, and structured data continue to pass.
