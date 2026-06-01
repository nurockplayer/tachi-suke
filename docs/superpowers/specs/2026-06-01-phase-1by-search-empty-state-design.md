# Phase 1BY Search Empty State Design

## Summary

Improve the static locale search page so a zero-result query gives the reader a clear recovery path instead of a dead-end message. This is Phase 1-safe: it does not add backend search, analytics, auth, personalization, or dependencies.

## Scope

- Keep `/[locale]/search` as a static `noindex, follow` utility page.
- Add localized empty-state helper copy.
- Add a clear-search button that resets the query, removes `q` from the URL, and restores all results.
- Make result type labels easier to scan as badges.
- Keep the existing search index format and public-content filtering.

## Non-Goals

- No backend search.
- No semantic search, typo tolerance, ranking engine, analytics, or saved search state.
- No Phase 2 auth, favorites, database, or personalization.

## UI Behavior

When the query matches no public content, the page shows:

- the existing localized empty headline,
- one short localized helper sentence,
- a localized clear-search button.

Clicking the clear button clears the input, updates the URL with no `q`, hides the empty state, and renders the full static result list again.

## Testing

- `tests/seo-output.test.mjs` should assert the built English search page includes the empty helper hook, clear-search button hook, badge class, and clear-query script behavior.
- `tests/project-structure.test.mjs` should keep source-level assertions for stable search hooks.
- Manual Browser QA should verify a nonsense query shows the empty state, the clear button restores results, and console errors remain zero.
