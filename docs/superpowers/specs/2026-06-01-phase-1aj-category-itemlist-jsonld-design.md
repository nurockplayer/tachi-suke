# Phase 1AJ Article Category ItemList JSON-LD Design

## Goal

Make article category landing pages clearer to crawlers by describing their visible article lists with conservative `ItemList` JSON-LD.

## Scope

- Add `ItemList` JSON-LD to `ArticleCategoryPage.astro`.
- Include one `ListItem` per visible same-locale, non-draft article.
- Use canonical article URLs, article titles, descriptions, and positions.
- Keep existing `WebPage` and `BreadcrumbList` JSON-LD unchanged.

## Non-Goals

- No article taxonomy redesign.
- No pagination.
- No `CollectionPage` migration in this round.
- No ratings, reviews, author claims, or date claims beyond existing article detail structured data.

## Acceptance

- `pnpm test` verifies source-level ItemList construction.
- `pnpm build` generates category pages successfully.
- `pnpm check:seo` verifies built category pages include `ItemList` JSON-LD matching visible articles.
