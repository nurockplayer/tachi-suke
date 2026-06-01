# Phase 1CI Source-Backed Setup Guides Design

## Scope

Add structured official-source links to the four first-week setup articles and the four ward-office moving-in procedure articles. This reuses the existing article `sourceLinks` frontmatter model and keeps the site fully static.

## Goals

- Add official confirmation links to `translationKey = first-week-japan-setup` in `zh-tw`, `en`, `ja`, and `ko`.
- Add official confirmation links to `translationKey = ward-office-moving-in-procedures` in `zh-tw`, `en`, `ja`, and `ko`.
- Use conservative government source pages: Immigration Services Agency living support portal and Digital Agency My Number FAQ.
- Keep source labels and notes localized in the article files.
- Extend content-health and build-output SEO checks so these setup/admin guide clusters cannot silently lose source links later.

## Non-Goals

- No schema, route, layout, dependency, backend, auth, database, Supabase, RLS, crawler, or CMS changes.
- No claim that source pages replace municipality, school, employer, or immigration counter confirmation.
- No live external-link validation, price checking, or legal advice.

## AWP-Lite Routing

- `source_of_truth`: active autonomous objective, current `main`, `AGENTS.md`, `docs/ai/autonomous-bootstrap.md`, and the existing Phase 1BU article source-link model.
- `this_change_will_do`: add official source links and regression checks for setup and ward-office article clusters.
- `this_change_will_not_do`: expand into Phase 2 behavior, modify public routes, or add a backend source-review workflow.
- `research_owner`: Spark worker for repo scan and controller for source verification.
- `implementation_owner`: controller.
- `validation_owner`: controller.
- `worker_routing`: `spark_worker_delegated`.
- `delegated_work`: read-only scan for the next narrow Phase 1-safe improvement and source-link candidates.
- `controller_followup_decisions`: keep the PR limited to sourceLinks, tests, and docs.
- `planned_validation`: `pnpm test`, `pnpm check:content`, `pnpm build`, `pnpm check:links`, `pnpm check:seo`.
