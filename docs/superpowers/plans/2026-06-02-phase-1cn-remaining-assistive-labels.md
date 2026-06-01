# Phase 1CN Remaining Assistive Labels Plan

## Routing

- `source_of_truth`: owner autonomous production-readiness request, `AGENTS.md`, and `docs/ai/autonomous-bootstrap.md`.
- `this_change_will_do`: localize article category-list and place fact-list assistive labels through shared `getUiCopy`.
- `this_change_will_not_do`: change visible UI, route structure, content models, search behavior, account placeholders, auth, database, or submission behavior.
- `research_owner`: Spark 5.3 worker for read-only candidate scan.
- `implementation_owner`: controller.
- `validation_owner`: controller.

## Checklist

- [x] Add failing source-level tests for remaining hard-coded English assistive labels.
- [x] Add shared i18n keys for article category-list and place fact-list labels.
- [x] Update `ArticlesIndexPage` and `PlaceCard` to use shared UI copy.
- [x] Document Phase 1CN scope and acceptance.
- [x] Run validation: `pnpm test`, `pnpm check:content`, `pnpm build`, `pnpm check:links`, `pnpm check:seo`.
