# Phase 1CM Localized Assistive Labels Design

## Goal

Move reusable layout assistive labels away from hard-coded English strings and into shared i18n UI copy.

## Scope

- Add shared UI copy keys for primary navigation, footer navigation, and article tag list labels.
- Reuse existing shared language-switcher labels from `getUiCopy`.
- Update Header, Footer, ArticleLayout, and LocaleSwitcher without changing visual layout or behavior.
- Add source-level regression checks for the shared copy usage.

## Non-Goals

- No route changes.
- No visual redesign.
- No theme toggle behavior changes.
- No account, auth, database, backend, or provider-specific form work.
- No broad copy rewrite.

## Acceptance

- `pnpm test` rejects hard-coded English `Primary`, `Footer`, and `Tags` aria labels in reusable layout components.
- Full validation passes before PR merge.
