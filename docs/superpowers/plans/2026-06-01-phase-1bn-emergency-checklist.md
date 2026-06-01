# Phase 1BN Emergency and Disaster Checklist Plan

## Routing

- `source_of_truth`: product goal to make TachiSuke more useful for foreign residents' practical life in Japan before launch.
- `this_change_will_do`: add one source-aware static emergency/disaster checklist tool and document it.
- `this_change_will_not_do`: no auth, database, Supabase, saved state, emergency alerts, location tracking, backend dispatch, or UI redesign.
- `research_owner`: controller.
- `implementation_owner`: controller.
- `validation_owner`: controller.
- `controller_decisions`: use the existing `tools` model because it already supports localized checklists, source notes, official links, and last-checked dates.
- `controller_fallback_reason`: worker_unavailable.
- `planned_validation`: `pnpm test`, `pnpm check:content`, `pnpm build`, `pnpm check:links`, `pnpm check:seo`, deploy-url build/check after merge, `rtk git --no-optional-locks diff --check`, forbidden lockfile scan.

## Tasks

- [x] Add failing source-level assertions for a seventh published tool and official emergency/disaster sources.
- [x] Add `japan-emergency-disaster-checklist` content.
- [x] Update README and docs to reflect the new published tool.
- [x] Run full local validation.
- [ ] Commit, push, open PR, wait for checks, merge, and deploy Cloudflare Pages from main.

## Validation

- `pnpm test`: passed.
- `pnpm check:content`: passed.
- `pnpm build`: passed.
- `pnpm check:links`: passed after normal build.
- `pnpm check:seo`: passed after updating the tool index ItemList expected count to seven.
- `SITE_URL=https://tachi-suke.pages.dev pnpm build`: passed.
- `pnpm check:links`: passed after deploy-url build.
- `SITE_URL=https://tachi-suke.pages.dev pnpm check:deploy`: passed.
- `rtk git --no-optional-locks diff --check`: passed.
- Forbidden lockfile scan: passed.
