# Phase 1DA Deploy Discovery URL Guard Plan

## Startup Readback

- `cwd`: `/Users/tachikoma/Developer/tachi-suke`
- `branch`: `codex/phase-1da-deploy-discovery-url-guard`
- `source_of_truth`: `AGENTS.md`, `docs/ai/autonomous-bootstrap.md`, autonomous PR instructions, and current deploy-output checks
- `phase`: Phase 1-safe deployment quality-gate polish
- `this_change_will_do`: expand `pnpm check:deploy` so production-URL builds prove key discovery and representative HTML files contain the configured `SITE_URL`
- `this_change_will_not_do`: change generated routes, runtime SEO behavior, Cloudflare headers, UI, content, forms, auth, database, Workers, Functions, or backend behavior

## Worker Routing

- `spark_worker_delegated`
- `delegated_work`: read-only scan for the smallest high-impact deployment guard improvement after Phase 1CZ
- `worker_output_summary`: worker recommended expanding `tests/deploy-output.test.mjs` to cover more public discovery outputs and documenting the distinction from local SEO checks
- `controller_review_summary`: accepted the deploy-guard direction but narrowed the absolute URL requirement to files that should contain production absolute URLs
- `controller_followup_decisions`: exclude relative-only artifacts such as `site.webmanifest` and search indexes, update docs, and run the production-URL validation chain before PR

## Tasks

- [x] Expand `check:deploy` required production URL coverage.
- [x] Document the Phase 1DA deploy guard contract.
- [x] Run source and build-output validation.
- [ ] Open PR, address review/CI feedback, merge, and deploy if gates pass.
