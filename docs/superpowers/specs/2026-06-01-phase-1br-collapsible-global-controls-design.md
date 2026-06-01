# Phase 1BR Collapsible Global Controls Design

## Goal

Make the global language choices and theme choices easier to scan by collapsing them into two separate header controls: one for locale, one for appearance.

## Design Read

TachiSuke is a practical information site, so the header should stay calm and compact. The controls should feel like utility switches in a public information service, not like a settings dashboard.

## Scope

- Collapse locale choices behind a `details` / `summary` disclosure.
- Collapse `system`, `light`, and `dark` theme choices behind a separate disclosure.
- Keep both controls locale-aware.
- Show the current locale and active theme preference in the closed summary state.
- Close peer header controls when a new one opens, and close open controls on outside click or Escape.
- Preserve static-first Astro rendering and the existing i18n route structure.

## Non-Goals

- No route changes.
- No auth, favorites, Supabase, database, or submission backend work.
- No new runtime dependency, UI library, or design system migration.
- No replacement of the dark theme persistence model added in Phase 1BQ.

## Acceptance

- `pnpm test`, `pnpm check:content`, `pnpm build`, `pnpm check:links`, and `pnpm check:seo` pass.
- Browser QA confirms the language and theme controls open separately, close predictably, and work in desktop and mobile viewports.
- The active theme summary updates after selecting system, light, or dark.
