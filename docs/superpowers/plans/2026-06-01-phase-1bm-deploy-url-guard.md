# Phase 1BM Deploy URL Guard Plan

## Routing

- `source_of_truth`: Cloudflare deployment evidence showing fallback example-domain canonical output on the first manual deploy.
- `this_change_will_do`: add a deployment-only guard for generated `dist` URL correctness.
- `this_change_will_not_do`: no runtime features, provider-specific forms, auth, database, or Cloudflare secrets.
- `research_owner`: controller.
- `implementation_owner`: controller.
- `validation_owner`: controller.
- `controller_decisions`: keep CI using example-domain SEO checks, but add an explicit production deploy check that requires `SITE_URL`.
- `controller_fallback_reason`: worker_unavailable.
- `planned_validation`: `pnpm test`, `pnpm check:content`, `SITE_URL=https://tachi-suke.pages.dev pnpm build`, `pnpm check:links`, `SITE_URL=https://tachi-suke.pages.dev pnpm check:deploy`, `rtk git --no-optional-locks diff --check`, forbidden lockfile scan.

## Tasks

- [x] Add source-level test expectation for `check:deploy`.
- [x] Add deployment output guard script.
- [x] Update deployment docs.
- [x] Run validation.
- [ ] Commit, push, open PR, wait for checks, merge, and redeploy Cloudflare Pages from main.

## Validation

- `pnpm test`: passed.
- `pnpm check:content`: passed.
- `pnpm build`: passed.
- `pnpm check:links`: passed after normal build.
- `pnpm check:seo`: passed after normal build.
- `SITE_URL=https://tachi-suke.pages.dev pnpm build`: passed.
- `pnpm check:links`: passed after deploy-url build.
- `SITE_URL=https://tachi-suke.pages.dev pnpm check:deploy`: passed.
- `rtk git --no-optional-locks diff --check`: passed.
- Forbidden lockfile scan: passed.
