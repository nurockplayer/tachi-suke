# Phase 1DC Public HTML Head SEO Guard Plan

## Goal

Add a narrow build-output guard for canonical and Open Graph URL metadata on public indexable HTML pages.

## Success Criteria

- Sitemap-derived public HTML pages are checked by `pnpm check:seo`.
- Each checked page must have canonical and `og:url` metadata equal to the expected absolute URL.
- No runtime feature, route, UI, auth, database, form, or Cloudflare behavior changes are introduced.

## Current Context

- `BaseLayout` emits canonical and `og:url`.
- `tests/seo-output.test.mjs` already infers the build origin from `SITE_URL`, `sitemap.xml`, or `robots.txt`.
- Search, account placeholder, and 404 pages are noindex and intentionally excluded from `sitemap.xml`.

## Constraints

- Use pnpm only.
- Keep Phase 1 static-first.
- Do not add dependencies.
- Use `rtk` only for git and gh commands.

## Risks

- A sitemap-only sweep cannot catch an indexable page that should have been added to the sitemap but was not.
- A future intentionally indexable non-HTML discovery route must stay outside this check.

## Work Packets

- Packet 1: Spark worker read-only scan of SEO tests, layout metadata, and exclusion risks.
- Packet 2: Controller implementation of sitemap-derived HTML head metadata checks.
- Packet 3: Controller documentation and validation.

## Worker Routing

- `spark_worker_delegated`
- `delegated_work`: scan current SEO-output tests and layout metadata for an all-public-page canonical / `og:url` gap.
- `worker_output_summary`: worker confirmed `BaseLayout` outputs both fields but `check:seo` lacks a full indexable HTML sweep.
- `controller_review_summary`: accepted sitemap-derived checking as the narrowest useful guard.
- `controller_followup_decisions`: do not scan noindex pages; do not change runtime code unless validation exposes a real defect.

## Tasks

- [x] Confirm main branch and open PR state.
- [x] Delegate first-pass SEO guard scan to Spark.
- [x] Add sitemap-derived canonical / `og:url` build-output checks.
- [x] Update acceptance/status/roadmap docs.
- [x] Run validation.
- [ ] Open PR, address CI/review feedback, merge, and deploy if gates pass.
