# Phase 1DI Public HTML Social Image Guard Plan

## Goal

Add a narrow build-output guard for public social image metadata.

## Success Criteria

- Every sitemap-derived public HTML page is checked for `og:image`, `og:image:alt`, `twitter:image`, and `twitter:card`.
- Social image URLs use the configured site origin and same-site image assets.
- `twitter:image` stays aligned with `og:image`.
- `twitter:card` stays `summary_large_image`.
- No runtime feature, route, UI, auth, database, form, Cloudflare runtime, or deployment behavior changes are introduced.

## Current Context

- `BaseLayout` centralizes default Open Graph and Twitter image metadata.
- Source-level tests check some social metadata hooks.
- Existing `pnpm check:seo` sweeps sitemap-derived public HTML pages for canonical/title/description/discovery/JSON-LD, but did not sweep social image metadata.

## Constraints

- Use pnpm only.
- Keep Phase 1 static-first.
- Do not add dependencies.
- Use `rtk` only for git and gh commands.

## Work Packets

- Packet 1: Spark worker read-only scan of existing social image metadata coverage.
- Packet 2: Controller implementation of sitemap-derived social image metadata checks.
- Packet 3: Controller documentation and validation.

## Worker Routing

- `spark_worker_delegated`
- `delegated_work`: inventory current `og:image`, `og:image:alt`, `twitter:image`, and `twitter:card` coverage across source and build-output tests.
- `worker_output_summary`: worker confirmed `BaseLayout` emits the metadata but `tests/seo-output.test.mjs` did not sweep social image fields across every sitemap-derived public HTML page.
- `controller_review_summary`: accepted the coverage gap and kept the implementation as a separate build-output test block.
- `controller_followup_decisions`: avoid hard-locking all pages to the default image so future same-site page-specific OG images remain possible.

## Tasks

- [x] Confirm main branch and open PR state.
- [x] Delegate first-pass social image metadata coverage scan to Spark.
- [x] Add sitemap-derived social image metadata checks.
- [x] Update acceptance/status/roadmap docs.
- [x] Run validation.
- [ ] Open PR, address CI/review feedback, merge, and deploy if gates pass.
