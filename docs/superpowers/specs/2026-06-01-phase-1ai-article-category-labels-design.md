# Phase 1AI Article Category Labels Design

## Goal

Polish article category landing pages by adding localized labels and descriptions for the new `transportation` and `procedures` categories.

## Scope

- Add four-locale `transportation` title and description.
- Add four-locale `procedures` title and description.
- Verify built SEO titles for representative category pages.
- No route, schema, or content model changes.

## Non-Goals

- No category taxonomy redesign.
- No category icons, filters, or pagination.
- No new dependencies.

## Acceptance

- `pnpm test` verifies the helper includes both category keys.
- `pnpm build` generates localized category pages.
- `pnpm check:seo` verifies representative category SEO titles and article links.
