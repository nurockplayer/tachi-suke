# Phase 1BZ Locale Switcher A11y Design

## Goal

Keep the collapsed language switcher understandable without relying on the current locale, and make its assistive-technology labels match the active UI locale.

## Problem

The visual control was already language-neutral by using a globe icon, but the navigation label, summary label, title, and visually hidden label were hard-coded in English. This created an inconsistent experience for `zh-tw`, `ja`, and `ko` users.

## Decision

- Keep the collapsed control icon-only and language-neutral.
- Add shared UI copy keys for the language navigation landmark and change-language action.
- Use those shared keys in `LocaleSwitcher.astro` for `aria-label`, `title`, and visually hidden text.
- Do not show current locale shorthand in the collapsed trigger.

## Acceptance

- The collapsed language switcher still exposes the globe icon.
- The collapsed trigger does not show `Lang`, locale code, or current locale native name.
- The switcher uses shared i18n copy for the nav label and trigger label.
- `pnpm test`, `pnpm build`, `pnpm check:links`, and `pnpm check:seo` pass.
