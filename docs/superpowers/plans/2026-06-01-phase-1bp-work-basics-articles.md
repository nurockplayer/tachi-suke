# Phase 1BP Work Contract Basics Articles Plan

## Routing

- `source_of_truth`: TachiSuke's product scope includes job hunting and working in Japan, but the static article surface did not yet cover work basics.
- `this_change_will_do`: add a localized work category and four work contract basics articles.
- `this_change_will_not_do`: no legal advice, immigration advice, tax advice, job board, employer reviews, backend storage, auth, database, Supabase, or UI redesign.
- `research_owner`: controller.
- `implementation_owner`: controller.
- `validation_owner`: controller.
- `controller_decisions`: keep work content in articles rather than a tool because the first need is SEO-readable decision guidance, not interactive state.
- `controller_fallback_reason`: worker_unavailable.
- `planned_validation`: `pnpm test`, `pnpm check:content`, `pnpm build`, `pnpm check:links`, `pnpm check:seo`, deploy-url build/check after merge, `rtk git --no-optional-locks diff --check`, forbidden lockfile scan.

## Tasks

- [x] Add failing source-level assertions for fifty-four articles, work category copy, and four-locale work article slug coverage.
- [x] Add content-health translation-key coverage for `japan-work-contract-basics`.
- [x] Add localized `work` category copy.
- [x] Add four localized work contract basics articles.
- [x] Update docs and roadmap to reflect Phase 1BP.
- [x] Run full local validation.
- [ ] Commit, push, open PR, wait for checks, merge, and deploy Cloudflare Pages from main.

## Validation

- `pnpm test`: passed after adding category copy and four articles.
- `pnpm check:content`: passed after adding category copy and four articles.
- `pnpm build`: passed.
- `pnpm check:links`: passed after normal build.
- `pnpm check:seo`: passed, including work category output coverage.
- `SITE_URL=https://tachi-suke.pages.dev pnpm build`: passed.
- `pnpm check:links`: passed after deploy-url build.
- `SITE_URL=https://tachi-suke.pages.dev pnpm check:deploy`: passed.
- `rtk git --no-optional-locks diff --check`: passed.
- Forbidden lockfile scan: passed.
