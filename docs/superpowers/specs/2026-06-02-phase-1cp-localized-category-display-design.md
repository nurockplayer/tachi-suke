# Phase 1CP Localized Article Category Display Design

## Objective

Make public article discovery surfaces show localized article category labels instead of raw content category keys.

## Scope

- Article index article-row metadata.
- Article category landing page article-row metadata.
- Locale homepage latest-article card metadata.
- Source-level and build-output tests for category display localization.

## Non-goals

- No article route, category slug, content schema, search index, or content frontmatter changes.
- No backend, account, auth, database, favorite, or submission changes.
- No visual redesign beyond replacing label text.

## Acceptance

- Public article rows use `getArticleCategoryTitle(locale, article.data.category)`.
- English category rows show labels like `Mobile guides` instead of raw `mobile`.
- Traditional Chinese category rows show labels like `行政手續文章` instead of raw `procedures`.
- Existing source, content, build, link, and SEO checks pass.
