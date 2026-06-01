# Phase 1CE Compact Theme Toggle Design

## Goal

Keep the global header understandable and compact after the language menu moved to a globe-only collapsed control.

## Design Read

TachiSuke serves people who may not understand the page language yet. The language switcher must stay visually language-neutral in the closed state, and the neighboring theme control should not compete with it by occupying too much header width.

## Scope

- Keep the collapsed language switcher as a globe icon-only control with localized accessible labels.
- Change the collapsed theme switcher from a long localized label plus state to a compact icon plus short state.
- Keep the full localized system/light/dark labels inside the expanded theme menu.
- Preserve the native `details` disclosure behavior and existing localStorage theme persistence.

## Non-Goals

- No new dependency or icon package.
- No route changes.
- No redesign of navigation, homepage content, account placeholders, auth, database, favorites, or submission storage.

## Acceptance

- The collapsed language switcher trigger includes the globe icon and does not show the current locale name or locale code.
- The collapsed theme switcher trigger includes an icon, a short current state, and a localized non-visual label.
- The expanded theme menu still exposes localized system/light/dark choices with pressed state.
- `pnpm test`, `pnpm check:content`, `pnpm build`, `pnpm check:links`, `pnpm check:seo`, and production-URL SEO/deploy checks pass.
- Browser QA confirms the language and theme disclosures are visible, openable, and non-overlapping on desktop and mobile.
