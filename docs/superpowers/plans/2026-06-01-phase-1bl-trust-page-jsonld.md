# Phase 1BL Trust Page JSON-LD Plan

## Routing

- `source_of_truth`: owner autonomous production-readiness request, existing Phase 1B/1BK JSON-LD conventions, and current `BaseLayout` JSON-LD support.
- `this_change_will_do`: add conservative page-level structured data to public trust and static form-entry pages.
- `this_change_will_not_do`: no visual redesign, route changes, backend, auth, favorites, database, provider-specific forms, or moderation tooling.
- `research_owner`: controller.
- `implementation_owner`: controller.
- `validation_owner`: controller.
- `controller_decisions`: use `WebPage` plus `BreadcrumbList`; avoid account placeholders because they are noindex.
- `controller_fallback_reason`: worker_unavailable.
- `planned_validation`: `pnpm test`, `pnpm check:content`, `pnpm build`, `pnpm check:links`, `pnpm check:seo`, `rtk git --no-optional-locks diff --check`, forbidden lockfile scan.

## Tasks

- [x] Add source and build-output tests for trust/form page JSON-LD.
- [x] Add `WebPage` and `BreadcrumbList` JSON-LD to About, Policy, Contact, and Submit Place pages.
- [x] Update docs.
- [x] Run validation.
- [ ] Commit, push, open PR, wait for checks, merge, and deploy Cloudflare Pages from main.

## Validation

- `pnpm install --frozen-lockfile`: passed.
- `pnpm test`: passed.
- `pnpm check:content`: passed.
- `pnpm build`: passed.
- `pnpm check:links`: passed.
- `pnpm check:seo`: passed.
- `rtk git --no-optional-locks diff --check`: passed.
- Forbidden lockfile scan: passed.
