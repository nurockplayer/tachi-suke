# Phase 1DB Content-Driven RSS Check Plan

## Startup Readback

- `cwd`: `/Users/tachikoma/Developer/tachi-suke`
- `branch`: `codex/phase-1db-content-driven-rss-check`
- `source_of_truth`: `AGENTS.md`, `docs/ai/autonomous-bootstrap.md`, autonomous PR instructions, and existing RSS/feed acceptance criteria
- `phase`: Phase 1-safe static SEO quality-gate polish
- `this_change_will_do`: make RSS build-output checks derive expected feed item URLs from current non-draft article content
- `this_change_will_not_do`: change RSS runtime generation, routes, content, schemas, UI, auth, database, forms, Cloudflare configuration, Workers, Functions, or backend behavior

## Worker Routing

- `spark_worker_delegated`
- `delegated_work`: read-only scan of RSS generation and current SEO-output test gaps
- `worker_output_summary`: worker confirmed feeds are already content-driven but tests are sample-based and only partially cover locale feeds
- `controller_review_summary`: accepted the recommendation to replace hard-coded feed URL samples with collection-derived exact-set assertions
- `controller_followup_decisions`: avoid feed order assertions because same-date articles can make ordering unnecessarily brittle; update docs and run full static validation

## Tasks

- [x] Replace sample-based RSS URL checks with content-derived exact-set checks.
- [x] Document the Phase 1DB RSS test contract.
- [x] Run source and build-output validation.
- [ ] Open PR, address review/CI feedback, merge, and deploy if gates pass.
