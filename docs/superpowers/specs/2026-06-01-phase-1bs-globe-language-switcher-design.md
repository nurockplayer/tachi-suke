# Phase 1BS Globe Language Switcher Design

## Goal

Make the collapsed language switcher recognizable even when visitors cannot read the current page language.

## Design Read

TachiSuke is for multilingual foreign residents and newcomers in Japan. The language control should not require understanding Japanese, Traditional Chinese, Korean, or English before the user can find the language menu.

## Scope

- Replace the closed locale switcher summary with a language-neutral globe icon.
- Keep the language switcher collapsed and separate from the theme switcher.
- Show a compact current-locale code next to the icon for orientation.
- Keep native language names inside the expanded menu.
- Preserve existing locale-prefixed routes and conservative alternate links.

## Non-Goals

- No route changes.
- No new icon dependency.
- No change to theme persistence or account placeholders.
- No auth, database, favorites, or backend submission work.

## Acceptance

- The closed language switcher does not rely on the current locale's native name.
- The closed language switcher exposes a globe icon and neutral `Change language` accessible label.
- `pnpm test`, `pnpm check:content`, `pnpm build`, `pnpm check:links`, and `pnpm check:seo` pass.
- Browser QA confirms the globe control is visible and opens the language menu on desktop and mobile.
