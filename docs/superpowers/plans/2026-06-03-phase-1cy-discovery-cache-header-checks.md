# Phase 1CY Discovery Cache Header Checks Plan

## Startup Readback

- `cwd`: `/Users/tachikoma/Developer/tachi-suke`
- `branch`: `codex/phase-1cy-discovery-cache-header-checks`
- `source_of_truth`: `AGENTS.md`, `docs/ai/autonomous-bootstrap.md`, and autonomous PR instructions
- `phase`: Phase 1-safe static SEO/deployment quality gate
- `this_change_will_do`: make Cloudflare Pages discovery cache header checks data-driven and complete for current discovery endpoints
- `this_change_will_not_do`: change runtime output, Cloudflare behavior, routes, content, schemas, forms, auth, database, deployment configuration, or backend behavior

## Worker Routing

- `spark_worker_delegated`
- `delegated_work`: read-only repo scan for one narrow Phase 1-safe autonomous PR candidate
- `worker_output_summary`: worker found that `_headers` already defines one-hour cache rules for discovery endpoints, but `tests/seo-output.test.mjs` only checks a subset of them
- `controller_review_summary`: accepted the direction because discovery cache rules affect crawler-facing output and can be hardened through tests/docs only
- `controller_followup_decisions`: add a single discovery cache path list, assert exact per-block cache rules, and document the quality gate

## Tasks

- [x] Add data-driven discovery cache header checks.
- [x] Verify `pnpm check:seo` against the current build output.
- [x] Update docs for Phase 1CY.
- [x] Run final validation.
- [ ] Open PR, address review/CI feedback, merge, and deploy if gates pass.
