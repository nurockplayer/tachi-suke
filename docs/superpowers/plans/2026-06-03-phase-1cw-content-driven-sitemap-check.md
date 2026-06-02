# Phase 1CW Content-Driven Sitemap Check Plan

## Startup Readback

- `cwd`: `/Users/tachikoma/Developer/tachi-suke`
- `branch`: `codex/phase-1cw-content-driven-sitemap-check`
- `source_of_truth`: `AGENTS.md`, `docs/ai/autonomous-bootstrap.md`, and autonomous PR instructions
- `phase`: Phase 1-safe static SEO quality gate
- `this_change_will_do`: make sitemap SEO output checks derive public content paths from content collections
- `this_change_will_not_do`: change sitemap generation, routes, auth, database, forms, deployment configuration, or runtime behavior

## Worker Routing

- `spark_worker_delegated`
- `delegated_work`: read-only repo scan for one narrow Phase 1-safe autonomous PR candidate
- `worker_output_summary`: worker found that `tests/seo-output.test.mjs` still uses a long hand-maintained sitemap path sample, making new content easier to miss
- `controller_review_summary`: accepted the direction after confirming the change can stay within tests/docs and current sitemap generation already uses content collections
- `controller_followup_decisions`: add a content-driven expected path helper, keep existing exclusion checks, and document the new gate

## Tasks

- [x] Add a RED test path requiring content-driven sitemap expectations.
- [x] Implement the content-driven sitemap expected path helper.
- [x] Update docs for Phase 1CW.
- [x] Run final validation.
- [ ] Open PR, address review/CI feedback, merge, and deploy if gates pass.
