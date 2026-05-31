# Phase 1X Browser Metadata Design

## Objective

Polish static launch metadata so browsers and mobile surfaces have consistent TachiSuke app identity beyond the web manifest.

## Scope

Add site-wide metadata in `BaseLayout`:

- `theme-color`
- `application-name`
- `apple-mobile-web-app-title`
- `format-detection`

## Non-goals

- No PWA service worker.
- No install prompt.
- No new icon asset.
- No runtime dependency.
- No route changes.

## Acceptance

- Source tests confirm `BaseLayout` renders the metadata.
- Build-output SEO tests confirm representative HTML includes the metadata.
- `pnpm test`, `pnpm check:content`, `pnpm build`, `pnpm check:links`, and `pnpm check:seo` pass.
