# Phase 1AL WebSite SearchAction JSON-LD Plan

## Architecture

Reuse `Astro.site` / `SITE_URL` behavior in `BaseLayout` to build an absolute static search template. Use the English search route because it is the stable locale fallback already used by OpenSearch.

## Tasks

- [x] Inspect current `WebSite` JSON-LD and SEO tests.
- [x] Write failing source-level and build-output SEO tests.
- [x] Add `SearchAction` to `WebSite` JSON-LD.
- [x] Update docs and roadmap status.
- [x] Run `pnpm install`, `pnpm test`, `pnpm check:content`, `pnpm build`, `pnpm check:links`, and `pnpm check:seo`.
- [ ] Open PR, wait for checks, merge when clean.
