# Phase 1DO Web Manifest Output Guard Design

## Problem

`site.webmanifest` is part of TachiSuke's browser and mobile app identity. The project already generates a lightweight manifest, but the previous SEO output test only checked a few fields and that icons were non-empty.

That left room for accidental regressions such as:

- changing the start URL or scope away from `/`
- dropping standalone display mode
- replacing same-site icons with missing or external assets
- changing reviewed brand colors without a deliberate decision
- weakening locale-neutral app naming

## Decision

Keep the manifest runtime unchanged and strengthen `pnpm check:seo` so the built output must match the reviewed Phase 1 app identity contract.

The guard checks:

- `name`
- `short_name`
- `description`
- `start_url`
- `scope`
- `display`
- `background_color`
- `theme_color`
- icon metadata
- icon files exist in `dist`
- icon URLs are same-site root-relative assets

## Non-Goals

- No service worker.
- No offline caching.
- No install prompt.
- No push notifications.
- No generated raster icon pipeline.
- No route changes.
- No auth, database, Workers, Functions, or backend behavior.

## Acceptance Criteria

- `pnpm check:seo` fails if `site.webmanifest` no longer matches the reviewed app identity contract.
- `pnpm check:seo` fails if manifest icons point to external URLs.
- `pnpm check:seo` fails if manifest icon files are missing from `dist`.
- The production validation chain remains green.

