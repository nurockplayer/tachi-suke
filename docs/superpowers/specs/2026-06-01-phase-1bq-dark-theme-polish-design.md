# Phase 1BQ Dark Theme and Visual Polish Design

## Goal

Add a production-ready dark theme to TachiSuke without changing routes, adding dependencies, or weakening the static-first architecture.

## Design Read

TachiSuke is a content-heavy Japan life information site for foreign residents. The theme should feel calm, readable, and trustworthy, not like a generic dark-tech landing page.

## Scope

- Add system, light, and dark theme modes.
- Add a locale-aware header switcher.
- Persist the selected preference in `localStorage`.
- Initialize the chosen theme before first paint.
- Keep a no-JavaScript system dark mode fallback through `prefers-color-scheme`.
- Convert global light-only surfaces into shared theme tokens.
- Keep long article reading, cards, forms, search, and utility panels comfortable in dark mode.

## Non-Goals

- No auth, favorites, database, Supabase, or submission backend work.
- No route changes.
- No new component library or animation dependency.
- No full visual regression suite in this phase.

## Acceptance

- `pnpm test`, `pnpm check:content`, `pnpm build`, `pnpm check:links`, and `pnpm check:seo` pass.
- Browser QA checks representative home, article, search, and form pages in light and dark mode.
- Built HTML keeps valid internal links and SEO metadata.
