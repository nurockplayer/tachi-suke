# Phase 1DG Public HTML JSON-LD Guard Plan

## Goal

Add a narrow build-output guard for parseable JSON-LD on public indexable HTML pages.

## Success Criteria

- Sitemap-derived public HTML pages are checked by `pnpm check:seo`.
- Each checked page includes at least one JSON-LD script.
- Each JSON-LD script parses successfully and does not contain exact `undefined` or `null` placeholder string values.
- No runtime feature, route, UI, auth, database, form, structured-data generation, or Cloudflare behavior changes are introduced.

## Current Context

- `BaseLayout` emits site-wide `Organization` and `WebSite` JSON-LD.
- Existing representative tests verify specific JSON-LD types on root, home, trust/form, collection, and detail pages.
- Noindex search pages, account placeholders, and `404.html` are intentionally excluded from `sitemap.xml`.

## Constraints

- Use pnpm only.
- Keep Phase 1 static-first.
- Do not add dependencies.
- Use `rtk` only for git and gh commands.

## Risks

- A sitemap-only sweep cannot catch an indexable page that should have been added to the sitemap but was not.
- This check validates syntax and obvious placeholder leakage, not Google rich result eligibility.
- Placeholder matching must stay exact to avoid rejecting valid descriptive copy.

## Work Packets

- Packet 1: Spark worker read-only scan of JSON-LD coverage and false-positive risks.
- Packet 2: Controller implementation of sitemap-derived JSON-LD parse checks.
- Packet 3: Controller documentation and validation.

## Worker Routing

- `spark_worker_delegated`
- `delegated_work`: inventory current JSON-LD emission, representative SEO tests, and sitemap/noindex false-positive risks.
- `worker_output_summary`: worker confirmed `BaseLayout` emits global JSON-LD on each page, representative JSON-LD tests already exist, and the missing guard is a sitemap-wide parse/placeholder sweep.
- `controller_review_summary`: accepted the recommendation to add a single sitemap-derived JSON-LD test.
- `controller_followup_decisions`: require at least one JSON-LD script, parse each script, and only fail exact string values equal to `undefined` or `null`.

## Tasks

- [x] Confirm main branch and open PR state.
- [x] Delegate first-pass JSON-LD coverage scan to Spark.
- [x] Add sitemap-derived JSON-LD parse and placeholder-value checks.
- [x] Update acceptance/status/roadmap docs.
- [x] Run validation.
- [ ] Open PR, address CI/review feedback, merge, and deploy if gates pass.
