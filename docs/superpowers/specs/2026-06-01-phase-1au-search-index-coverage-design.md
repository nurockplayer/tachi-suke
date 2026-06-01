# Phase 1AU Search Index Coverage Design

## Problem

Static search is now an important discovery surface because TachiSuke has grown beyond article pages into tools, places, mobile plans, and area guides. Existing checks verify the search index exists and has broad content types, but they do not lock coverage for the expanding tools collection.

## Scope

Add build-output tests that verify locale search indexes include representative public tools and exclude utility or placeholder routes.

## Non-Goals

- Do not change search ranking or UI.
- Do not add a hosted search service.
- Do not add typo tolerance, analytics, personalization, or backend search.

## Acceptance

- `pnpm check:seo` verifies English search index includes all current published tool routes.
- The same test continues to verify that account placeholders, search utility pages, and search index JSON endpoints are absent from search results.
- Documentation records that Phase 1 static search coverage now includes representative published tool checks.
