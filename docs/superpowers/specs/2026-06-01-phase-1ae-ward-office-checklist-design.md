# Phase 1AE Ward Office Moving-In Checklist Design

## Goal

Add a practical static checklist for city office / ward office moving-in procedures. This fills a high-intent life setup gap without adding login, database storage, backend forms, or dynamic personalization.

## Scope

- Add one published `tools` collection entry.
- Slug: `ward-office-moving-in-checklist`.
- Add optional `sourceLinks` to the tools content model.
- Render official source links on tool detail pages when present.
- Keep content localized for `zh-tw`, `en`, `ja`, and `ko`.
- Keep the page framed as life setup guidance, not legal or administrative guarantee.

## Official Source Strategy

Use source links as verification starting points, not as copied procedural content. The initial official sources are:

- Digital Agency My Number FAQ.
- Immigration Services Agency Guidebook on Living and Working.

Municipality-specific procedures and deadlines can vary, so the checklist must tell readers to confirm details with their own municipality, school, employer, or official sources before acting.

## Non-Goals

- No database-backed submission or user workflow.
- No login or account feature.
- No legal advice.
- No municipality-specific automation.
- No new dependencies.

## Acceptance

- `pnpm test` verifies the third published tool, `sourceLinks` schema support, and source rendering.
- `pnpm build` generates `/[locale]/tools/ward-office-moving-in-checklist/`.
- `pnpm check:links` validates internal links in built HTML.
- `pnpm check:seo` verifies sitemap output and built official source links.
