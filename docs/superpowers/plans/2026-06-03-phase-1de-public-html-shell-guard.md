# Phase 1DE Public HTML Shell Guard Plan

## Goal

Add a narrow build-output guard for language metadata, viewport metadata, and baseline accessibility shell hooks on public indexable HTML pages.

## Success Criteria

- Sitemap-derived public HTML pages are checked by `pnpm check:seo`.
- Each checked page has expected `<html lang>`, viewport metadata, a skip link to `#main-content`, and `<main id="main-content">`.
- No runtime feature, route, UI, auth, database, form, or Cloudflare behavior changes are introduced.

## Current Context

- `BaseLayout` emits the relevant shell metadata and landmarks.
- Phase 1DC/1DD already provide sitemap-derived public HTML page helpers in `tests/seo-output.test.mjs`.
- Noindex search pages, account placeholders, and `404.html` are intentionally excluded from `sitemap.xml`.

## Constraints

- Use pnpm only.
- Keep Phase 1 static-first.
- Do not add dependencies.
- Use `rtk` only for git and gh commands.

## Risks

- A sitemap-only sweep cannot catch an indexable page that should have been added to the sitemap but was not.
- This is only a baseline shell guard; it is not a complete accessibility audit.

## Work Packets

- Packet 1: Spark worker read-only scan of SEO tests, BaseLayout shell metadata, and exclusion risks.
- Packet 2: Controller implementation of sitemap-derived shell metadata checks.
- Packet 3: Controller documentation and validation.

## Worker Routing

- `spark_worker_delegated`
- `delegated_work`: scan current SEO-output tests and layout shell metadata for an all-public-page language / viewport / landmark gap.
- `worker_output_summary`: worker confirmed `BaseLayout` already emits document language, viewport, skip link, and main landmark, while `check:seo` did not sweep those shell hooks across sitemap HTML pages.
- `controller_review_summary`: accepted the recommendation to add a sibling sitemap-derived shell metadata test.
- `controller_followup_decisions`: map root `/` to the English fallback language, map locale-prefixed routes to shared BCP47 values, and keep noindex pages outside the sitemap-derived guard.

## Tasks

- [x] Confirm main branch and open PR state.
- [x] Delegate first-pass SEO shell guard scan to Spark.
- [x] Add sitemap-derived HTML shell checks.
- [x] Update acceptance/status/roadmap docs.
- [x] Run validation.
- [ ] Open PR, address CI/review feedback, merge, and deploy if gates pass.
