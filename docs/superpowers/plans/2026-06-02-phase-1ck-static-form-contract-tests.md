# Phase 1CK Static Form Contract Tests Plan

## AWP-lite Readback

- `source_of_truth`: user autonomous request, `AGENTS.md`, and `docs/ai/autonomous-bootstrap.md`.
- `this_change_will_do`: add a focused form contract test suite and document the quality gate.
- `this_change_will_not_do`: no backend, auth, database, provider-specific integration, captcha, UI redesign, or route changes.
- `research_owner`: Spark worker for candidate scan; controller for final review.
- `implementation_owner`: controller.
- `validation_owner`: controller.

## Worker Routing

- `spark_worker_delegated`: read-only candidate scan.
- `delegated_work`: identify small Phase 1-safe PR candidates.
- `worker_output_summary`: recommended static form contract tests among other quality candidates.
- `controller_review_summary`: form contract tests are narrow, high-signal, and do not alter runtime behavior.
- `controller_followup_decisions`: implement only the contract-test scope.

## Checklist

- [x] Add `tests/form-contract.test.mjs`.
- [x] Update `pnpm test` to run form contract tests.
- [x] Document Phase 1CK in project docs.
- [x] Run verification: `pnpm test`, `pnpm check:content`, `pnpm build`, `pnpm check:links`, `pnpm check:seo`.
