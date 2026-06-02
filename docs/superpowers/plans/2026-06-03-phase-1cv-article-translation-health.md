# Phase 1CV Article Translation Health Plan

## Startup Readback

- `cwd`: `<repo-root>`
- `branch`: `codex/phase-1cv-article-translation-health`
- `source_of_truth`: `AGENTS.md`, `docs/ai/autonomous-bootstrap.md`, and autonomous PR instructions
- `phase`: Phase 1-safe source quality gate
- `this_change_will_do`: add policy-driven source checks for public article translation groups
- `this_change_will_not_do`: add content, change routes, alter sitemap/search/RSS behavior, introduce machine translation, auth, database, or backend behavior

## Worker Routing

- `spark_worker_delegated`
- `delegated_work`: read-only repo/content-health scan for one small Phase 1-safe PR candidate
- `worker_output_summary`: worker identified scattered article translation completeness checks and suggested a maintainable translation group health rule
- `controller_review_summary`: accepted the direction after re-scanning current main; all public article translation groups are now complete across four locales
- `controller_followup_decisions`: implement one policy-driven content-health check, keep an empty partial-locale allowlist for future explicit exceptions, and update docs

## Tasks

- [x] Inventory current public article translation groups.
- [x] Add a failing source-level content-health test for unmanaged translation groups.
- [x] Fill the current fully localized translation-key policy and refactor old duplicate checks.
- [x] Update docs for Phase 1CV.
- [x] Run final validation.
