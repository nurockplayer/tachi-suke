# Phase 1CB Search Index Public Health Design

## Goal

Ensure generated static search indexes expose only intended public content.

## Problem

Search index JSON is a public discovery surface. If future content or route changes accidentally add draft, placeholder, form, trust, account, or non-published collection entries, users and search-adjacent tooling could discover surfaces that should stay out of public search.

## Decision

- Add build-output tests for every locale search index JSON file.
- Compare generated search entries against source content visibility rules.
- Treat only these content routes as valid search targets:
  - matching-locale non-draft articles
  - published places
  - current mobile plan details
  - current area guide details
  - published tools
- Reject account, contact, editorial policy, privacy, search, site-map, and submit-place routes in search index items.

## Acceptance

- `pnpm check:seo` verifies all four locale search indexes.
- Search index `count` matches item length.
- Search entry IDs are unique and type-prefixed.
- Every generated URL belongs to the active locale and a known public content route.
- Every expected public content route appears exactly once.
