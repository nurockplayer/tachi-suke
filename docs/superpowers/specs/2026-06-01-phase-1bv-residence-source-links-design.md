# Phase 1BV Residence Admin Source Links Design

## Scope

Add structured official-source links to the four residence card, resident record, and My Number basics articles. This reuses the existing article `sourceLinks` model from Phase 1BU and stays within the static Phase 1 site.

## Goals

- Add official confirmation links to `translationKey = residence-card-resident-record-my-number` in `zh-tw`, `en`, `ja`, and `ko`.
- Use source links already represented in the static ward-office checklist: Digital Agency My Number FAQ and Immigration Services Agency living/working guidebook.
- Keep labels and notes localized in each article frontmatter.
- Add content-health and build-output tests that prevent this high-risk admin topic from losing source links later.

## Non-Goals

- No schema change, new UI, database, Supabase, login, crawler, or external live-link validation.
- No claim that the linked pages are exhaustive for every municipality, residence status, or household situation.

## AWP-Lite Routing

- `source_of_truth`: active autonomous objective, current `main`, current article source-links model, and existing official links in `src/content/tools/ward-office-moving-in-checklist.json`.
- `this_change_will_do`: seed structured source links for residence/admin basics articles.
- `this_change_will_not_do`: modify routing, add backend behavior, or expand into a legal/admin advice system.
- `research_owner`: controller.
- `implementation_owner`: controller fallback.
- `validation_owner`: controller.
- `controller_fallback_reason`: worker unavailable in the current toolset.
- `planned_validation`: `pnpm test`, `pnpm check:content`, `pnpm build`, `pnpm check:links`, `pnpm check:seo`.
