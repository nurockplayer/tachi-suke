# Phase 1CM Localized Assistive Labels Plan

## AWP-lite Readback

- `source_of_truth`: user autonomous request, `AGENTS.md`, and `docs/ai/autonomous-bootstrap.md`.
- `this_change_will_do`: localize reusable assistive labels and add source-level regression tests.
- `this_change_will_not_do`: no visual redesign, route changes, theme behavior changes, backend, auth, database, or provider-specific form work.
- `research_owner`: Spark worker for read-only a11y/i18n scan; controller for final review.
- `implementation_owner`: controller.
- `validation_owner`: controller.

## Worker Routing

- `spark_worker_delegated`: read-only accessibility/i18n maintainability scan.
- `delegated_work`: identify a narrow Phase 1-safe assistive-label improvement.
- `worker_output_summary`: recommended moving Header, Footer, ArticleLayout, and LocaleSwitcher assistive labels to shared i18n copy.
- `controller_review_summary`: scope is small, static, and aligned with existing `getUiCopy` usage.
- `controller_followup_decisions`: implement only shared assistive-label copy and source-level tests.

## Checklist

- [x] Add failing source-level tests for shared assistive-label copy.
- [x] Add shared `getUiCopy` keys.
- [x] Update Header, Footer, ArticleLayout, and LocaleSwitcher.
- [x] Document Phase 1CM in project docs.
- [x] Run verification: `pnpm test`, `pnpm check:content`, `pnpm build`, `pnpm check:links`, `pnpm check:seo`.
