# Phase 1CL Correction Related URL Coverage Plan

## AWP-lite Readback

- `source_of_truth`: user autonomous request, `AGENTS.md`, and `docs/ai/autonomous-bootstrap.md`.
- `this_change_will_do`: expand build-output SEO checks for correction prompt `relatedUrl` links and document the guard.
- `this_change_will_not_do`: no UI changes, route changes, backend, auth, database, analytics, tracking, or provider-specific form work.
- `research_owner`: Spark worker for read-only candidate scan; controller for final review.
- `implementation_owner`: controller.
- `validation_owner`: controller.

## Worker Routing

- `spark_worker_delegated`: read-only candidate scan.
- `delegated_work`: identify small Phase 1-safe PR candidates after PR #93.
- `worker_output_summary`: recommended extending correction `relatedUrl` coverage for detail pages.
- `controller_review_summary`: this is narrow, static, and protects the existing contact/corrections workflow.
- `controller_followup_decisions`: implement only SEO-output test coverage and docs.

## Checklist

- [x] Expand `tests/seo-output.test.mjs` coverage for representative detail correction prompt links.
- [x] Document Phase 1CL in project docs.
- [x] Run verification: `pnpm test`, `pnpm check:content`, `pnpm build`, `pnpm check:links`, `pnpm check:seo`.
