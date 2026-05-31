# Phase 1AQ Security.txt Legacy Redirect Plan

## Architecture

Keep the canonical security file at `/.well-known/security.txt` and add only a Cloudflare Pages redirect for `/security.txt`. This keeps one generated source of truth while supporting common scanner behavior.

## Tasks

- [x] Confirm `/search` fallback already exists and inspect current security.txt routes.
- [x] Write failing source-level and build-output redirect tests.
- [x] Add `/security.txt` redirect.
- [x] Update docs and roadmap/status.
- [x] Run `pnpm install`, `pnpm test`, `pnpm check:content`, `pnpm build`, `pnpm check:links`, and `pnpm check:seo`.
- [ ] Open PR, wait for checks, merge when clean.
