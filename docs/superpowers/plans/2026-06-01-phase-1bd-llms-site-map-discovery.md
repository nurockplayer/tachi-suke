# Phase 1BD LLM Site Map Discovery Plan

## Routing

- `source_of_truth`: owner autonomous production-readiness request, existing `/llms.txt`, and Phase 1BB site map route.
- `this_change_will_do`: add public site map links to `/llms.txt`, tests, and docs.
- `this_change_will_not_do`: no AI runtime, backend, crawling, analytics, private data, or route changes.
- `research_owner`: controller.
- `implementation_owner`: controller.
- `validation_owner`: controller.
- `controller_decisions`: keep `/llms.txt` concise by listing locale site maps under machine-readable/public discovery.
- `controller_fallback_reason`: worker_unavailable.
- `planned_validation`: `pnpm test`, `pnpm build`, `pnpm check:links`, `pnpm check:seo`.

## Tasks

- [x] Add failing source and build-output tests for site map links in `llms.txt`.
- [x] Update `src/pages/llms.txt.ts`.
- [x] Update README/docs/AGENTS where discovery surfaces are documented.
- [x] Run validation.
- [ ] Commit, push, open PR, wait for checks, and merge.

## Validation Results

- `pnpm test`: passed
- `pnpm check:content`: passed
- `pnpm build`: passed
- `pnpm check:links`: passed
- `pnpm check:seo`: passed
- Forbidden lockfile scan: passed
- `git diff --check`: passed
