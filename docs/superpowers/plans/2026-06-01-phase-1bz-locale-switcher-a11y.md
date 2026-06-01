# Phase 1BZ Locale Switcher A11y Plan

## Scope

Localize the accessible labels for the global language switcher while preserving the globe-only collapsed trigger.

## Tasks

1. Add failing source-level assertions for localized switcher labels.
2. Add shared `getUiCopy` keys for language navigation and change-language text.
3. Update `LocaleSwitcher.astro` to consume the shared labels.
4. Validate with source tests, build, static link check, SEO output check, and a small browser/HTML smoke check.

## Non-goals

- No route changes.
- No visual redesign beyond preserving the existing globe-only trigger.
- No auth, database, Supabase, real favorites, or backend work.
