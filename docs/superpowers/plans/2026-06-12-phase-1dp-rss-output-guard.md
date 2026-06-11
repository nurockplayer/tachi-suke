# Phase 1DP RSS Channel Metadata Guard Plan

## Startup Readback

- `cwd`: `/Users/tachikoma/Developer/tachi-suke`
- Base branch: `main`
- Feature branch: `codex/phase-1dp-rss-output-guard`
- Dirty state: main has an existing local `.gitignore` modification that is unrelated and must not be staged or reverted.
- Source of truth: user autonomous request, `AGENTS.md`, `docs/ai/autonomous-bootstrap.md`, and current Phase 1 static-first boundaries.
- Scope: strengthen build-output checks for existing global and locale RSS feeds.
- Non-goals: no runtime feed changes, no category/place/tool/mobile/area feeds, no pagination, no backend feed generation, no auth, no database, no Workers, no Functions.
- Phase: Phase 1-safe.

## Worker Routing

- `worker_result_insufficient`
- DeepSeek was used twice for candidate scope discovery, but both outputs suggested files or missing capabilities that do not match the actual Astro repo state.
- Controller verified the mismatch locally and selected a narrow RSS output guard scope from current source and test gaps.

## Tasks

- [x] Confirm current main and open PR state.
- [x] Create isolated worktree and verify baseline tests.
- [x] Inspect RSS feed routes, RSS helper, and existing SEO output checks.
- [x] Add RSS channel and item metadata output checks.
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
