# Phase 1AO Security.txt Plan

## Architecture

Add a static endpoint under `src/pages/.well-known/security.txt.ts`. Generate absolute URLs from `Astro.site` / `SITE_URL`, point `Contact` at `/en/contact`, and keep the file informational until a real security response process exists.

## Tasks

- [x] Inspect current discovery endpoints and contact route.
- [x] Write failing source-level and build-output SEO tests.
- [x] Add `/.well-known/security.txt` endpoint and cache header.
- [x] Update docs and roadmap status.
- [x] Run `pnpm install`, `pnpm test`, `pnpm check:content`, `pnpm build`, `pnpm check:links`, and `pnpm check:seo`.
- [ ] Open PR, wait for checks, merge when clean.
