# Phase 1AK OpenSearch Discovery Plan

## Architecture

Add an Astro static endpoint for `/opensearch.xml`. Reuse `Astro.site` / `SITE_URL` behavior for absolute URLs and link it from `BaseLayout`. Keep the search template on `/en/search` because locale-less search currently redirects to English and OpenSearch templates do not know the user's preferred locale.

## Tasks

- [x] Inspect search page, BaseLayout discovery links, and Cloudflare headers.
- [x] Write failing source-level and build-output SEO tests.
- [x] Add `/opensearch.xml` endpoint.
- [x] Link OpenSearch from `BaseLayout`.
- [x] Add `_headers` cache rule.
- [x] Update docs and roadmap status.
- [x] Run `pnpm install`, `pnpm test`, `pnpm check:content`, `pnpm build`, `pnpm check:links`, and `pnpm check:seo`.
- [ ] Open PR, wait for checks, merge when clean.
