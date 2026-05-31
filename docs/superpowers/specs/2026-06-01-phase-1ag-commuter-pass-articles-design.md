# Phase 1AG Commuter Pass Articles Design

## Goal

Add searchable long-form entry content for commuter pass and IC card decisions, linking readers into the new static checklist tool.

## Scope

- Add one Traditional Chinese article.
- Add one English article.
- Category: `transportation`.
- Link to `/[locale]/tools/commuter-pass-ic-card-checklist`.
- Link to existing area, mobile, and first-week setup content where useful.
- Keep copy decision-oriented and conservative about fares, routes, refunds, and operator support.

## Non-Goals

- No fare calculator.
- No route-search integration.
- No translated Japanese/Korean article in this round.
- No backend, database, or dynamic personalization.

## Acceptance

- `pnpm test` verifies at least fourteen public articles and the new slugs.
- `pnpm build` generates the two article detail pages and transportation category pages.
- `pnpm check:seo` verifies sitemap and RSS feed inclusion.
- Internal links must point at existing generated routes.
