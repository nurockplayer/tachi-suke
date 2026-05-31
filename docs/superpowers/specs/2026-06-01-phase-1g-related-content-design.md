# Phase 1G Related Content Design

## Objective

Improve article reading flow and internal SEO by adding related article links to article detail pages.

## Decision

Use static build-time related article selection. Do not add search, personalization, analytics, or a recommendation service. The current content collection already has locale, category, tags, and dates, which are enough for a useful first-pass related list.

## Scope

Article detail pages should show up to three related articles in the same locale. Selection should prefer:

1. Same category.
2. Shared tags.
3. Recently updated content.

If a locale has too few related articles, the list may contain fewer than three items. It should never link to the current article, drafts, or other locales.

## Non-Goals

This phase does not add related places, related mobile plans, a search index, click tracking, or personalized recommendations.

## Acceptance Criteria

- Source tests verify `ArticleDetailPage` computes related articles and passes them to `ArticleLayout`.
- Source tests verify `ArticleLayout` renders a related article section.
- Built article pages include root-relative links to other same-locale article pages.
- Existing static link checks still pass.
