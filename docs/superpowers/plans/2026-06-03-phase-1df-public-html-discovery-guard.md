# Phase 1DF Public HTML Discovery Link Guard Plan

## Goal

Add a narrow build-output guard for shared discovery links on public indexable HTML pages.

## Success Criteria

- Sitemap-derived public HTML pages are checked by `pnpm check:seo`.
- Each checked page links the favicon, web manifest, OpenSearch description, global RSS feed, and current-locale RSS feed.
- No runtime feature, route, UI, auth, database, form, or Cloudflare behavior changes are introduced.

## Current Context

- `BaseLayout` emits the relevant discovery links.
- Phase 1DC/1DD/1DE already provide sitemap-derived public HTML page helpers in `tests/seo-output.test.mjs`.
- Noindex search pages, account placeholders, and `404.html` are intentionally excluded from `sitemap.xml`.

## Constraints

- Use pnpm only.
- Keep Phase 1 static-first.
- Do not add dependencies.
- Use `rtk` only for git and gh commands.

## Risks

- A sitemap-only sweep cannot catch an indexable page that should have been added to the sitemap but was not.
- This check verifies link presence and expected static targets; it does not validate feed reader behavior or external crawler behavior.

## Work Packets

- Packet 1: Spark worker read-only scan of discovery metadata coverage and test gaps.
- Packet 2: Controller implementation of sitemap-derived discovery link checks.
- Packet 3: Controller documentation and validation.

## Worker Routing

- `spark_worker_delegated`
- `delegated_work`: inventory current BaseLayout discovery links, existing SEO tests, and false-positive risks for account/search/404 pages.
- `worker_output_summary`: worker confirmed BaseLayout emits favicon, manifest, OpenSearch, global RSS, and locale RSS links, while `check:seo` only verified selected root/output cases and did not sweep every sitemap HTML page.
- `controller_review_summary`: accepted the recommendation to add a sibling sitemap-derived discovery test.
- `controller_followup_decisions`: keep the guard limited to sitemap HTML pages, map root `/` to English fallback locale RSS, and avoid runtime or route changes.

## Tasks

- [x] Confirm main branch and open PR state.
- [x] Delegate first-pass discovery metadata scan to Spark.
- [x] Add sitemap-derived HTML discovery link checks.
- [x] Update acceptance/status/roadmap docs.
- [x] Run validation.
- [ ] Open PR, address CI/review feedback, merge, and deploy if gates pass.
