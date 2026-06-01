# Phase 1CJ Collection Visible Breadcrumbs Design

## Scope

Add visible, locale-aware breadcrumbs to the five top-level public collection index pages:

- `/[locale]/articles`
- `/[locale]/areas`
- `/[locale]/places`
- `/[locale]/mobile`
- `/[locale]/tools`

This aligns visible navigation with the existing two-level `BreadcrumbList` JSON-LD and keeps the site fully static.

## Goals

- Render the existing `Breadcrumbs` component on article, area, place, mobile, and tool index pages.
- Keep each breadcrumb two levels: locale home to current collection page.
- Mark the current collection with `aria-current="page"`.
- Keep breadcrumb links limited to existing public routes.
- Add source-level and build-output tests for all supported locales.

## Non-Goals

- No route, sitemap, schema, content model, JSON-LD structure, backend, auth, database, Supabase, RLS, search, or personalization changes.
- No new visual system, icon package, animation, or dependency.
- No visible breadcrumbs on utility/noindex pages unless separately scoped later.

## AWP-Lite Routing

- `source_of_truth`: active autonomous objective, current `main`, `AGENTS.md`, `docs/ai/autonomous-bootstrap.md`, and Spark worker recommendation.
- `this_change_will_do`: add visible collection breadcrumbs using the existing component and tests.
- `this_change_will_not_do`: change routes, create a new layout abstraction, or move into Phase 2 behavior.
- `research_owner`: Spark worker for repo scan and controller review.
- `implementation_owner`: controller.
- `validation_owner`: controller.
- `worker_routing`: `spark_worker_delegated`.
- `delegated_work`: read-only scan for a narrow Phase 1-safe UX/SEO improvement.
- `worker_output_summary`: collection index pages have breadcrumb JSON-LD but no visible breadcrumbs.
- `controller_review_summary`: accepted because the change is static, accessible, narrow, and reuses existing UI.
- `controller_followup_decisions`: implement with existing `Breadcrumbs` component only.
- `planned_validation`: `pnpm test`, `pnpm check:content`, `pnpm build`, `pnpm check:links`, `pnpm check:seo`.
