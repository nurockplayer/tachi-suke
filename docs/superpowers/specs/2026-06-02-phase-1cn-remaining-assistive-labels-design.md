# Phase 1CN Remaining Assistive Labels Design

## Objective

Remove the next small set of hard-coded English assistive labels from public content surfaces so screen-reader copy follows the same locale strategy as the rest of the static site.

## Scope

- Add shared `getUiCopy` keys for article category-list and place fact-list assistive labels.
- Use those keys in the articles index and reusable place card.
- Add source-level tests that reject hard-coded English `aria-label` values for these surfaces.

## Non-goals

- No visual redesign.
- No route, content model, search, theme, account, auth, database, or submission behavior changes.
- No new dependency.

## Acceptance

- `ArticlesIndexPage` uses `getUiCopy(locale, "layout.articleCategories")`.
- `PlaceCard` uses `getUiCopy(locale, "layout.placeFacts")`.
- `pnpm test` prevents `aria-label="Article categories"` and `aria-label="Place facts"` from returning.
- Existing build, content, link, and SEO checks continue to pass.
