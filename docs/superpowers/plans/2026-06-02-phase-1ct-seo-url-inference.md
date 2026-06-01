# Phase 1CT SEO Check URL Inference Plan

## Startup Readback

- `cwd`: `/Users/tachikoma/Developer/tachi-suke`
- `branch`: `codex/phase-1ct-seo-url-inference`
- `source_of_truth`: `AGENTS.md`, `docs/ai/autonomous-bootstrap.md`, and autonomous PR instructions
- `phase`: Phase 1-safe maintenance
- `this_change_will_do`: make `pnpm check:seo` infer the current build output origin when `SITE_URL` is unset
- `this_change_will_not_do`: change runtime URL generation, deployment domains, routes, auth, database, real submissions, or moderation

## Worker Routing

- `spark_worker_delegated`
- `delegated_work`: read-only scan for one small Phase 1-safe PR candidate
- `worker_output_summary`: Spark found that `tests/seo-output.test.mjs` assumes the fallback example domain when `SITE_URL` is unset, which can fail against a production-URL `dist/`
- `controller_review_summary`: accepted the narrow maintenance goal and kept deploy checks strict
- `controller_followup_decisions`: implement URL inference only in SEO output tests, then document local-vs-deploy verification behavior

## Tasks

- [x] Add a failing SEO output test for inferred build-origin behavior.
- [x] Infer `expectedSiteUrl` from built sitemap or robots output when `SITE_URL` is unset.
- [x] Keep explicit `SITE_URL` behavior unchanged.
- [x] Update README and docs.
- [x] Run final validation.
- [ ] Open PR, wait for checks, merge if clean, and deploy main.
