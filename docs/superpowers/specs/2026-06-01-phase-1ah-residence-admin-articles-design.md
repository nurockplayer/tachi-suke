# Phase 1AH Residence Admin Articles Design

## Goal

Add searchable zh-tw and en articles explaining the practical difference between residence cards, resident records, and My Number for foreign residents in Japan.

## Scope

- Add one Traditional Chinese article.
- Add one English article.
- Category: `procedures`.
- Link to the ward office moving-in checklist.
- Keep copy conservative and source-aware because administrative requirements vary by municipality and residence status.

## Source Posture

Use official government pages as the factual basis, especially Immigration Services Agency residence guidance and Digital Agency My Number pages. The articles should avoid legal certainty and direct readers to their municipality, school, employer, immigration authority, or official sources when action is required.

## Non-Goals

- No legal advice.
- No immigration form automation.
- No database, login, or personalized checklist.
- No Japanese/Korean translations in this round.

## Acceptance

- `pnpm test` verifies at least sixteen public articles and the new zh-tw/en slugs.
- `pnpm build` generates the two article detail pages and procedures category pages.
- `pnpm check:seo` verifies sitemap and RSS feed inclusion.
- Internal links must point at existing generated routes.
