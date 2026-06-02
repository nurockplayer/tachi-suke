# Phase 1DD Public HTML Title and Description Guard Plan

## Goal

Add a narrow build-output guard for title and description metadata on public indexable HTML pages.

## Success Criteria

- Sitemap-derived public HTML pages are checked by `pnpm check:seo`.
- Each checked page must have a non-empty title, meta description, Open Graph title/description, and Twitter title/description.
- Social title/description metadata must match the regular page title/description.
- No runtime feature, route, UI, auth, database, form, or Cloudflare behavior changes are introduced.

## Current Context

- `BaseLayout` emits title, description, Open Graph, and Twitter metadata.
- Phase 1DC already provides sitemap-derived public HTML page helpers in `tests/seo-output.test.mjs`.
- Noindex search pages, account placeholders, and `404.html` are intentionally excluded from `sitemap.xml`.

## Constraints

- Use pnpm only.
- Keep Phase 1 static-first.
- Do not add dependencies.
- Use `rtk` only for git and gh commands.

## Risks

- A sitemap-only sweep cannot catch an indexable page that should have been added to the sitemap but was not.
- Multilingual descriptions have different natural lengths, so the guard should avoid English-centric length thresholds.

## Work Packets

- Packet 1: Spark worker read-only scan of SEO tests, BaseLayout metadata, and title/description exclusion risks.
- Packet 2: Controller implementation of sitemap-derived title/description metadata checks.
- Packet 3: Controller documentation and validation.

## Worker Routing

- `spark_worker_delegated`
- `delegated_work`: scan current SEO-output tests and layout metadata for an all-public-page title/description gap.
- `worker_output_summary`: worker confirmed Phase 1DC covers canonical / `og:url`, while `BaseLayout` emits title/description/social metadata that is not yet swept across sitemap HTML pages.
- `controller_review_summary`: accepted the recommendation to add title, description, Open Graph, and Twitter metadata assertions to the sitemap-derived HTML guard.
- `controller_followup_decisions`: avoid English-centric description length thresholds; check non-empty values and regular/social metadata alignment only.

## Tasks

- [x] Confirm main branch and open PR state.
- [x] Delegate first-pass SEO guard scan to Spark.
- [x] Add sitemap-derived title / description build-output checks.
- [x] Update acceptance/status/roadmap docs.
- [x] Run validation.
- [ ] Open PR, address CI/review feedback, merge, and deploy if gates pass.
