# Phase 1DH Noindex Utility Page Guard Plan

## Goal

Add a narrow build-output guard for noindex utility pages and sitemap exclusion.

## Success Criteria

- Account placeholder, search, search-index, and 404 utility paths are checked by `pnpm check:seo`.
- Account placeholder pages are verified as built `noindex, nofollow`.
- Search pages are verified as built `noindex, follow`.
- Utility pages and search index JSON endpoints remain excluded from `sitemap.xml`.
- No runtime feature, route, UI, auth, database, form, robots generation, or Cloudflare behavior changes are introduced.

## Current Context

- Account placeholder pages are static and intentionally non-functional.
- Search pages are static utility pages backed by public search index JSON.
- `404.html` is static, noindex, and already has a detailed recovery-page test.
- Existing sitemap checks derive public paths from content collections but only sampled some utility exclusions.

## Constraints

- Use pnpm only.
- Keep Phase 1 static-first.
- Do not add dependencies.
- Use `rtk` only for git and gh commands.

## Risks

- A build-output noindex guard must run after `pnpm build`.
- If future route names change, this helper should be updated alongside the route change.
- Search index JSON endpoints are not HTML and should be checked only for sitemap exclusion, not robots metadata.

## Work Packets

- Packet 1: Spark worker read-only scan of noindex/sitemap coverage and false-positive risks.
- Packet 2: Controller implementation of utility noindex and sitemap exclusion checks.
- Packet 3: Controller documentation and validation.

## Worker Routing

- `spark_worker_delegated`
- `delegated_work`: inventory current account/search/404 noindex behavior, sitemap exclusions, and build-output coverage gaps.
- `worker_output_summary`: worker confirmed search and 404 have build-output noindex coverage, account placeholders were mostly source-level, and sitemap exclusions should cover all utility paths.
- `controller_review_summary`: accepted the recommendation to add one utility noindex/sitemap sweep.
- `controller_followup_decisions`: keep the 404 detailed test intact, add account and search robots meta checks, and exclude search index JSON endpoints only through sitemap assertions.

## Tasks

- [x] Confirm main branch and open PR state.
- [x] Delegate first-pass noindex coverage scan to Spark.
- [x] Add utility sitemap exclusion and noindex checks.
- [x] Update acceptance/status/roadmap docs.
- [x] Run validation.
- [ ] Open PR, address CI/review feedback, merge, and deploy if gates pass.
