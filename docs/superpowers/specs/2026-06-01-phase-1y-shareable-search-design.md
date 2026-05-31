# Phase 1Y Shareable Search Design

## Objective

Make static search results shareable by supporting locale search URLs with a `q` query parameter, such as `/en/search?q=Denny`.

## Scope

- Search pages remain static and noindex.
- Search still uses the generated locale JSON index.
- The search input reads the initial `q` parameter on page load.
- Typing updates filtered results and keeps the URL query in sync with `history.replaceState`.
- The search panel becomes a normal GET form so it still works predictably without custom backend logic.

## Non-goals

- No backend search.
- No database.
- No hosted search service.
- No typo tolerance, semantic ranking, personalization, or analytics.
- No sitemap inclusion for search pages.

## UX Rules

- Existing instant filtering remains.
- Pressing Enter or the submit button should keep the user on the same locale search route with `q=...`.
- Empty search clears the `q` parameter.
- Search pages remain browsable without JavaScript by showing all public entries.

## Acceptance

- Source tests verify query string support, GET form behavior, and URL syncing logic.
- Build-output SEO tests verify representative generated HTML includes the GET search form and query-aware script hooks.
- Existing source, content, build, link, and SEO checks pass.
