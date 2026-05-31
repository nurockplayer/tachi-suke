# Phase 1W Content Health Check Plan

## Plan

- [x] Add failing structure expectations for the content health script and CI step.
- [x] Implement `tests/content-health.test.mjs`.
- [x] Add `check:content` to `package.json`.
- [x] Add `pnpm check:content` to GitHub Actions before build.
- [x] Update docs for the content health quality gate.
- [x] Run verification: `pnpm install`, `pnpm test`, `pnpm check:content`, `pnpm build`, `pnpm check:links`, `pnpm check:seo`.
- [ ] Open PR, wait for checks, and merge.
