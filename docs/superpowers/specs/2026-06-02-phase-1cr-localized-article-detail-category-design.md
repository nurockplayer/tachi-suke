# Phase 1CR Localized Article Detail Category Labels Design

## Objective

Finish public article category label localization on article detail pages so readers and crawlers see locale-aware category names instead of raw content keys.

## Scope

- `ArticleLayout` visible category metadata.
- `ArticleLayout` visible breadcrumbs.
- Article detail Open Graph `article:section`.
- Article detail `Article` JSON-LD `articleSection`.
- Article detail breadcrumb JSON-LD category names.
- Source-level and build-output SEO tests.

## Non-goals

- No article route, category slug, content schema, search index, or frontmatter changes.
- No account, auth, database, favorite, submission, moderation, or backend changes.
- No visual redesign beyond replacing category label text.

## Acceptance

- Article detail pages use `getArticleCategoryTitle(locale, category)` for category display and structured metadata.
- English article details show labels like `Mobile guides` instead of raw `mobile`.
- Traditional Chinese article details show labels like `行政手續文章` instead of raw `procedures`.
- Existing source, content, build, link, and SEO checks pass.
