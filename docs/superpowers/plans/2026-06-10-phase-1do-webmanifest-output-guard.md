# Phase 1DO Web Manifest Output Guard Plan

## Startup Readback

- `cwd`: `/Users/tachikoma/Developer/tachi-suke`
- Base branch: `main`
- Feature branch: `codex/phase-1do-webmanifest-output-guard`
- Dirty state: main has an existing local `.gitignore` modification that is unrelated and must not be staged or reverted.
- Source of truth: user autonomous request, `AGENTS.md`, `docs/ai/autonomous-bootstrap.md`, and current Phase 1 static-first boundaries.
- Scope: add a static build-output guard for the generated `site.webmanifest` browser app identity contract.
- Non-goals: no runtime UI changes, no route changes, no service worker, no install prompt, no offline caching, no push notifications, no auth, no database, no Workers, no Functions, no backend behavior.
- Phase: Phase 1-safe.

## Worker Routing

- `controller_fallback_reason=trivial_self_only`
- This is a narrow single-output test/docs change. Delegating would add coordination overhead without reducing implementation risk.

## Tasks

- [x] Confirm current main and open PR state.
- [x] Create isolated worktree and verify baseline tests.
- [x] Inspect current web manifest endpoint and existing SEO output checks.
- [x] Add exact web manifest output checks.
- [x] Update docs and acceptance notes.
- [x] Run validation.
- [ ] Open PR, address CI/review feedback, merge, and deploy if gates pass.

## Planned Validation

- `pnpm test`
- `pnpm check:content`
- `SITE_URL=https://tachi-suke.pages.dev pnpm build`
- `pnpm check:links`
- `SITE_URL=https://tachi-suke.pages.dev pnpm check:seo`
- `SITE_URL=https://tachi-suke.pages.dev pnpm check:deploy`
