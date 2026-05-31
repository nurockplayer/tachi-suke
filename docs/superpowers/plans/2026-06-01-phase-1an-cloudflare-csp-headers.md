# Phase 1AN Cloudflare CSP Headers Plan

## Architecture

Use Cloudflare Pages `_headers` for a static CSP that matches the current site: inline JSON-LD and small inline enhancement scripts are allowed, form actions may target HTTPS external endpoints, and high-risk embedding surfaces remain blocked.

## Tasks

- [x] Inspect current headers and inline/form requirements.
- [x] Write failing build-output SEO tests.
- [x] Add CSP to `public/_headers`.
- [x] Update docs and roadmap status.
- [x] Run `pnpm install`, `pnpm test`, `pnpm check:content`, `pnpm build`, `pnpm check:links`, and `pnpm check:seo`.
- [ ] Open PR, wait for checks, merge when clean.
