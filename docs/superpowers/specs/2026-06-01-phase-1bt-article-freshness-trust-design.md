# Phase 1BT Article Freshness and Trust Design

## Goal

Make article detail pages more production-ready by surfacing freshness and verification guidance for decision-oriented life information.

## Design Read

TachiSuke covers practical topics such as mobile plans, ward-office procedures, housing, garbage rules, and work contracts. These details can change. Readers should see both a machine-readable update date and a plain-language reminder to verify official, counter, or store information before acting.

## Scope

- Render article published and updated dates with semantic `<time datetime>` elements.
- Add a localized article trust notice before the article body.
- Keep the notice editorial and general; do not claim live verification, legal advice, or guaranteed accuracy.
- Style the notice as a compact reading aid that works in light and dark themes.
- Preserve existing Article JSON-LD, Open Graph article metadata, breadcrumbs, table of contents, related guides, and correction prompts.

## Non-Goals

- No article schema migration.
- No live external URL checking.
- No legal, immigration, tax, medical, or financial advice engine.
- No backend review workflow, CMS, database, auth, analytics, or personalization.

## Acceptance

- Article detail pages include `<time datetime={publishedAt.toISOString()}>` and `<time datetime={updatedAt.toISOString()}>`.
- Article detail pages include a localized notice that information can change.
- The notice appears before article body content and before the correction prompt.
- `pnpm test`, `pnpm check:content`, `pnpm build`, `pnpm check:links`, and `pnpm check:seo` pass.
- Browser QA confirms the notice renders on a representative article page without console errors.
