# Phase 1DJ Public HTML Hreflang Head Guard Plan

## Goal

Add a narrow build-output guard for public HTML head `hreflang` links.

## Success Criteria

- Every sitemap-derived public HTML page is checked for head `hreflang` alternates.
- Head `hreflang` values are supported BCP47 locale values or `x-default`.
- Duplicate head `hreflang` values are rejected.
- Head `hreflang` URLs use the configured site origin, avoid query strings/hashes, and point only at public sitemap HTML pages.
- No runtime feature, route, UI, auth, database, form, Cloudflare runtime, or deployment behavior changes are introduced.

## Current Context

- `BaseLayout` centralizes canonical and head alternate links.
- Article detail pages can pass conservative `alternatePaths` so missing translations are not advertised.
- Existing `pnpm check:seo` checks representative sitemap `xhtml:link` alternates but did not sweep every public HTML page's head alternates against the sitemap.

## Constraints

- Use pnpm only.
- Keep Phase 1 static-first.
- Do not add dependencies.
- Use `rtk` only for git and gh commands.

## Work Packets

- Packet 1: Spark worker read-only scan of existing head/sitemap hreflang coverage.
- Packet 2: Controller implementation of sitemap-derived head hreflang checks.
- Packet 3: Controller documentation and validation.

## Worker Routing

- `spark_worker_delegated`
- `delegated_work`: inventory current head `hreflang` coverage, sitemap alternate coverage, and false-positive risks.
- `worker_output_summary`: worker confirmed all current sitemap-derived HTML pages emit head `hreflang` links and current links point at sitemap paths, while no all-page head alternate sweep existed.
- `controller_review_summary`: add a conservative build-output guard that validates emitted links only, without requiring missing translations.
- `controller_followup_decisions`: keep runtime i18n untouched because the guard did not expose a broken alternate.

## Tasks

- [x] Confirm main branch and open PR state.
- [x] Delegate first-pass hreflang coverage scan to Spark.
- [x] Add sitemap-derived head hreflang checks.
- [x] Update acceptance/status/roadmap docs.
- [x] Run validation.
- [ ] Open PR, address CI/review feedback, merge, and deploy if gates pass.
