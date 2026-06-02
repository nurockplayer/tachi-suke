# Phase 1CZ Cache-Control Detach Plan

## Startup Readback

- `cwd`: `/Users/tachikoma/Developer/tachi-suke`
- `branch`: `codex/phase-1cz-cache-control-detach`
- `source_of_truth`: `AGENTS.md`, `docs/ai/autonomous-bootstrap.md`, autonomous PR instructions, and Cloudflare Pages `_headers` documentation
- `phase`: Phase 1-safe Cloudflare Pages static-header polish
- `this_change_will_do`: detach inherited global `Cache-Control` before setting specific cache policies in `_headers`
- `this_change_will_not_do`: change routes, generated HTML, UI, content, schemas, forms, auth, database, Workers, Functions, or backend behavior

## Worker Routing

- `spark_worker_delegated`
- `delegated_work`: read-only planning scan for the smallest Phase 1-safe fix to live duplicate `Cache-Control` responses
- `worker_output_summary`: worker recommended adding `! Cache-Control` to specific discovery cache blocks and testing the detach contract
- `controller_review_summary`: accepted the direction and expanded the scope to all specific cache blocks, including `/_astro/*` and `/images/*`, because they also inherit the global rule
- `controller_followup_decisions`: add RED detach assertions, update all specific cache blocks, and document Cloudflare header merge behavior

## Tasks

- [x] Add RED tests requiring `! Cache-Control` on specific cache blocks.
- [x] Add `! Cache-Control` to specific `_headers` cache blocks.
- [x] Verify `pnpm check:seo` turns green after rebuild.
- [x] Update docs for Phase 1CZ.
- [x] Run final validation.
- [ ] Open PR, address review/CI feedback, merge, and deploy if gates pass.
