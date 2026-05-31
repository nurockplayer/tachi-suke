# Phase 1AK OpenSearch Discovery Design

## Goal

Expose TachiSuke's static search route through the standard OpenSearch discovery mechanism so browsers and search-adjacent tools can find the site search surface.

## Scope

- Add static `/opensearch.xml`.
- Link it from every page through `BaseLayout` with `rel="search"`.
- Point the template at `/en/search?q={searchTerms}` as the stable locale fallback.
- Add conservative Cloudflare cache headers.

## Non-Goals

- No dynamic language detection.
- No backend search API.
- No indexed search service.
- No account or private-content search.

## Acceptance

- `pnpm test` verifies source endpoint and BaseLayout discovery.
- `pnpm build` generates `dist/opensearch.xml`.
- `pnpm check:seo` verifies XML content, root page discovery link, and cache headers.
