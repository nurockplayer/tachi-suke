# Phase 1AM Sitemap Hreflang Alternates Plan

## Architecture

Extend the existing custom `sitemap.xml.ts` endpoint with optional alternate paths per entry. Shared static pages can use a helper that expands all supported locales. Article detail alternates should be grouped by `translationKey` and include only non-draft generated article pages.

## Tasks

- [x] Inspect current sitemap generation and locale metadata.
- [x] Write failing source-level and build-output SEO tests.
- [x] Add sitemap entry alternates and XHTML namespace.
- [x] Update docs and roadmap status.
- [x] Run `pnpm install`, `pnpm test`, `pnpm check:content`, `pnpm build`, `pnpm check:links`, and `pnpm check:seo`.
- [ ] Open PR, wait for checks, merge when clean.
