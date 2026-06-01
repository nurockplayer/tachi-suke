# Phase 1BO Emergency and Disaster Articles Plan

## Routing

- `source_of_truth`: Phase 1BN added a useful emergency/disaster checklist, but article/RSS/category/search discovery should also expose the topic.
- `this_change_will_do`: add four multilingual emergency/disaster basics articles and document the new content baseline.
- `this_change_will_not_do`: no auth, database, Supabase, alert subscriptions, saved checklist state, location tracking, emergency dispatch behavior, or UI redesign.
- `research_owner`: controller.
- `implementation_owner`: controller.
- `validation_owner`: controller.
- `controller_decisions`: use the existing `daily-life` category and article model because the topic fits everyday resident preparedness and does not need schema changes.
- `controller_fallback_reason`: worker_unavailable.
- `planned_validation`: `pnpm test`, `pnpm check:content`, `pnpm build`, `pnpm check:links`, `pnpm check:seo`, deploy-url build/check after merge, `rtk git --no-optional-locks diff --check`, forbidden lockfile scan.

## Tasks

- [x] Add failing source-level assertions for fifty articles and four-locale emergency/disaster slug coverage.
- [x] Add content-health translation-key coverage for `japan-emergency-disaster-basics`.
- [x] Add four localized emergency/disaster basics articles.
- [x] Update docs and roadmap to reflect Phase 1BO.
- [x] Run full local validation.
- [ ] Commit, push, open PR, wait for checks, merge, and deploy Cloudflare Pages from main.

## Validation

- `pnpm test`: passed after adding the four articles.
- `pnpm check:content`: passed after adding the four articles.
- `pnpm build`: passed.
- `pnpm check:links`: passed after normal build.
- `pnpm check:seo`: passed.
- `SITE_URL=https://tachi-suke.pages.dev pnpm build`: passed.
- `pnpm check:links`: passed after deploy-url build.
- `SITE_URL=https://tachi-suke.pages.dev pnpm check:deploy`: passed.
- `rtk git --no-optional-locks diff --check`: passed.
- Forbidden lockfile scan: passed.
