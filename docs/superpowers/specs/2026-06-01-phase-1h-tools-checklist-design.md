# Phase 1H Tools Checklist Design

## Objective

Turn the Tools section from a static placeholder into a useful, public, static checklist experience for people preparing to move to Japan or handling their first days after arrival.

## Decision

Build the first tool as static content, not an interactive app. A checklist with grouped tasks, localized copy, and internal links gives users immediate value without requiring authentication, storage, JavaScript state, or a backend.

## Scope

This phase adds:

- `/[locale]/tools/[slug]` routes for all supported locales.
- A shared `ToolDetailPage` component.
- A richer tools content schema with localized `title`, `description`, `sections`, `items`, `lastCheckedAt`, `sourceNote`, and `notes`.
- A published `moving-to-japan-checklist` tool.
- Tool cards on `/[locale]/tools`.
- Sitemap, source-link, and build-output checks for tool detail pages.

## Non-Goals

This phase does not add saved checklist state, user accounts, client-side progress persistence, notifications, or database storage. Future authenticated saved progress belongs in Phase 2 or later.

## Content Rules

- Tool content should be decision-oriented and practical.
- Each checklist item should have short action-oriented wording.
- Dates and source notes should make it clear that administrative rules can change.
- Internal links should point only to existing routes.

## Acceptance Criteria

- `pnpm test` verifies locale tool detail routes, schema fields, published tool content, and card/detail links.
- `pnpm build` generates `/[locale]/tools/moving-to-japan-checklist/`.
- `pnpm check:links` validates generated internal links.
- `pnpm check:seo` verifies the sitemap includes tool detail pages.
